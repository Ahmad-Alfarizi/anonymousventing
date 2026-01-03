import React from 'react';
import { ScreenName } from '../types';
import { Icon } from '../components/Icon';

interface DisclaimerScreenProps {
  onNavigate: (screen: ScreenName) => void;
}

export const DisclaimerScreen: React.FC<DisclaimerScreenProps> = ({ onNavigate }) => {
  return (
    <div className="flex h-full w-full flex-col bg-background-dark overflow-y-auto">
      <div className="flex items-center justify-center p-6 border-b border-white/5 bg-background-dark/50 backdrop-blur sticky top-0 z-10">
        <h1 className="text-white text-lg font-bold">Disclaimer & Privacy</h1>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        <p className="text-[#9CA3AF] text-center text-sm font-medium">Before you start sharing, please take a moment to read this.</p>

        <div className="bg-[#1F2937] rounded-2xl p-6 shadow-sm border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Icon name="description" />
            <h2 className="text-white text-lg font-bold">Terms of Use</h2>
          </div>
          <ul className="space-y-3 text-[#E5E7EB] text-sm leading-relaxed">
            <li className="flex gap-2">
              <span className="text-primary">•</span> This is a supportive community, not a substitute for professional help.
            </li>
            <li className="flex gap-2">
               <span className="text-primary">•</span> Be kind and respectful to everyone.
            </li>
            <li className="flex gap-2">
               <span className="text-primary">•</span> We do not store personally identifiable information.
            </li>
          </ul>
          <button className="text-[#9CA3AF] text-xs font-medium underline mt-4 hover:text-primary transition-colors">Read full Terms of Use</button>
        </div>

        <div className="bg-[#1F2937] rounded-2xl p-6 shadow-sm border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Icon name="shield" />
            <h2 className="text-white text-lg font-bold">Privacy Policy</h2>
          </div>
          <ul className="space-y-3 text-[#E5E7EB] text-sm leading-relaxed">
            <li className="flex gap-2">
               <span className="text-primary">•</span> No accounts or personal data required.
            </li>
            <li className="flex gap-2">
               <span className="text-primary">•</span> Voice and text notes are fully anonymized.
            </li>
            <li className="flex gap-2">
               <span className="text-primary">•</span> We collect minimal usage data to improve the app.
            </li>
          </ul>
          <button className="text-[#9CA3AF] text-xs font-medium underline mt-4 hover:text-primary transition-colors">Read full Privacy Policy</button>
        </div>
      </div>

      <div className="p-6 bg-background-dark border-t border-white/10">
        <button 
          onClick={() => onNavigate(ScreenName.HOME)}
          className="w-full h-14 rounded-full bg-primary text-background-dark text-lg font-bold hover:bg-primary/90 transition-all active:scale-95"
        >
          I Understand and Consent
        </button>
      </div>
    </div>
  );
};
