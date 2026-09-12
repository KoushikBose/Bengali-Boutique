import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('maison_aura_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('maison_aura_cookie_consent', 'all');
    setShow(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('maison_aura_cookie_consent', 'essential');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div 
      id="cookie-privacy-banner"
      className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md bg-[#1C1B1A] text-[#FAF8F5] p-5 shadow-2xl z-50 border border-[#3A3734] transition-all animate-fade-in"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2 text-[#DFCFBE]">
          <ShieldCheck className="w-4 h-4 text-[#DFCFBE]" />
          <span className="text-xs uppercase tracking-widest font-medium">Boutique Privacy</span>
        </div>
        <button
          onClick={acceptEssential}
          className="text-[#8E8279] hover:text-[#FAF8F5] p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-[#B5ABA1] leading-relaxed mt-2.5">
        Maison Aura uses cookies to curate an individualized shopping experience, analyze editorial engagement, and respect your privacy preferences.
      </p>

      <div className="mt-4 flex items-center justify-end space-x-3 text-xs">
        <button
          onClick={acceptEssential}
          className="px-3 py-1.5 text-[#B5ABA1] hover:text-[#FAF8F5] underline underline-offset-4 transition-colors"
        >
          Essential Only
        </button>
        <button
          onClick={acceptAll}
          className="px-4 py-1.5 bg-[#DFCFBE] text-[#1C1B1A] uppercase tracking-wider text-[11px] font-semibold hover:bg-white transition-colors"
        >
          Accept All
        </button>
      </div>
    </div>
  );
};
