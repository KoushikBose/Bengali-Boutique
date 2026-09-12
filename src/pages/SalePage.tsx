import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Tag, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';

export const SalePage: React.FC = () => {
  const { products, formatPrice } = useShop();

  const [selectedDiscount, setSelectedDiscount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 40
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter products on sale or simulated archive markdown
  const saleProducts = products.filter(p => {
    const isOnSale = !!p.salePrice;
    if (!isOnSale) return false;

    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

    if (selectedDiscount > 0) {
      const discountPct = Math.round(((p.price - (p.salePrice || p.price)) / p.price) * 100);
      if (discountPct < selectedDiscount) return false;
    }

    return true;
  });

  const categories = ['All', 'Dresses', 'Tops & Blouses', 'Trousers', 'Co-ord Sets', 'Outerwear', 'Handbags', 'Shoes'];

  return (
    <div id="sale-page-root" className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Archive Sale Hero Banner */}
      <section className="bg-[#1C1B1A] text-[#FAF8F5] py-16 sm:py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <span className="text-xs uppercase tracking-[0.35em] text-[#DFCFBE] font-medium block">
            Private Client Privilege
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal">
            THE ARCHIVE SALE
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF8F5]/80 max-w-lg mx-auto font-light leading-relaxed">
            Rare seasonal markdowns on single-batch atelier silhouettes. Once an edition is depleted, patterns are archived indefinitely.
          </p>

          {/* Countdown Clock Box */}
          <div className="pt-6">
            <span className="text-[10px] uppercase tracking-widest text-[#DFCFBE] block mb-2">
              Private Privilege Window Concludes In
            </span>
            <div className="flex items-center justify-center space-x-3 sm:space-x-5 text-[#FAF8F5]">
              <div className="text-center">
                <span className="font-serif text-2xl sm:text-4xl font-normal block w-14 sm:w-16 bg-white/10 py-2">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#8E8279] mt-1 block">Days</span>
              </div>
              <span className="text-2xl text-[#DFCFBE] font-serif">:</span>
              <div className="text-center">
                <span className="font-serif text-2xl sm:text-4xl font-normal block w-14 sm:w-16 bg-white/10 py-2">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#8E8279] mt-1 block">Hours</span>
              </div>
              <span className="text-2xl text-[#DFCFBE] font-serif">:</span>
              <div className="text-center">
                <span className="font-serif text-2xl sm:text-4xl font-normal block w-14 sm:w-16 bg-white/10 py-2">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#8E8279] mt-1 block">Mins</span>
              </div>
              <span className="text-2xl text-[#DFCFBE] font-serif">:</span>
              <div className="text-center">
                <span className="font-serif text-2xl sm:text-4xl font-normal block w-14 sm:w-16 bg-white/10 py-2">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#8E8279] mt-1 block">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EDE7DF] mb-8">
          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#1C1B1A] text-[#FAF8F5]'
                    : 'bg-white text-[#7B726B] border border-[#DDD5C9] hover:border-[#1C1B1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Discount Pill Filter */}
          <div className="flex items-center space-x-2 text-xs text-[#7B726B] shrink-0">
            <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-[11px] uppercase tracking-wider">Tier:</span>
            {[
              { label: 'All Markdowns', val: 0 },
              { label: '15%+ Off', val: 15 },
              { label: '20%+ Off', val: 20 }
            ].map(d => (
              <button
                key={d.val}
                onClick={() => setSelectedDiscount(d.val)}
                className={`px-2.5 py-1 rounded-xs border text-[11px] transition-colors ${
                  selectedDiscount === d.val
                    ? 'bg-[#DFCFBE] text-[#1C1B1A] border-[#DFCFBE] font-semibold'
                    : 'bg-white border-[#DDD5C9] hover:border-[#1C1B1A]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {saleProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#EDE7DF] p-8">
            <h3 className="font-serif text-2xl text-[#1C1B1A]">No archive pieces matching selected filters</h3>
            <p className="text-xs text-[#8E8279] mt-2 mb-6">Explore our full boutique catalog for active seasonal edits.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedDiscount(0); }}
              className="px-6 py-2.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
            {saleProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
