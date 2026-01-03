import React, { useState } from 'react';
import { ScreenName, MOODS, Post, PostType } from '../types';
import { Icon } from '../components/Icon';

interface CreateCurhatScreenProps {
  onNavigate: (screen: ScreenName) => void;
  onPost: (post: Post) => void;
}

export const CreateCurhatScreen: React.FC<CreateCurhatScreenProps> = ({ onNavigate, onPost }) => {
  const [text, setText] = useState('');
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);

  const handlePost = () => {
    if (!text.trim()) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      type: PostType.TEXT,
      content: text,
      timestamp: 'Just now',
      mood: selectedMood.emoji,
      isMyPost: true,
    };
    
    onPost(newPost);
    onNavigate(ScreenName.HOME);
  };

  return (
    <div className="flex h-full w-full flex-col bg-background-dark">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={() => onNavigate(ScreenName.HOME)} className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors">
          <Icon name="close" />
        </button>
        <h2 className="flex-1 text-center text-white text-lg font-bold">Create Curhat</h2>
        <button 
          onClick={() => onNavigate(ScreenName.CREATE_VOICE)}
          className="p-2 text-primary font-bold text-sm bg-primary/10 rounded-full px-4"
        >
          Voice
        </button>
      </div>

      <main className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
        <h2 className="text-white text-3xl font-bold text-center py-6">Share your feelings</h2>

        <div className="flex flex-col gap-6">
          <div className="relative">
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-48 bg-[#292348] rounded-2xl p-5 text-white text-lg placeholder:text-[#9b92c9] focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-shadow"
              placeholder="What's on your mind..."
              maxLength={500}
            />
            <p className="absolute bottom-4 right-4 text-[#9b92c9] text-xs font-medium">{text.length}/500</p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-white text-lg font-medium">How are you feeling?</p>
            <div className="flex flex-wrap gap-3">
              {MOODS.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all ${selectedMood.label === mood.label ? 'bg-primary scale-110 shadow-lg shadow-primary/30' : 'bg-[#292348] hover:bg-[#352d5e]'}`}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto py-8">
          <button 
            onClick={handlePost}
            disabled={!text.trim()}
            className="w-full h-14 rounded-full bg-primary text-background-dark text-lg font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            Post Anonymously
          </button>
        </div>
      </main>
    </div>
  );
};
