import React from 'react';

interface MotifProps {
  className?: string;
  color?: string;
}

/**
 * Traditional Sawtooth Temple Border (করাত পাড় / মন্দির পাড়)
 * Found along traditional Baluchari, Garad, and Dhaniakhali handloom borders.
 */
export const TempleBorder: React.FC<MotifProps & { inverted?: boolean }> = ({ 
  className = 'w-full h-4 text-[#9E2A2B]', 
  inverted = false 
}) => {
  return (
    <div className={`overflow-hidden flex items-center select-none ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 24"
        preserveAspectRatio="repeat-x"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id={`temple-sawtooth-${inverted ? 'inv' : 'reg'}`} width="24" height="24" patternUnits="userSpaceOnUse">
          {inverted ? (
            <path d="M0,0 L12,20 L24,0 Z" />
          ) : (
            <path d="M0,24 L12,4 L24,24 Z" />
          )}
          <circle cx="12" cy={inverted ? "22" : "2"} r="1.5" />
        </pattern>
        <rect width="100%" height="24" fill={`url(#temple-sawtooth-${inverted ? 'inv' : 'reg'})`} />
      </svg>
    </div>
  );
};

/**
 * Authentic Bengali Rice-Paste Alpona Section Divider (আলপনা নকশা)
 * Elegant central blooming lotus (পদ্ম), flanking paisley creepers (কলকা ও লতা), and auspicious droplets.
 */
export const AlponaDivider: React.FC<MotifProps & { title?: string; bengaliSubtitle?: string }> = ({
  className = 'my-8 text-[#9E2A2B]',
  title,
  bengaliSubtitle,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center px-4 ${className}`}>
      <div className="flex items-center w-full max-w-xl mx-auto space-x-3 sm:space-x-4 opacity-85">
        {/* Left creeper vine */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C5A880] to-[#9E2A2B]" />
        
        {/* Left Alpona Paisley Flourish */}
        <svg className="w-10 sm:w-14 h-5 text-current shrink-0" viewBox="0 0 56 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M2,10 C14,10 18,2 28,10 C38,18 42,10 54,10" strokeLinecap="round" />
          <circle cx="28" cy="10" r="2" fill="currentColor" />
          <circle cx="14" cy="6" r="1.2" fill="currentColor" />
          <circle cx="42" cy="14" r="1.2" fill="currentColor" />
        </svg>

        {/* Central Auspicious Sacred Lotus (পদ্ম) Motif */}
        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#C5A880]/60 bg-[#FAF8F5] text-[#9E2A2B] shadow-xs">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {/* Center petal */}
            <path d="M12 3 C10 8 10 16 12 21 C14 16 14 8 12 3 Z" fill="currentColor" fillOpacity="0.15" />
            {/* Left petal */}
            <path d="M12 12 C8 10 3 13 4 17 C7 19 10 17 12 15" strokeLinecap="round" />
            {/* Right petal */}
            <path d="M12 12 C16 10 21 13 20 17 C17 19 14 17 12 15" strokeLinecap="round" />
            {/* Base water line */}
            <path d="M6 21 C9 20 15 20 18 21" strokeLinecap="round" />
            <circle cx="12" cy="10" r="1" fill="currentColor" />
          </svg>
        </div>

        {/* Right Alpona Paisley Flourish */}
        <svg className="w-10 sm:w-14 h-5 text-current shrink-0 scale-x-[-1]" viewBox="0 0 56 20" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M2,10 C14,10 18,2 28,10 C38,18 42,10 54,10" strokeLinecap="round" />
          <circle cx="28" cy="10" r="2" fill="currentColor" />
          <circle cx="14" cy="6" r="1.2" fill="currentColor" />
          <circle cx="42" cy="14" r="1.2" fill="currentColor" />
        </svg>

        {/* Right creeper vine */}
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#C5A880] to-[#9E2A2B]" />
      </div>

      {(title || bengaliSubtitle) && (
        <div className="mt-2.5 space-y-0.5">
          {bengaliSubtitle && (
            <p className="font-bengali text-xs sm:text-sm text-[#9E2A2B] font-semibold tracking-wide">
              {bengaliSubtitle}
            </p>
          )}
          {title && (
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#7B726B] font-medium">
              {title}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Traditional Alpona Corner Floral Motif for Luxury Cards
 */
export const AlponaCorner: React.FC<MotifProps & { position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({
  className = 'w-10 h-10 text-[#9E2A2B]/40',
  position = 'top-left'
}) => {
  const rotationClass = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]'
  }[position];

  return (
    <div className={`pointer-events-none ${className} ${rotationClass}`}>
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-full h-full">
        <path d="M2 2 L2 22 C2 28 8 36 20 36 C32 36 38 28 38 22 L38 2" strokeLinecap="round" strokeDasharray="1 3" />
        <path d="M4 4 L4 18 C4 24 10 32 20 32" strokeLinecap="round" />
        <circle cx="8" cy="8" r="2" fill="currentColor" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
        <circle cx="4" cy="4" r="3" fill="currentColor" fillOpacity="0.2" />
        <path d="M4 4 L14 14" strokeLinecap="round" />
      </svg>
    </div>
  );
};
