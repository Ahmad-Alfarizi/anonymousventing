import React, { useState, useEffect, useMemo } from 'react';
import { Post, PostType } from '../types';
import { Icon } from './Icon';

interface PostCardProps {
  post: Post;
  onDelete?: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [liked, setLiked] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Parse duration string to seconds
  const totalSeconds = useMemo(() => {
    if (!post.duration) return 10;
    const parts = post.duration.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }, [post.duration]);

  // Generate fake waveform data based on post ID
  const waveform = useMemo(() => {
    const bars = [];
    const seed = post.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const count = 35; // Number of bars
    for (let i = 0; i < count; i++) {
        // Pseudo-random height between 20% and 75% to allow room for bounce
        const h = 20 + (Math.abs(Math.sin(seed * i * 0.5) * 40) + Math.abs(Math.cos(seed * i * 0.2) * 15));
        
        // Deterministic delay for animation
        // Using sine to create a "wave" effect across the bars, plus some jitter
        const delay = -((i * 0.1) + ((seed % 10) * 0.05)) + 's';
        
        bars.push({
            height: Math.min(h, 75),
            delay
        });
    }
    return bars;
  }, [post.id]);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          // Increment progress based on duration
          // Update every 100ms
          return prev + (100 / (totalSeconds * 10)); 
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSeconds]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleDelete = () => {
    if (onDelete) {
      setIsDeleting(true);
      setTimeout(() => {
        onDelete(post.id);
      }, 300);
    }
  };

  // Calculate current time string for display
  const currentTime = useMemo(() => {
      const currentSecs = Math.floor((progress / 100) * totalSeconds);
      const mins = Math.floor(currentSecs / 60);
      const secs = currentSecs % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, [progress, totalSeconds]);

  return (
    <div 
      className={`flex flex-col items-start justify-start rounded-2xl bg-white/5 p-5 gap-4 border border-white/5 shadow-sm 
      transition-all duration-300 ease-out
      ${isDeleting ? 'opacity-0 scale-95 mb-[-100px]' : 'animate-in fade-in slide-in-from-bottom-4 duration-500 opacity-100 scale-100'}`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Icon 
              name={post.type === PostType.TEXT ? 'chat_bubble' : 'mic'} 
              size={18} 
            />
          </div>
          <p className="text-[#9b92c9] text-sm font-medium">
            {post.type === PostType.TEXT ? 'Text Post' : 'Voice Post'}
          </p>
        </div>
        {onDelete && (
           <button 
             onClick={handleDelete}
             className="text-white/40 hover:text-red-400 transition-colors active:scale-90 transform duration-200"
           >
             <Icon name="delete" size={20} />
           </button>
        )}
      </div>

      {post.type === PostType.TEXT ? (
        <p className="text-white/90 text-lg font-medium leading-relaxed tracking-[-0.015em]">
          {post.content}
        </p>
      ) : (
        <div className="flex items-center gap-3 w-full bg-[#3b3267]/20 p-3 rounded-2xl transition-colors hover:bg-[#3b3267]/30">
          <button 
            onClick={togglePlay}
            className="flex size-12 flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary text-background-dark shadow-lg transition-transform active:scale-95 hover:scale-105"
          >
            <Icon name={isPlaying ? "pause" : "play_arrow"} size={28} filled={true} />
          </button>
          
          <div className="flex flex-col gap-1 w-full overflow-hidden">
             {/* Waveform Visualization */}
             <div className="flex items-center gap-[3px] h-8 w-full px-1 justify-center">
                {waveform.map((bar, index) => {
                    const barProgress = (index / waveform.length) * 100;
                    const isActive = barProgress <= progress;
                    
                    return (
                        <div 
                            key={index}
                            className={`w-1 rounded-full transition-colors duration-200 ${isActive ? 'bg-primary' : 'bg-[#5f5685]'}`}
                            style={{ 
                                height: `${bar.height}%`,
                                opacity: isActive ? 1 : 0.4,
                                animation: isPlaying ? `eq-bounce 0.8s ease-in-out infinite` : 'none',
                                animationDelay: bar.delay
                            }}
                        />
                    );
                })}
             </div>

            <div className="flex justify-between items-center px-1">
              <span className="text-primary text-xs font-bold font-mono tracking-tight">{currentTime}</span>
              <span className="text-[#9b92c9] text-xs font-medium font-mono tracking-tight">{post.duration}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between w-full pt-2 border-t border-white/5">
        <p className="text-[#9b92c9] text-xs font-medium">{post.timestamp}</p>
        <div className="flex gap-2">
           <button 
            onClick={() => setLiked(!liked)}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 active:scale-75 ${liked ? 'bg-primary/20 text-primary scale-110' : 'bg-transparent text-white/20 hover:bg-white/10'}`}
           >
             <Icon name="favorite" filled={liked} size={18} className={`transition-transform duration-300 ${liked ? 'scale-110' : ''}`} />
           </button>
           <button className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent text-white/20 hover:bg-white/10 transition-colors active:scale-90">
             <Icon name="more_horiz" size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};