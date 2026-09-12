import React, { useState } from 'react';
import { Sparkles, Sun, CloudRain, Wind, Flame, Snowflake, Flower2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { AlponaDivider } from '../common/AlponaMotifs';

interface Ritu {
  id: string;
  name: string;
  bengaliName: string;
  bengaliMonths: string;
  englishSeason: string;
  icon: React.ElementType;
  colorHex: string;
  poeticLine: string;
  poetAttribution: string;
  fabricAtmosphere: string;
  highlightCategory: string;
  productIds: string[];
}

export const RituChakraSwitcher: React.FC = () => {
  const { products, navigateTo, addToCart, formatPrice } = useShop();
  const [selectedRituId, setSelectedRituId] = useState<string>('shorot');

  const ritus: Ritu[] = [
    {
      id: 'grishma',
      name: 'Grishma',
      bengaliName: 'গ্রীষ্ম',
      bengaliMonths: 'বৈশাখ • জ্যৈষ্ঠ',
      englishSeason: 'Summer & Noboborsho',
      icon: Sun,
      colorHex: '#C57E44',
      poeticLine: 'বৈশাখ হে, মৌনি তাপস, বৈশাখী ঝড় তব ডাকিছে...',
      poetAttribution: 'রবীন্দ্রনাথ ঠাকুর',
      fabricAtmosphere: 'Ultra-fine 200s count Phulia handspun cotton muslins, breathable Dhaniakhali weaves, and light unbleached linen kurtas designed to float in warm tropical breezes.',
      highlightCategory: 'Taant & Fine Cottons',
      productIds: ['prod-10', 'prod-11', 'prod-13']
    },
    {
      id: 'barsha',
      name: 'Barsha',
      bengaliName: 'বর্ষা',
      bengaliMonths: 'আষাঢ় • শ্রাবণ',
      englishSeason: 'Monsoon & Riverine Rains',
      icon: CloudRain,
      colorHex: '#3D5A80',
      poeticLine: 'বাদল-দিনের প্রথম কদম ফুল করেছ দান...',
      poetAttribution: 'রবীন্দ্রনাথ ঠাকুর',
      fabricAtmosphere: 'Deep indigo riverine vegetable dyes, moisture-resistant raw mulberry silk, and flowing Jamdani gossamers that drape with liquid grace during overcast afternoons.',
      highlightCategory: 'Indigo & Mulberry Silk',
      productIds: ['prod-1', 'prod-14', 'prod-7']
    },
    {
      id: 'shorot',
      name: 'Shorot',
      bengaliName: 'শরৎ',
      bengaliMonths: 'ভাদ্র • আশ্বিন',
      englishSeason: 'Sharodutsav & Grand Durga Puja',
      icon: Sparkles,
      colorHex: '#9E2A2B',
      poeticLine: 'মেঘের কোলে রোদ হেসেছে, বাদল গেছে টুটি— আজ আমাদের ছুটি ও ভাই, আজ আমাদের ছুটি...',
      poetAttribution: 'রবীন্দ্রনাথ ঠাকুর',
      fabricAtmosphere: 'Sacred Murshidabad Lal-Paar Garad silks, imperial Bishnupuri Swarnachari with pure gold zari, and Dhakai muslins celebrating the descent of the Divine Mother.',
      highlightCategory: 'Garad, Jamdani & Baluchari',
      productIds: ['prod-2', 'prod-4', 'prod-7']
    },
    {
      id: 'hemanta',
      name: 'Hemanta',
      bengaliName: 'হেমন্ত',
      bengaliMonths: 'কার্তিক • অগ্রহায়ণ',
      englishSeason: 'Golden Harvest & Nabanna',
      icon: Wind,
      colorHex: '#B57C1E',
      poeticLine: 'আবার আসিব ফিরে ধানসিঁড়িটির তীরে— এই বাংলায়...',
      poetAttribution: 'জীবনানন্দ দাশ',
      fabricAtmosphere: 'Earthy raw Tussar silk reflecting golden paddy fields, delicate Shantiniketan folk Kantha embroidery, and mild evening wraps for peaceful pastoral gatherings.',
      highlightCategory: 'Tussar & Nakshi Kantha',
      productIds: ['prod-3', 'prod-9', 'prod-15']
    },
    {
      id: 'sheet',
      name: 'Sheet',
      bengaliName: 'শীত',
      bengaliMonths: 'পৌষ • মাঘ',
      englishSeason: 'Winter & Shantiniketan Poush Mela',
      icon: Snowflake,
      colorHex: '#4A5568',
      poeticLine: 'পৌষ তোদের ডাক দিয়েছে, আয় রে চলে, আয় আয় আয়...',
      poetAttribution: 'রবীন্দ্রনাথ ঠাকুর',
      fabricAtmosphere: 'Multi-layered quilted Nakshi Kantha coats, structured heavy Matka silk jackets, and handwoven woolen stoles for misty morning addas with warm Nolen Gur.',
      highlightCategory: 'Quilted Kantha & Matka Silk',
      productIds: ['prod-12', 'prod-3', 'prod-6']
    },
    {
      id: 'basanta',
      name: 'Basanta',
      bengaliName: 'বসন্ত',
      bengaliMonths: 'ফাল্গুন • চৈত্র',
      englishSeason: 'Spring & Dol Purnima',
      icon: Flower2,
      colorHex: '#D95D39',
      poeticLine: 'ওরে গৃহবাসী খোল, দ্বার খোল, লাগল যে দোল...',
      poetAttribution: 'রবীন্দ্রনাথ ঠাকুর',
      fabricAtmosphere: 'Bright Palash vermilion, abir-pink organza, vibrant spring floral Jamdani motifs, and festive gold filigree jewellery welcoming the blooming Bengali New Year.',
      highlightCategory: 'Floral Jamdani & Pastels',
      productIds: ['prod-1', 'prod-8', 'prod-5']
    }
  ];

  const currentRitu = ritus.find(r => r.id === selectedRituId) || ritus[2];
  const rituProducts = products.filter(p => currentRitu.productIds.includes(p.id));

  return (
    <section id="ritu-chakra-section" className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#E8DFC8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#EFE9DF] border border-[#DDD5C9] text-[#9E2A2B] text-xs uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#9E2A2B]" />
            <span className="font-bengali text-xs tracking-normal font-semibold">বাংলার চিরন্তন ষড়ঋতু</span>
            <span className="text-[#C5A880]">•</span>
            <span className="font-medium">The Six Bengali Ritus</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal tracking-tight">
            The Bengali Ritu-Chakra Collection
          </h2>
          <p className="font-bengali text-lg sm:text-2xl text-[#9E2A2B] font-medium mt-2">
            ঋতু পরিবর্তনের সঙ্গে বাংলার তাঁতের রূপবদল
          </p>
          <p className="text-xs sm:text-sm text-[#6E645D] mt-3 font-light leading-relaxed max-w-2xl mx-auto">
            Bengal lives by six distinct poetic seasons, each inspiring its own textile weight, weave density, and color palette. Select a Ritu to explore how our handlooms adapt to nature's rhythm.
          </p>
        </div>

        <AlponaDivider bengaliSubtitle="ছয় ঋতুর ছয় রূপ" className="my-6" />

        {/* 6 Ritu Pills Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-12">
          {ritus.map((ritu) => {
            const Icon = ritu.icon;
            const isSelected = selectedRituId === ritu.id;
            return (
              <button
                key={ritu.id}
                id={`ritu-tab-${ritu.id}`}
                onClick={() => setSelectedRituId(ritu.id)}
                className={`p-3.5 text-center transition-all border relative cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1B1A] text-white border-[#1C1B1A] shadow-md -translate-y-1'
                    : 'bg-white text-[#524B46] border-[#DDD5C9] hover:border-[#9E2A2B] hover:bg-[#FAF8F5]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#9E2A2B]" />
                )}
                <div className="flex justify-center mb-1.5">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#E2856E]' : 'text-[#8E8279]'}`} />
                </div>
                <div className="font-bengali text-lg sm:text-xl font-bold leading-tight">
                  {ritu.bengaliName}
                </div>
                <div className={`text-[10px] uppercase tracking-wider mt-0.5 ${isSelected ? 'text-[#D5C9BD]' : 'text-[#7B726B]'}`}>
                  {ritu.name}
                </div>
                <div className={`text-[10px] font-bengali mt-1 ${isSelected ? 'text-[#E2856E]' : 'text-[#9E2A2B]'}`}>
                  {ritu.bengaliMonths}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Ritu Mood & Fabric Showcase */}
        <div className="bg-white border border-[#DDD5C9] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8 pb-8 border-b border-[#EDE7DF]">
            <div className="lg:col-span-8">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold mb-1">
                <span>{currentRitu.englishSeason}</span>
                <span>•</span>
                <span className="font-bengali text-xs tracking-normal">{currentRitu.bengaliMonths}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#1C1B1A] flex items-baseline space-x-3">
                <span>{currentRitu.name} Collection</span>
                <span className="font-bengali text-2xl text-[#9E2A2B] font-normal">({currentRitu.bengaliName})</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#524B46] mt-3 leading-relaxed font-light max-w-3xl">
                {currentRitu.fabricAtmosphere}
              </p>
            </div>

            {/* Poetic Inscription Quote */}
            <div className="lg:col-span-4 bg-[#FBF9F5] p-4 sm:p-5 border-l-2 border-[#9E2A2B]">
              <p className="font-bengali text-xs sm:text-sm text-[#1C1B1A] italic leading-relaxed">
                "{currentRitu.poeticLine}"
              </p>
              <span className="text-[10px] text-[#7B726B] uppercase tracking-widest font-medium block mt-2">
                — {currentRitu.poetAttribution}
              </span>
            </div>
          </div>

          {/* Curated Products for this Season */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-serif text-base sm:text-lg text-[#1C1B1A]">
                Seasonal Wardrobe Highlights ({currentRitu.highlightCategory})
              </h4>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs uppercase tracking-widest font-medium text-[#1C1B1A] hover:text-[#9E2A2B] flex items-center space-x-1"
              >
                <span>View Full Seasonal Archive</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {rituProducts.map((product) => (
                <div 
                  key={product.id}
                  className="group bg-[#FAF8F5] border border-[#EDE7DF] overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F3EFEA]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#1C1B1A]/85 text-white text-[9px] uppercase tracking-widest px-2 py-1">
                      {product.clusterOrigin || 'Bengal Handloom'}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-serif text-sm text-[#1C1B1A] group-hover:text-[#9E2A2B] transition-colors truncate font-medium">
                        {product.name}
                      </h5>
                      {product.bengaliName && (
                        <p className="font-bengali text-xs text-[#9E2A2B] mt-0.5">
                          {product.bengaliName}
                        </p>
                      )}
                      <div className="text-xs font-medium text-[#1C1B1A] mt-2">
                        {formatPrice(product.price)}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product, product.sizes[0] || 'One Size', product.colors[0]?.name || 'Natural', 1)}
                      className="mt-4 w-full py-2 bg-white border border-[#1C1B1A] text-[#1C1B1A] text-[11px] uppercase tracking-wider font-medium hover:bg-[#1C1B1A] hover:text-white transition-colors flex items-center justify-center space-x-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
