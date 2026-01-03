import React, { useEffect } from 'react';
import { ScreenName } from '../types';

interface SplashScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onNavigate }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNavigate(ScreenName.WELCOME);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onNavigate]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-background-dark p-4 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px] animate-pulse-slow"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
        <h1 className="text-white text-4xl font-bold tracking-tight mb-3">Curhat Anonim</h1>
        <p className="text-white/70 text-lg font-medium tracking-wide">Share. Feel. Heal.</p>
      </div>
    </div>
  );
};
