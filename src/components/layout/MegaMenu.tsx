import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

interface MegaMenuProps {
  type: 'clothing' | 'accessories' | 'collections';
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type, onClose }) => {
  const { navigateTo } = useShop();

  const handleCategoryClick = (categoryName: string) => {
    navigateTo('shop', { category: categoryName });
    onClose();
  };

  const handleCollectionClick = (collectionName: string) => {
    navigateTo('shop', { collection: collectionName });
    onClose();
  };

  if (type === 'clothing') {
    return (
      <div 
        id="mega-menu-clothing"
        className="absolute top-full left-0 w-full bg-[#FAF8F5] border-b border-[#E8DFC8] shadow-2xl py-10 px-8 z-50 transition-all duration-300"
        onMouseLeave={onClose}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#8E8279] font-semibold mb-4 flex items-center justify-between">
              <span>Bengal Garments</span>
              <span className="text-[10px] text-[#9E2A2B] font-bengali font-normal">পোশাক</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Sarees & Drapes', bn: 'শাড়ি ও ড্রেপস' },
                { name: 'Kurtas & Tunics', bn: 'কুর্তা ও টিউনিস' },
                { name: 'Heritage Layers & Coats', bn: 'কাঁথা ও ব্লেজার' },
                { name: 'Silk Dresses', bn: 'সিল্ক ড্রেস' },
                { name: 'Handspun Tops & Blouses', bn: 'টপস ও ব্লাউজ' },
                { name: 'Trousers & Dhotis', bn: 'ধুতি ও ট্রাউজার্স' },
                { name: 'Co-ord Sets', bn: 'কো-অর্ড' }
              ].map(cat => (
                <li key={cat.name}>
                  <button
                    onClick={() => handleCategoryClick(cat.name)}
                    className="text-[#1C1B1A] hover:text-[#9E2A2B] hover:translate-x-1 transition-all text-left flex items-center justify-between w-full group py-0.5"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-[#8E8279] font-bengali opacity-0 group-hover:opacity-100 transition-opacity">{cat.bn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#8E8279] font-semibold mb-4 flex items-center justify-between">
              <span>Craft Clusters</span>
              <span className="text-[10px] text-[#C5A880] font-bengali font-normal">তাঁত কেন্দ্র</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Dhakai Jamdani Weaves', col: 'Jamdani Atelier', region: 'Dhaka & Tangail' },
                { name: 'Nakshi Kantha Embroidery', col: 'Shantiniketan Edit', region: 'Bolpur & Birbhum' },
                { name: 'Garad & Baluchari Silks', col: 'Bonedi Bari Couture', region: 'Murshidabad & Bishnupur' },
                { name: 'Dhaniakhali Handspun Muslin', col: 'Everyday Essentials', region: 'Hooghly Valley' },
                { name: 'Sharodutsav Festive Edit', col: 'Sharodutsav Edit', region: 'Kolkata Autumn' }
              ].map(item => (
                <li key={item.name}>
                  <button
                    onClick={() => handleCollectionClick(item.col)}
                    className="text-left w-full group py-0.5"
                  >
                    <div className="text-[#1C1B1A] group-hover:text-[#9E2A2B] transition-colors font-medium text-xs sm:text-sm">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-[#8E8279] font-light">
                      {item.region}
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-[#EDE7DF]">
              <button
                onClick={() => { navigateTo('shop', { tag: 'Bestseller' }); onClose(); }}
                className="text-xs uppercase tracking-widest text-[#1C1B1A] font-medium flex items-center hover:text-[#9E2A2B]"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#C5A880]" />
                Heirloom Bestsellers
              </button>
            </div>
          </div>

          {/* Featured Editorial Card 1 */}
          <div className="col-span-3">
            <div 
              onClick={() => { navigateTo('shop', { category: 'Sarees & Drapes' }); onClose(); }}
              className="group cursor-pointer relative overflow-hidden aspect-[4/5] bg-[#F3EFEA]"
            >
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
                alt="Dhakai Jamdani Drape"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#DFCFBE] mb-1">
                  Heritage Masterpiece
                </span>
                <h5 className="font-serif text-xl font-normal leading-snug">
                  Dhakai Jamdani Sarees
                </h5>
                <p className="text-xs text-[#FAF8F5]/80 mt-1 flex items-center">
                  Explore Handlooms <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </div>

          {/* Featured Editorial Card 2 */}
          <div className="col-span-3">
            <div 
              onClick={() => { handleCollectionClick('Shantiniketan Edit'); }}
              className="group cursor-pointer relative overflow-hidden aspect-[4/5] bg-[#F3EFEA]"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
                alt="Nakshi Kantha Couture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#DFCFBE] mb-1">
                  Bolpur Artisan Guild
                </span>
                <h5 className="font-serif text-xl font-normal leading-snug">
                  Nakshi Kantha Couture
                </h5>
                <p className="text-xs text-[#FAF8F5]/80 mt-1 flex items-center">
                  Explore Kantha <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'accessories') {
    return (
      <div 
        id="mega-menu-accessories"
        className="absolute top-full left-0 w-full bg-[#FAF8F5] border-b border-[#E8DFC8] shadow-2xl py-10 px-8 z-50 transition-all duration-300"
        onMouseLeave={onClose}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#8E8279] font-semibold mb-4 flex items-center justify-between">
              <span>Bengal Accents</span>
              <span className="text-[10px] text-[#C5A880] font-bengali font-normal">গয়না ও শিল্প</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Dokra Brass Jewellery', cat: 'Jewellery', bn: 'ডোকরা গয়না' },
                { name: 'Shantiniketan Leather Bags', cat: 'Handbags', bn: 'শান্তিনিকেতন ব্যাগ' },
                { name: 'Tussar Silk Chaddars', cat: 'Accessories', bn: 'তসর চাদর' },
                { name: '22k Gold-Tone Filigree', cat: 'Jewellery', bn: 'তারাকাসি নকশা' },
                { name: 'Embroidered Juttis', cat: 'Shoes', bn: 'হ্যান্ডমেড জুতো' }
              ].map(item => (
                <li key={item.name}>
                  <button
                    onClick={() => handleCategoryClick(item.cat)}
                    className="text-[#1C1B1A] hover:text-[#9E2A2B] hover:translate-x-1 transition-all text-left flex items-center justify-between w-full group py-0.5"
                  >
                    <span>{item.name}</span>
                    <span className="text-[10px] text-[#8E8279] font-bengali opacity-0 group-hover:opacity-100 transition-opacity">{item.bn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#8E8279] font-semibold mb-4">
              Living Heritage Crafts
            </h4>
            <div className="space-y-3 text-xs text-[#7B726B] leading-relaxed">
              <p>
                Our sculptural jewellery honours Bankura Dokra—a 4,000-year-old non-ferrous lost-wax metal casting technique passed down generations of artisan families.
              </p>
              <p>
                Leather accessories feature Shantiniketan vegetable-tanned sheepskin, naturally dyed and hand-embossed using engraved wooden blocks.
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={() => { navigateTo('journal'); onClose(); }}
                className="text-xs uppercase tracking-widest text-[#9E2A2B] font-medium flex items-center hover:text-[#7F1D1D]"
              >
                Read Bengal Craft Chronicles <ArrowRight className="w-3 h-3 ml-1" />
              </button>
            </div>
          </div>

          <div className="col-span-3">
            <div 
              onClick={() => { handleCategoryClick('Handbags'); }}
              className="group cursor-pointer relative overflow-hidden aspect-[4/5] bg-[#F3EFEA]"
            >
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
                alt="Shantiniketan Leather"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#DFCFBE] mb-1">
                  Tagore Craft Guild
                </span>
                <h5 className="font-serif text-xl font-normal leading-snug">
                  Embossed Leather Bags
                </h5>
                <p className="text-xs text-[#FAF8F5]/80 mt-1 flex items-center">
                  Shop Leather Goods <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div 
              onClick={() => { handleCategoryClick('Jewellery'); }}
              className="group cursor-pointer relative overflow-hidden aspect-[4/5] bg-[#F3EFEA]"
            >
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop"
                alt="Dokra Casting Jewellery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#DFCFBE] mb-1">
                  Bankura Artisans
                </span>
                <h5 className="font-serif text-xl font-normal leading-snug">
                  Dokra Lost-Wax Jewellery
                </h5>
                <p className="text-xs text-[#FAF8F5]/80 mt-1 flex items-center">
                  Shop Dokra <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Collections
  return (
    <div 
      id="mega-menu-collections"
      className="absolute top-full left-0 w-full bg-[#FAF8F5] border-b border-[#E8DFC8] shadow-2xl py-10 px-8 z-50 transition-all duration-300"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <h4 className="text-xs uppercase tracking-[0.2em] text-[#8E8279] font-semibold mb-4 flex items-center justify-between">
            <span>Curated Bengal Edits</span>
            <span className="text-[10px] text-[#9E2A2B] font-bengali font-normal">সংগ্রহ</span>
          </h4>
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
            {[
              { name: 'Sharodutsav Edit', subtitle: 'Durga Puja red & white glory' },
              { name: 'Jamdani Atelier', subtitle: 'Featherlight diaphanous muslin' },
              { name: 'Shantiniketan Edit', subtitle: 'Nakshi Kantha running stitch' },
              { name: 'Bonedi Bari Couture', subtitle: 'Aristocratic silk & gold' },
              { name: 'Everyday Essentials', subtitle: 'Pure handspun Khadi & linen' },
              { name: 'Festive Collection', subtitle: 'Swarnachari & zari accents' }
            ].map(col => (
              <button
                key={col.name}
                onClick={() => handleCollectionClick(col.name)}
                className="text-left p-2 rounded hover:bg-[#F3EFEA] transition-colors group"
              >
                <div className="font-medium text-[#1C1B1A] group-hover:text-[#9E2A2B] text-xs sm:text-sm">
                  {col.name}
                </div>
                <div className="text-xs text-[#8E8279] font-light">
                  {col.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-4">
          <div 
            onClick={() => { handleCollectionClick('Sharodutsav Edit'); }}
            className="group cursor-pointer relative overflow-hidden aspect-[16/10] bg-[#F3EFEA]"
          >
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop"
              alt="The Sharodutsav Edit"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#DFCFBE] mb-1">
                Festive Spotlight
              </span>
              <h5 className="font-serif text-2xl font-normal leading-snug">
                Sharodutsav 2026 (শারদোৎসব)
              </h5>
              <p className="text-xs text-[#FAF8F5]/80 mt-1 flex items-center">
                Explore Festive Handlooms <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-4 flex flex-col justify-between p-6 bg-[#F3EFEA] border border-[#E8DFC8]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#9E2A2B] block mb-2 font-medium">
              Bengali Heritage Lookbook
            </span>
            <h5 className="font-serif text-2xl text-[#1C1B1A] mb-3 leading-snug">
              Interactive Fashion Editorial
            </h5>
            <p className="text-xs text-[#7B726B] leading-relaxed mb-4">
              Explore our campaign styled against the architectural arches of Kolkata courtyards and Shantiniketan sal groves. Tap hotspots directly to shop entire runway ensembles.
            </p>
          </div>
          <button
            onClick={() => { navigateTo('lookbook'); onClose(); }}
            className="w-full py-3 bg-[#1C1B1A] hover:bg-[#9E2A2B] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] transition-colors text-center font-medium"
          >
            Explore Bengal Lookbook
          </button>
        </div>
      </div>
    </div>
  );
};
