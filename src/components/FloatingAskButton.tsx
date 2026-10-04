import React from 'react';

interface FloatingAskButtonProps {
  onClick: () => void;
}

export const FloatingAskButton: React.FC<FloatingAskButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      <button
        onClick={onClick}
        className="group relative flex items-center gap-space-sm px-space-lg py-3 rounded-full bg-surface-container-high/90 backdrop-blur-2xl text-on-surface shadow-[0_0_24px_rgba(93,230,255,0.25)] hover:shadow-[0_0_32px_rgba(183,109,255,0.4)] transition-all duration-300 border border-surface-container-highest/60 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-tertiary-container text-on-tertiary-container shadow-sm">
          <span className="material-symbols-outlined text-sm">auto_awesome</span>
        </div>
        <div className="flex items-center gap-space-xs">
          <span className="font-headline-sm text-headline-sm font-semibold tracking-tight">Ask Cognexa</span>
          <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-lowest/80 text-secondary font-mono border border-surface-container-high/40">
            Ctrl+Space
          </span>
        </div>
      </button>
    </div>
  );
};
