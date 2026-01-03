import React from 'react';
import { ScreenName } from '../types';
import { Icon } from '../components/Icon';

interface WelcomeScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="relative flex h-full w-full flex-col bg-background-dark overflow-hidden">
        <main className="flex flex-1 flex-col justify-between items-center px-6 pt-24 pb-12 text-center text-white">
            <div className="flex flex-col items-center animate-in slide-in-from-top duration-700">
                <h1 className="text-white tracking-tight text-[36px] font-extrabold leading-tight mb-2">Your space <br/>to feel.</h1>
            </div>

            <div className="flex flex-col items-start gap-y-8 max-w-xs w-full animate-in fade-in duration-1000 delay-300">
                <div className="flex items-center gap-x-5">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                        <Icon name="edit_note" size={28} />
                    </div>
                    <p className="text-white/80 text-base font-medium leading-snug text-left">Share what's on your mind through text or voice.</p>
                </div>
                <div className="flex items-center gap-x-5">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                        <Icon name="shield_person" size={28} />
                    </div>
                    <p className="text-white/80 text-base font-medium leading-snug text-left">Completely anonymous. No accounts, no judgment.</p>
                </div>
                <div className="flex items-center gap-x-5">
                    <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                        <Icon name="hearing" size={28} />
                    </div>
                    <p className="text-white/80 text-base font-medium leading-snug text-left">Listen to others and know you're not alone.</p>
                </div>
            </div>

            <div className="w-full max-w-sm animate-in slide-in-from-bottom duration-700 delay-500">
                <button 
                  onClick={() => onNavigate(ScreenName.DISCLAIMER)}
                  className="w-full cursor-pointer rounded-full h-14 bg-primary text-background-dark text-lg font-bold tracking-wide hover:bg-primary/90 transition-all active:scale-95"
                >
                    Enter the space
                </button>
            </div>
        </main>
    </div>
  );
};
