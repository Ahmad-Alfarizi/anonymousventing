import React, { useState, useEffect, useRef } from 'react';
import { ScreenName, MOODS, Post, PostType } from '../types';
import { Icon } from '../components/Icon';

interface CreateVoiceCurhatScreenProps {
  onNavigate: (screen: ScreenName) => void;
  onPost: (post: Post) => void;
}

export const CreateVoiceCurhatScreen: React.FC<CreateVoiceCurhatScreenProps> = ({ onNavigate, onPost }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePost = () => {
    if (duration === 0) return;

    const newPost: Post = {
      id: Date.now().toString(),
      type: PostType.VOICE,
      duration: formatTime(duration),
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
      <div className="flex items-center p-4 relative z-10">
        <button onClick={() => onNavigate(ScreenName.HOME)} className="p-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors">
          <Icon name="close" />
        </button>
        <h2 className="flex-1 text-center text-white text-lg font-bold">Record Voice</h2>
        <button 
          onClick={() => onNavigate(ScreenName.CREATE_TEXT)}
          className="p-2 text-white/70 font-bold text-sm bg-white/5 rounded-full px-4 hover:bg-white/10"
        >
          Text
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <h1 className="text-white text-7xl font-bold tracking-tighter tabular-nums mb-2">
          {formatTime(duration)}
        </h1>
        <p className="text-white/50 text-sm mb-16 font-medium">
          {isRecording ? 'Recording...' : 'Tap the mic to start recording'}
        </p>

        <div className="relative flex items-center justify-center">
          {isRecording && (
            <>
              <div className="absolute h-64 w-64 rounded-full bg-primary/10 animate-ping opacity-20 duration-1000"></div>
              <div className="absolute h-48 w-48 rounded-full bg-primary/20 animate-pulse"></div>
              <div className="absolute h-36 w-36 rounded-full bg-primary/30 animate-pulse delay-75"></div>
            </>
          )}
          
          <button 
            onClick={toggleRecording}
            className={`relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full transition-all hover:scale-105 active:scale-95 ${isRecording ? 'bg-red-500 shadow-red-500/40' : 'bg-primary shadow-primary/40'} shadow-xl`}
          >
            <Icon name={isRecording ? "stop" : "mic"} size={40} className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6 bg-background-dark border-t border-white/5">
        <div>
           <h2 className="text-white text-center text-sm font-bold mb-4 uppercase tracking-wider text-white/50">How are you feeling?</h2>
           <div className="flex justify-center gap-3">
              {MOODS.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl transition-all ${selectedMood.label === mood.label ? 'bg-primary scale-110 shadow-lg shadow-primary/30' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
        </div>

        <button 
          onClick={handlePost}
          disabled={duration === 0}
          className="w-full h-14 rounded-full bg-primary text-background-dark text-lg font-bold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          Post Anonymously
        </button>
      </div>
    </div>
  );
};