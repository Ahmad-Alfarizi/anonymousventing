import React, { useState, useMemo, useRef } from 'react';
import { ScreenName, Post, MOODS, PostType } from '../types';
import { PostCard } from '../components/PostCard';
import { BottomNav } from '../components/BottomNav';
import { Icon } from '../components/Icon';
import { ReportModal } from '../components/ReportModal';

interface HomeScreenProps {
  posts: Post[];
  onNavigate: (screen: ScreenName) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ posts, onNavigate }) => {
  const [showReport, setShowReport] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Pull to refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullY, setPullY] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef(0);

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'All') return posts;
    if (activeFilter === 'Text') return posts.filter(p => p.type === PostType.TEXT);
    if (activeFilter === 'Voice') return posts.filter(p => p.type === PostType.VOICE);
    // Filter by mood emoji
    return posts.filter(p => p.mood === activeFilter);
  }, [posts, activeFilter]);

  const filters = [
    { label: 'All', value: 'All' },
    { label: 'Text', value: 'Text' },
    { label: 'Voice', value: 'Voice' },
    ...MOODS.map(m => ({ label: m.emoji, value: m.emoji }))
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollRef.current?.scrollTop === 0) {
      touchStartRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchY = e.touches[0].clientY;
    // Only allow pull if we are at the top
    if (scrollRef.current?.scrollTop === 0 && !isRefreshing) {
      const diff = touchY - touchStartRef.current;
      if (diff > 0) {
        // Add resistance to the pull
        const damped = Math.min(Math.pow(diff, 0.85), 100);
        setPullY(damped);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isRefreshing) {
      if (pullY > 60) {
        setIsRefreshing(true);
        // Snap to refresh position
        setPullY(60);
        // Simulate network request
        setTimeout(() => {
          setIsRefreshing(false);
          setPullY(0);
        }, 2000);
      } else {
        // Snap back if not pulled enough
        setPullY(0);
      }
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-background-dark relative">
      {/* Top App Bar & Filters */}
      <div className="sticky top-0 z-10 bg-background-dark/95 backdrop-blur-md border-b border-white/5 transition-all shadow-sm shadow-black/20">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <div className="w-10"></div> {/* Spacer */}
            <h1 className="text-white text-lg font-bold tracking-tight">Home</h1>
            <button 
              onClick={() => setShowReport(true)}
              className="w-10 flex justify-end text-white/50 hover:text-white transition-colors"
            >
              <Icon name="report" size={20} />
            </button>
        </div>

        {/* Filter ScrollView */}
        <div className="w-full overflow-x-auto no-scrollbar px-4 pb-3 flex items-center gap-2 touch-pan-x">
            {filters.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap active:scale-95
                        ${activeFilter === filter.value 
                            ? 'bg-primary text-background-dark shadow-lg shadow-primary/20 scale-105 font-bold' 
                            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                >
                    {filter.label}
                </button>
            ))}
            <div className="w-2 shrink-0" /> {/* Right padding for scroll */}
        </div>
      </div>

      {/* Content */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 pt-4 relative overscroll-contain"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Loading Indicator Layer */}
        <div 
            className="absolute top-0 left-0 right-0 flex justify-center pt-4 pointer-events-none z-0"
            style={{ 
                opacity: pullY > 0 ? Math.min(pullY / 40, 1) : 0,
            }}
        >
            <div className={`p-2 rounded-full bg-white/10 ${isRefreshing ? 'animate-spin' : ''}`} style={{ transform: `rotate(${pullY * 2}deg)` }}>
                <Icon name="refresh" size={24} className={isRefreshing ? 'text-primary' : 'text-white/50'} />
            </div>
        </div>

        {/* Content Layer */}
        <div 
            className="flex flex-col gap-4 relative z-10 transition-transform duration-300 ease-out will-change-transform"
            style={{ transform: `translateY(${pullY}px)` }}
        >
          {filteredPosts.length > 0 ? (
             filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
          ) : (
             <div className="flex flex-col items-center justify-center py-20 opacity-50 animate-in fade-in zoom-in duration-500">
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Icon name="filter_list_off" size={32} className="text-white/30" />
                 </div>
                 <p className="text-white/50 text-sm font-medium">No posts found</p>
                 <button 
                    onClick={() => setActiveFilter('All')}
                    className="mt-4 text-primary text-sm font-bold hover:underline"
                 >
                    Clear filters
                 </button>
             </div>
          )}
          {/* Bottom spacer for scrolling past FAB */}
          <div className="h-20"></div>
        </div>
      </main>

      {/* FAB */}
      <div className="fixed bottom-24 right-6 z-20">
        <button 
          onClick={() => onNavigate(ScreenName.CREATE_TEXT)}
          className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-primary text-background-dark shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Icon name="add" size={32} />
        </button>
      </div>

      <BottomNav currentScreen={ScreenName.HOME} onNavigate={onNavigate} />
      
      <ReportModal isOpen={showReport} onClose={() => setShowReport(false)} />
    </div>
  );
};