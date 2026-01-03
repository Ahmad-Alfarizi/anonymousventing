import React from 'react';
import { Icon } from './Icon';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      <div className="relative w-full bg-[#1C1C2E] rounded-t-3xl overflow-hidden animate-in slide-in-from-bottom duration-300 max-w-md mx-auto">
        <div className="flex justify-center pt-4 pb-2">
           <div className="w-12 h-1.5 rounded-full bg-white/20" />
        </div>
        
        <div className="px-6 pb-2 text-center">
          <h2 className="text-xl font-bold text-white mb-1">Report Content</h2>
          <p className="text-white/60 text-sm">Your report is anonymous. Help us keep this space safe.</p>
        </div>

        <div className="p-4 flex flex-col gap-3">
          {['Hate Speech or Symbols', 'Spam or Misleading', 'Harassment or Bullying', 'Self-Harm or Suicide', 'Nudity or Sexual Content', 'Something Else'].map((reason, idx) => (
            <label key={reason} className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer transition-colors hover:bg-white/10 has-[:checked]:bg-primary/10 has-[:checked]:border-primary/50">
              <span className="text-sm font-medium text-white">{reason}</span>
              <input 
                type="radio" 
                name="report_reason" 
                className="w-5 h-5 accent-primary bg-transparent border-2 border-white/30 rounded-full"
                defaultChecked={idx === 1}
              />
            </label>
          ))}
        </div>

        <div className="p-4 border-t border-white/10 bg-[#1C1C2E] flex flex-col gap-3 pb-8">
           <button 
             onClick={onClose}
             className="w-full h-12 bg-primary text-background-dark font-bold rounded-full hover:bg-primary/90 transition-colors"
            >
             Submit Report
           </button>
           <button 
             onClick={onClose}
             className="w-full h-12 bg-transparent text-white/60 font-bold rounded-full hover:bg-white/5 transition-colors"
            >
             Cancel
           </button>
        </div>
      </div>
    </div>
  );
};
