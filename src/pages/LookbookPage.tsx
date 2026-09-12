import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Eye, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BENGALI_ASSETS } from '../data/products';

interface LookbookItem {
  id: string;
  season: string;
  title: string;
  bengaliTitle?: string;
  description: string;
  image: string;
  productIds: string[];
}

export const LookbookPage: React.FC = () => {
  const { products, navigateTo, openQuickView, addToCart } = useShop();

  const looks: LookbookItem[] = [
    {
      id: 'look-1',
      season: 'শারদোৎসব ২০২৬ • Sharodutsav Campaign',
      title: 'The Crimson Jamdani Dawn',
      bengaliTitle: 'রক্তিম জামদানি প্রভাত',
      description: 'Hand-loomed Dhakai Jamdani woven with pure gold zari and fine cotton wefts. Styled alongside handcrafted Bankura Dokra choker ornaments and beaten brass bangles for Ashtami morning anjali.',
      image: BENGALI_ASSETS.heroCampaign,
      productIds: ['prod-1', 'prod-7', 'prod-9']
    },
    {
      id: 'look-2',
      season: 'বনেদি আভিজাত্য • Bonedi Bari Heritage',
      title: 'The Aristocratic Kora & Vermilion Saree',
      bengaliTitle: 'বনেদি বাড়ির লাল-পাড় কোড়া রেশম',
      description: 'Raw unbleached Murshidabad silk draped with an iconic scarlet temple border. Complemented by traditional vermilion touches and an embroidered Kantha evening stole.',
      image: BENGALI_ASSETS.bonediEdit,
      productIds: ['prod-2', 'prod-3', 'prod-6']
    },
    {
      id: 'look-3',
      season: 'শান্তিনিকেতন শিল্পকলা • Shantiniketan Salon',
      title: 'Hand-Embroidered Kantha & Tussar Ensemble',
      bengaliTitle: 'শান্তিনিকেতন নকশি কাঁথা ও তসর',
      description: 'Intricate running-stitch folklore needlework handcrafted by rural artisan women in Birbhum. Matched with Shantiniketan embossed leather minaudière and terracotta ornaments.',
      image: BENGALI_ASSETS.modelKantha,
      productIds: ['prod-3', 'prod-5', 'prod-15']
    },
    {
      id: 'look-4',
      season: 'কলকাতা সান্ধ্য বৈঠক • Ballygunge Soiree',
      title: 'Midnight Zari & Royal Bishnupuri Baluchari',
      bengaliTitle: 'বিষ্ণুপুরী স্বর্ণচরী ও মুক্তো অলঙ্কার',
      description: 'Grand mythological pallu portraying Bengal epics in polished golden thread. Elevated with freshwater pearl earrings and a raw tussar tailored waistcoat.',
      image: BENGALI_ASSETS.modelSaree,
      productIds: ['prod-4', 'prod-8', 'prod-12']
    }
  ];

  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const currentLook = looks[activeLookIndex];
  const lookProducts = products.filter(p => currentLook.productIds.includes(p.id));

  return (
    <div id="lookbook-page-root" className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Editorial Header */}
      <section className="py-14 sm:py-20 text-center max-w-2xl mx-auto px-4">
        <span className="text-xs uppercase tracking-[0.35em] text-[#8E8279] font-medium block mb-2">
          Runway & Editorial Archives
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1C1B1A] font-normal leading-tight">
          THE LOOKBOOK
        </h1>
        <p className="text-xs sm:text-sm text-[#7B726B] mt-3 font-light leading-relaxed">
          Explore complete silhouettes styled by the Maison Aura creative studio. Tap any look to inspect individual garments.
        </p>

        {/* Look switcher pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-8">
          {looks.map((look, i) => (
            <button
              key={look.id}
              onClick={() => setActiveLookIndex(i)}
              className={`px-4 py-2.5 text-xs uppercase tracking-wider font-medium transition-all ${
                activeLookIndex === i
                  ? 'bg-[#1C1B1A] text-[#FAF8F5] shadow-sm'
                  : 'bg-white text-[#7B726B] border border-[#DDD5C9] hover:border-[#1C1B1A]'
              }`}
            >
              <span>Look 0{i + 1}: {look.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Look Stage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-[#EDE7DF] p-6 sm:p-10 shadow-xs">
          
          {/* Main Visual */}
          <div className="lg:col-span-7 relative aspect-[4/5] bg-[#F3EFEA] overflow-hidden">
            <img
              src={currentLook.image}
              alt={currentLook.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#1C1B1A] text-[#FAF8F5] text-[10px] uppercase tracking-widest px-3 py-1 font-medium">
              Look 0{activeLookIndex + 1}
            </div>
          </div>

          {/* Look Details & Shoppable Garments */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">
                {currentLook.season}
              </span>
              <h2 className="font-serif text-3xl text-[#1C1B1A] font-normal mt-1 mb-1">
                {currentLook.title}
              </h2>
              {currentLook.bengaliTitle && (
                <p className="font-bengali text-lg text-[#9E2A2B] font-medium mb-3">
                  {currentLook.bengaliTitle}
                </p>
              )}
              <p className="text-xs sm:text-sm text-[#524B46] leading-relaxed font-light">
                {currentLook.description}
              </p>
            </div>

            {/* Shoppable Products in this Look */}
            <div className="border-t border-[#EDE7DF] pt-6 space-y-4">
              <span className="text-[11px] uppercase tracking-wider text-[#8E8279] font-medium block">
                Pieces in this Silhouette ({lookProducts.length})
              </span>

              <div className="space-y-3">
                {lookProducts.map(prod => (
                  <div
                    key={prod.id}
                    className="p-3 bg-[#FAF8F5] border border-[#EDE7DF] flex items-center justify-between gap-3 group"
                  >
                    <div 
                      onClick={() => navigateTo('product-detail', { productId: prod.id })}
                      className="flex items-center space-x-3 cursor-pointer flex-1"
                    >
                      <img src={prod.images[0]} alt="" className="w-12 h-16 object-cover bg-white shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase text-[#8E8279] block">{prod.category}</span>
                        <h4 className="font-serif text-xs text-[#1C1B1A] group-hover:underline font-medium line-clamp-1">
                          {prod.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#1C1B1A]">
                          ₹{prod.salePrice ? prod.salePrice.toLocaleString('en-IN') : prod.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => openQuickView(prod)}
                        className="p-2 bg-white text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-white transition-colors border border-[#DDD5C9]"
                        title="Quick View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => addToCart(prod, prod.sizes[0], prod.colors[0], 1)}
                        className="px-3 py-2 bg-[#1C1B1A] text-[#FAF8F5] text-[11px] uppercase tracking-wider font-medium hover:bg-[#333130] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="pt-4 border-t border-[#EDE7DF] flex items-center justify-between text-xs">
              <button
                onClick={() => setActiveLookIndex(Math.max(0, activeLookIndex - 1))}
                disabled={activeLookIndex === 0}
                className="flex items-center text-[#8E8279] hover:text-[#1C1B1A] disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span>Previous Look</span>
              </button>
              <span className="text-[#8E8279]">
                0{activeLookIndex + 1} / 0{looks.length}
              </span>
              <button
                onClick={() => setActiveLookIndex(Math.min(looks.length - 1, activeLookIndex + 1))}
                disabled={activeLookIndex === looks.length - 1}
                className="flex items-center text-[#8E8279] hover:text-[#1C1B1A] disabled:opacity-30"
              >
                <span>Next Look</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
