import React from 'react';
import { ScreenName } from '../types';
import { Icon } from './Icon';

interface BottomNavProps {
  currentScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const getIconClass = (screen: ScreenName) => {
    return currentScreen === screen ? 'text-primary' : 'text-[#9b92c9]';
  };

  const getTextClass = (screen: ScreenName) => {
    return currentScreen === screen ? 'text-primary font-bold' : 'text-[#9b92c9] font-medium';
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 bg-[#231e0f]/90 backdrop-blur-md border-t border-white/10 max-w-md mx-auto">
      <div className="flex h-20 items-center justify-around px-2 pb-2">
        <button 
          onClick={() => onNavigate(ScreenName.HOME)}
          className={`flex flex-1 flex-col items-center justify-center gap-1 ${getIconClass(ScreenName.HOME)}`}
        >
          <Icon name="home" filled={currentScreen === ScreenName.HOME} />
          <span className={`text-xs ${getTextClass(ScreenName.HOME)}`}>Home</span>
        </button>

        <button 
          onClick={() => onNavigate(ScreenName.MY_CURHAT)}
          className={`flex flex-1 flex-col items-center justify-center gap-1 ${getIconClass(ScreenName.MY_CURHAT)}`}
        >
          <Icon name="person" filled={currentScreen === ScreenName.MY_CURHAT} />
          <span className={`text-xs ${getTextClass(ScreenName.MY_CURHAT)}`}>My Curhat</span>
        </button>

        <button 
          onClick={() => onNavigate(ScreenName.CREATE_TEXT)}
          className={`flex flex-1 flex-col items-center justify-center gap-1 ${getIconClass(ScreenName.CREATE_TEXT)}`}
        >
          <Icon name="edit_square" filled={currentScreen === ScreenName.CREATE_TEXT} />
          <span className={`text-xs ${getTextClass(ScreenName.CREATE_TEXT)}`}>Create</span>
        </button>
      </div>
    </nav>
  );
};
