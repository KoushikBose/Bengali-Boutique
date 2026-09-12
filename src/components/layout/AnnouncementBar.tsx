import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, X, Flame } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { TempleBorder } from '../common/AlponaMotifs';

export const AnnouncementBar: React.FC = () => {
  const { navigateTo, currentPage } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const scrollToSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const messages = [
    {
      text: '🌸 শারদোৎসব বিশেষ: The 5-Day Durga Puja Wardrobe Capsule (ষষ্ঠী থেকে দশমী)',
      cta: 'Explore Puja Planner',
      action: () => scrollToSection('puja-planner-section')
    },
    {
      text: 'ঐতিহ্যবাহী আটপৌরে শাড়ির সাজ: Interactive Saree Drape Tutorial',
      cta: 'View Drape Guide',
      action: () => scrollToSection('atpoure-guide-section')
    },
    {
      text: 'বাংলার চিরন্তন ষড়ঋতু: Discover handloom weaves for all Six Bengali Ritus',
      cta: 'Explore Ritu-Chakra',
      action: () => scrollToSection('ritu-chakra-section')
    },
    {
      text: 'Complimentary Pan-India shipping & heritage gift boxing on orders above ₹2,999',
      cta: 'Shop Now',
      action: () => navigateTo('shop', { tag: 'New' })
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % messages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [messages.length]);

  if (!isVisible) return null;

  const current = messages[currentIndex];

  return (
    <div id="announcement-bar" className="bg-[#1C1B1A] text-[#FAF8F5] text-xs relative z-40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-2 text-[11px] uppercase tracking-widest text-[#E2856E]">
          <Flame className="w-3 h-3 text-[#E2856E]" />
          <span>Ballygunge Atelier • শারদ সমাহার ২০২৬</span>
        </div>

        <div className="flex-1 text-center flex items-center justify-center space-x-2 py-0.5">
          <span className="font-light tracking-wide text-[#FAF8F5] transition-opacity duration-500">
            {current.text}
          </span>
          <button
            onClick={current.action}
            className="hidden md:inline-flex items-center text-[#E2856E] hover:text-white underline underline-offset-4 ml-2 transition-colors cursor-pointer font-medium"
          >
            <span>{current.cta}</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateTo('stores')}
            className="hidden lg:block text-[11px] text-[#C4B7AA] hover:text-[#FAF8F5] transition-colors"
          >
            Ballygunge Salon
          </button>
          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss Announcement"
            className="text-[#8E8279] hover:text-[#FAF8F5] transition-colors p-0.5 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Decorative Golden Temple Border on Bottom of Announcement Bar */}
      <div className="opacity-25">
        <TempleBorder className="w-full h-2 text-[#C5A880]" />
      </div>
    </div>
  );
};
