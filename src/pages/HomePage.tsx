import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Heart, 
  Eye, 
  ShoppingBag, 
  Instagram, 
  Compass, 
  Ruler 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { CraftsmanshipSection } from '../components/home/CraftsmanshipSection';
import { PujaWardrobePlanner } from '../components/home/PujaWardrobePlanner';
import { AtpoureDrapeGuide } from '../components/home/AtpoureDrapeGuide';
import { RituChakraSwitcher } from '../components/home/RituChakraSwitcher';
import { AlponaDivider, TempleBorder } from '../components/common/AlponaMotifs';
import { LOOKBOOK_ITEMS, BENGALI_ASSETS } from '../data/products';

export const HomePage: React.FC = () => {
  const { products, navigateTo, addToCart, formatPrice, addToast } = useShop();

  const [bestsellerTab, setBestsellerTab] = useState<'bestseller' | 'trending' | 'editors'>('bestseller');
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Slices
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 8);
  
  const bestsellersList = products.filter(p => {
    if (bestsellerTab === 'bestseller') return p.isBestseller;
    if (bestsellerTab === 'trending') return p.isTrending;
    return p.isEditorsPick;
  }).slice(0, 8);

  const activeLook = LOOKBOOK_ITEMS[activeLookIndex];
  const lookProducts = products.filter(p => activeLook.taggedProductIds.includes(p.id));

  // Shop the look single feature: Look 1
  const shopTheLookProductIds = ['prod-1', 'prod-4', 'prod-5'];
  const shopTheLookItems = products.filter(p => shopTheLookProductIds.includes(p.id));

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    addToast('Welcome to the Inner Circle', 'You have been subscribed to exclusive preview drops.', 'success');
    setNewsletterEmail('');
  };

  return (
    <div id="homepage-root" className="min-h-screen bg-[#FAF8F5]">
      
      {/* 1. HERO SECTION (Full-screen editorial) */}
      <section id="hero-section" className="relative h-[92vh] sm:h-[95vh] w-full overflow-hidden flex items-center justify-center">
        {/* Background Editorial Image with Bengali Handloom aesthetic */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={BENGALI_ASSETS.heroCampaign}
            alt="Maison Aura Bengal Handloom Sharodutsav Campaign"
            className="w-full h-full object-cover object-center scale-105 animate-subtle-zoom brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 text-[#FAF8F5] flex flex-col items-center">
          <div className="flex items-center space-x-2 text-xs sm:text-sm uppercase tracking-[0.35em] text-[#DFCFBE] mb-4 font-light">
            <span className="font-bengali text-sm tracking-normal text-[#E2856E]">শারদোৎসব ২০২৬</span>
            <span>•</span>
            <span>Sharodutsav Atelier Edition</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.08] mb-4 text-balance">
            POETRY IN HANDSPUN SILK
          </h1>
          <p className="font-bengali text-lg sm:text-2xl text-[#E8DFC8] font-normal mb-4 tracking-wide">
            বাংলার তাঁত, নকশি কাঁথা ও বয়নশিল্পের কালজয়ী আভিজাত্য
          </p>

          <p className="text-sm sm:text-base text-[#FAF8F5]/90 max-w-xl font-light tracking-wide leading-relaxed mb-8 sm:mb-10 text-balance">
            Gossamer Dhakai Jamdani, royal Murshidabad Garad, Shantiniketan Nakshi Kantha, and molten Dokra accents. Handwoven on traditional wooden looms by master artisans across Bengal.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('shop', { collection: 'Sharodutsav Edit' })}
              className="w-full sm:w-auto px-8 py-4 bg-[#FAF8F5] text-[#1C1B1A] text-xs uppercase tracking-[0.22em] font-semibold hover:bg-white hover:scale-102 transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Explore Sharodutsav Edit</span>
              <span className="font-bengali text-xs text-[#9E2A2B] tracking-normal font-normal">শারদ সম্ভার</span>
            </button>
            <button
              onClick={() => navigateTo('shop', { category: 'Sarees' })}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/80 text-white text-xs uppercase tracking-[0.22em] font-medium hover:bg-white/10 hover:scale-102 transition-all duration-300 backdrop-blur-xs flex items-center justify-center space-x-2"
            >
              <span>Handloom Drapes</span>
              <span className="font-bengali text-xs text-[#E8DFC8] tracking-normal font-normal">তাঁতের শাড়ি</span>
            </button>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-6 inset-x-0 z-10 flex justify-center text-white/70 text-[10px] uppercase tracking-[0.25em]">
          <span>Scroll to Discover Bengal Craft Heritage</span>
        </div>
      </section>

      {/* CRAFT CLUSTER HERO RIBBON */}
      <section className="bg-[#1C1B1A] text-[#FAF8F5] py-4 border-b border-[#332E2B] overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 min-w-max">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#DFCFBE] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Bengal Artisan Guilds:</span>
          </div>
          <div className="flex items-center space-x-6 text-xs text-[#EDE7DF]">
            {[
              { name: 'Dhakai Jamdani', ben: 'ঢাকা জামদানি', query: 'Dhakai Jamdani' },
              { name: 'Murshidabad Silk', ben: 'মুর্শিদাবাদ সিল্ক', query: 'Murshidabad' },
              { name: 'Shantiniketan Kantha', ben: 'শান্তিনিকেতন কাঁথা', query: 'Shantiniketan' },
              { name: 'Bishnupur Baluchari', ben: 'বিষ্ণুপুরী বালুচরি', query: 'Baluchari' },
              { name: 'Dhaniakhali Muslin', ben: 'ধনেখালি তাঁত', query: 'Dhaniakhali' },
              { name: 'Bankura Dokra Brass', ben: 'বাঁকুড়া ডোকরা', query: 'Dokra' }
            ].map((cluster, idx) => (
              <button
                key={idx}
                onClick={() => navigateTo('shop', { tag: cluster.query })}
                className="hover:text-[#C5A880] transition-colors flex items-center space-x-1.5 group cursor-pointer"
              >
                <span>{cluster.name}</span>
                <span className="font-bengali text-[11px] text-[#DFCFBE]/70 group-hover:text-[#C5A880]">({cluster.ben})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. NEW ARRIVALS (Section 7) */}
      <section id="new-arrivals-section" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#9E2A2B] block mb-2 font-medium flex items-center space-x-2">
              <span className="font-bengali text-xs tracking-normal">নতুন আগমনী</span>
              <span>•</span>
              <span>Sharodutsav Drop 2026</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal">
              New Handloom Arrivals
            </h2>
            <p className="text-xs sm:text-sm text-[#7B726B] mt-2 max-w-lg">
              Fresh from Bengal's artisan looms. Diaphanous Jamdani weaves, tussar silk sets, and intricate hand-embroidered Kantha statement pieces.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop', { tag: 'New' })}
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] font-medium text-[#1C1B1A] hover:text-[#9E2A2B] flex items-center group transition-colors"
          >
            <span>View All New In (সব দেখুন)</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY (Section 8: Asymmetric editorial cards) */}
      <section id="shop-by-category-section" className="py-16 bg-[#F3EFEA] border-y border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#9E2A2B] font-medium block">
              বাংলার বয়ন ও শিল্পশৈলী • Artisanal Crafts
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-normal mt-1">
              Shop By Craft & Category
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Sarees & Drapes - Large Left Card */}
            <div 
              onClick={() => navigateTo('shop', { category: 'Sarees' })}
              className="md:col-span-7 group relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-[540px] cursor-pointer bg-[#FAF8F5]"
            >
              <img
                src={BENGALI_ASSETS.modelSaree}
                alt="Bengal Sarees and Drapes"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-xs uppercase tracking-[0.25em] text-[#DFCFBE] mb-2 font-medium flex items-center space-x-2">
                  <span className="font-bengali text-sm text-[#E2856E]">শাড়ি ও ড্রেপস</span>
                  <span>•</span>
                  <span>Handloom Drapes</span>
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight">
                  Sarees & Heritage Drapes
                </h3>
                <p className="text-xs text-white/80 mt-2 max-w-md">
                  Dhakai Jamdani with supplementary weft florets, Bishnupuri Baluchari epics, and pure Murshidabad Garad with temple borders.
                </p>
                <div className="mt-4 flex items-center text-xs uppercase tracking-[0.2em] font-medium text-[#DFCFBE] group-hover:text-white transition-colors">
                  <span>Explore Sarees (শাড়ি সম্ভার)</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Right 2 Stacked Cards */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* Kantha Jackets & Kurtas */}
              <div 
                onClick={() => navigateTo('shop', { category: 'Clothing' })}
                className="group relative overflow-hidden h-[258px] cursor-pointer bg-[#FAF8F5]"
              >
                <img
                  src={BENGALI_ASSETS.modelKurta}
                  alt="Kantha & Kurtas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFCFBE] mb-1 flex items-center space-x-2">
                    <span className="font-bengali text-xs text-[#E2856E]">শান্তিনিকেতন কাঁথা</span>
                    <span>•</span>
                    <span>Hand-Stitched Heirlooms</span>
                  </span>
                  <h3 className="font-serif text-2xl font-normal leading-tight">
                    Kurtas, Sets & Kantha Capes
                  </h3>
                  <div className="mt-2 flex items-center text-[11px] uppercase tracking-[0.2em] font-medium text-[#DFCFBE]">
                    <span>Shop Kurtas & Layers</span>
                    <ArrowRight className="w-3 h-3 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Dokra & Accessories */}
              <div 
                onClick={() => navigateTo('shop', { category: 'Accessories' })}
                className="group relative overflow-hidden h-[258px] cursor-pointer bg-[#FAF8F5]"
              >
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop"
                  alt="Dokra & Shantiniketan Leather"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFCFBE] mb-1 flex items-center space-x-2">
                    <span className="font-bengali text-xs text-[#E2856E]">ডোকরা ও চামড়ার কারুকাজ</span>
                    <span>•</span>
                    <span>Lost-Wax Brass & Leather</span>
                  </span>
                  <h3 className="font-serif text-2xl font-normal leading-tight">
                    Dokra Jewellery & Bags
                  </h3>
                  <div className="mt-2 flex items-center text-[11px] uppercase tracking-[0.2em] font-medium text-[#DFCFBE]">
                    <span>Discover Crafts & Accents</span>
                    <ArrowRight className="w-3 h-3 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COLLECTION (Section 9: Editorial Split Section) */}
      <section id="featured-collection-section" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large fashion image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden bg-[#F3EFEA] shadow-xl">
              <img
                src={BENGALI_ASSETS.bonediEdit}
                alt="The Bonedi Bari Edit"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-[#FAF8F5]/90 backdrop-blur-xs py-2 px-4 text-[10px] uppercase tracking-[0.25em] text-[#1C1B1A]">
                <span className="font-bengali text-xs mr-2 text-[#9E2A2B]">বনেদি বাড়ি সম্ভার</span>
                <span>Bengal Aristocratic Heritage Series</span>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative & CTA */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#9E2A2B] font-medium flex items-center space-x-2">
              <span className="font-bengali text-sm">শারদোৎসব বিশেষ সম্ভার</span>
              <span>•</span>
              <span>Editorial Spotlight</span>
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1B1A] font-normal leading-tight">
              THE BONEDI BARI EDIT
            </h2>

            <p className="text-sm sm:text-base text-[#524B46] leading-relaxed font-light">
              Echoing the timeless grace of Bengal's aristocratic estates during Durga Puja. Unbleached kora silks, Lal-Paar vermilion red temple borders, and intricate needlework that tells ancient folktales from Shantiniketan's terracotta temples.
            </p>

            <div className="pt-2 border-t border-[#EDE7DF] space-y-3 text-xs text-[#7B726B]">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E2A2B]" />
                <span>100% natural Mulberry, Tussar silk & hand-spun Bengal cotton</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E2A2B]" />
                <span>Hand-stitched running Kantha and traditional Zari weaving</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9E2A2B]" />
                <span>Certified Bengal Handloommark with master weaver signature card</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigateTo('shop', { collection: 'Sharodutsav Edit' })}
                className="px-8 py-4 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#9E2A2B] transition-colors"
              >
                EXPLORE THE BONEDI BARI EDIT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BESTSELLERS (Section 10: Tabs & Product Carousel/Grid) */}
      <section id="bestsellers-section" className="py-20 bg-[#F9F7F4] border-t border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-[#EDE7DF]">
            <div>
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#9E2A2B] font-medium block mb-1">
                সেরা সমাহার • Client Heirlooms
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-normal">
                Curated Bengal Bestsellers
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 mt-4 md:mt-0 flex-wrap gap-y-2">
              {[
                { key: 'bestseller', label: 'Bestselling Handlooms', ben: 'সেরা তাঁত' },
                { key: 'trending', label: 'Trending in Kolkata', ben: 'জনপ্রিয়' },
                { key: 'editors', label: "Curator's Picks", ben: 'বাছাইকৃত' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setBestsellerTab(tab.key as any)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all flex items-center space-x-1.5 ${
                    bestsellerTab === tab.key
                      ? 'bg-[#1C1B1A] text-[#FAF8F5]'
                      : 'bg-white text-[#524B46] hover:bg-[#EDE7DF]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="font-bengali text-[11px] opacity-80">({tab.ben})</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
            {bestsellersList.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CRAFTSMANSHIP: HISTORICAL & ARTISTIC BACKGROUND OF JAMDANI & BALUCHARI SILK LOOMS */}
      <CraftsmanshipSection />

      {/* 7. DURGA PUJA 5-DAY WARDROBE PLANNER (SHASTHI TO DASHAMI) */}
      <PujaWardrobePlanner />

      {/* 8. LOOKBOOK SECTION (Section 11: The Maison Aura Lookbook) */}
      <section id="lookbook-section" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#8E8279] font-medium block mb-2">
              Runway & Campaign
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal">
              THE MAISON AURA LOOKBOOK
            </h2>
            <p className="text-xs sm:text-sm text-[#7B726B] mt-2">
              Direct from our seasonal salon presentations. Click any look to shop garments directly.
            </p>
          </div>

          {/* Lookbook Navigator Controls */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => setActiveLookIndex(prev => (prev === 0 ? LOOKBOOK_ITEMS.length - 1 : prev - 1))}
              className="p-3 border border-[#DDD5C9] bg-white text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-white transition-colors"
              aria-label="Previous Look"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs uppercase tracking-widest text-[#7B726B]">
              Look 0{activeLookIndex + 1} / 0{LOOKBOOK_ITEMS.length}
            </span>
            <button
              onClick={() => setActiveLookIndex(prev => (prev + 1) % LOOKBOOK_ITEMS.length)}
              className="p-3 border border-[#DDD5C9] bg-white text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-white transition-colors"
              aria-label="Next Look"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Big Active Look Display with Interactive Tagged Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Editorial Image with Hotspots */}
          <div className="lg:col-span-8 relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-[600px] bg-[#F3EFEA] overflow-hidden shadow-lg">
            <img
              src={activeLook.image}
              alt={activeLook.title}
              className="w-full h-full object-cover object-center transition-all duration-700"
            />

            {/* Hotspots */}
            {activeLook.hotspots?.map((hs, idx) => {
              const tagged = products.find(p => p.id === hs.productId);
              return (
                <div
                  key={idx}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 cursor-pointer"
                  onClick={() => tagged && navigateTo('product-detail', { productId: tagged.id })}
                >
                  <span className="w-6 h-6 rounded-full bg-white/90 text-[#1C1B1A] flex items-center justify-center shadow-lg text-xs font-serif animate-pulse hover:scale-125 transition-transform">
                    +
                  </span>
                  {tagged && (
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-[#1C1B1A] text-white p-2.5 shadow-xl text-left pointer-events-none">
                      <span className="text-[9px] uppercase tracking-widest text-[#DFCFBE] block">{tagged.category}</span>
                      <p className="font-serif text-xs line-clamp-1">{tagged.name}</p>
                      <p className="text-xs font-semibold text-[#FAF8F5] mt-1">{formatPrice(tagged.salePrice ?? tagged.price)}</p>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="absolute bottom-6 left-6 right-6 bg-[#1C1B1A]/85 backdrop-blur-xs p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#DFCFBE] block">
                  {activeLook.season}
                </span>
                <h4 className="font-serif text-2xl font-normal">
                  {activeLook.title}
                </h4>
                <p className="text-xs text-white/80 font-light mt-0.5">{activeLook.subtitle}</p>
              </div>
              <button
                onClick={() => navigateTo('lookbook')}
                className="px-4 py-2 bg-[#FAF8F5] text-[#1C1B1A] text-xs uppercase tracking-wider font-semibold hover:bg-white shrink-0 self-start sm:self-center"
              >
                View Full Lookbook
              </button>
            </div>
          </div>

          {/* Right: Tagged Pieces in this Look */}
          <div className="lg:col-span-4 bg-[#F3EFEA] p-6 flex flex-col justify-between border border-[#E8DFC8]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E8279] block mb-2 font-medium">
                Pieces in this Ensemble
              </span>
              <h3 className="font-serif text-xl text-[#1C1B1A] mb-4">
                Shop The Runway Ensemble
              </h3>

              <div className="space-y-4 divide-y divide-[#EDE7DF]">
                {lookProducts.map(prod => (
                  <div key={prod.id} className="pt-3 first:pt-0 flex space-x-3 items-center">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-16 h-20 object-cover bg-white shrink-0 cursor-pointer"
                      onClick={() => navigateTo('product-detail', { productId: prod.id })}
                    />
                    <div className="flex-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#8E8279]">{prod.category}</span>
                      <h5 
                        onClick={() => navigateTo('product-detail', { productId: prod.id })}
                        className="font-serif text-sm text-[#1C1B1A] hover:text-[#8E8279] cursor-pointer line-clamp-1"
                      >
                        {prod.name}
                      </h5>
                      <span className="text-xs font-semibold text-[#1C1B1A] mt-0.5 block">
                        {formatPrice(prod.salePrice ?? prod.price)}
                      </span>
                      <button
                        onClick={() => addToCart(prod, prod.sizes[0], prod.colors[0], 1)}
                        className="text-[10px] uppercase tracking-widest text-[#1C1B1A] hover:text-[#8E8279] font-medium underline underline-offset-4 mt-1"
                      >
                        Add To Bag ({prod.sizes[0]})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#EDE7DF] mt-6">
              <button
                onClick={() => {
                  lookProducts.forEach(p => addToCart(p, p.sizes[0], p.colors[0], 1));
                }}
                className="w-full py-3.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333130] transition-colors text-center"
              >
                Add Complete Look To Bag
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SHOP THE LOOK (Section 12: Shoppable Editorial Image) */}
      <section id="shop-the-look-section" className="py-20 bg-[#FAF8F5] border-t border-[#EDE7DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#9E2A2B] font-medium">
              শারদ সন্ধ্যা সমাহার • Curated Ensemble
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-normal mt-1">
              SHOP THIS PUJA ENSEMBLE
            </h2>
            <p className="text-xs sm:text-sm text-[#7B726B] mt-1.5">
              The sacred festive harmony: Murshidabad Lal-Paar Garad silk, handcrafted Dokra choker, and artisanal leather mojaris.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F3EFEA] p-6 sm:p-10 border border-[#E8DFC8]">
            {/* Image on Left */}
            <div className="lg:col-span-6 relative aspect-[3/4] overflow-hidden bg-white shadow-md">
              <img
                src={BENGALI_ASSETS.modelGarad}
                alt="Styled Bengali Heritage Look"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#1C1B1A] text-[#FAF8F5] text-[10px] uppercase tracking-widest px-3 py-1">
                <span className="font-bengali text-xs mr-1.5 text-[#E2856E]">শারদ বেশ</span>
                <span>Ensemble 01</span>
              </div>
            </div>

            {/* Product List on Right */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                {shopTheLookItems.map(item => (
                  <div key={item.id} className="p-4 bg-white border border-[#EDE7DF] flex items-center justify-between hover:border-[#1C1B1A] transition-colors">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-16 h-20 object-cover bg-[#F3EFEA]"
                      />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8E8279]">{item.category}</span>
                        <h4 
                          onClick={() => navigateTo('product-detail', { productId: item.id })}
                          className="font-serif text-base text-[#1C1B1A] hover:text-[#8E8279] cursor-pointer"
                        >
                          {item.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1 text-xs">
                          <span className="font-semibold text-[#1C1B1A]">{formatPrice(item.salePrice ?? item.price)}</span>
                          <span className="text-[#8E8279]">Color: {item.colors[0].name}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(item, item.sizes[0], item.colors[0], 1)}
                      className="px-4 py-2 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-wider hover:bg-[#333130] transition-colors shrink-0"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#7B726B]">
                  Complimentary luxury gift wrapping with dried shiuli flowers.
                </div>
                <button
                  onClick={() => {
                    shopTheLookItems.forEach(item => addToCart(item, item.sizes[0], item.colors[0], 1));
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#DFCFBE] text-[#1C1B1A] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors"
                >
                  Buy Entire Ensemble
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. ATPOURE SAREE DRAPE GUIDE (TRADITIONAL BENGAL DRAPE TUTORIAL) */}
      <AtpoureDrapeGuide />

      {/* 10. TRENDING NOW (Section 13: dynamic searches & categories) */}
      <section id="trending-now-section" className="py-16 bg-[#F9F7F4] border-y border-[#EDE7DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#9E2A2B] font-medium block">
            জনপ্রিয় অনুসন্ধান • Curated Searches
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A] mt-1 mb-6">
            Trending Bengal Heirlooms
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mx-auto">
            {[
              'Dhakai Jamdani',
              'Murshidabad Garad',
              'Nakshi Kantha Dupatta',
              'Baluchari Saree',
              'Ballygunge Festive Edit',
              'Shantiniketan Leather Bag',
              'Dokra Brass Choker',
              'Dhaniakhali Cotton',
              'Lal-Paar Garad',
              'Tussar Silk Jacket'
            ].map(term => (
              <button
                key={term}
                onClick={() => navigateTo('shop', { tag: term })}
                className="px-5 py-2.5 bg-white border border-[#DDD5C9] text-xs uppercase tracking-wider text-[#1C1B1A] hover:bg-[#9E2A2B] hover:text-[#FAF8F5] transition-all duration-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 11. BENGALI SIX SEASONS (RITU-CHAKRA) COLLECTION SWITCHER */}
      <RituChakraSwitcher />

      {/* 12. BRAND STORY (Section 14: Crafted for the modern woman) */}
      <section id="brand-story-section" className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#9E2A2B] font-medium flex items-center space-x-2">
              <span className="font-bengali text-sm">আমাদের ঐতিহ্য ও দর্শন</span>
              <span>•</span>
              <span>Our Philosophy & Heritage</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal leading-tight">
              POETRY BORN OF BENGAL'S LOOMS
            </h2>

            <p className="text-sm sm:text-base text-[#524B46] leading-relaxed font-light">
              Maison Aura (মেসন অরা) bridges the refined architectural minimalism of contemporary design with the peerless textile antiquity of Bengal. We believe true luxury whispers through the rhythmic clatter of wooden pit-looms and the patient devotion of master weavers.
            </p>

            <p className="text-xs sm:text-sm text-[#7B726B] leading-relaxed font-light">
              Rooted in our flagship salon on Ballygunge Circular Road, Kolkata, our atelier partners directly with artisan cooperatives across Murshidabad, Nadia, Bishnupur, and the red-earth hamlet of Bolpur-Shantiniketan. Every Jamdani motif is counted thread by thread on bamboo needles, ensuring these centuries-old living crafts thrive in modern wardrobes worldwide.
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('about')}
                className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1B1A] hover:text-[#9E2A2B] flex items-center group transition-colors"
              >
                <span>Explore The Bengal Artisan Story (আমাদের গল্প)</span>
                <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-[#F3EFEA] overflow-hidden shadow-md">
              <img
                src={BENGALI_ASSETS.modelTaant}
                alt="Dhaniakhali Handloom Taant Model"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] bg-[#F3EFEA] overflow-hidden mt-8 shadow-md">
              <img
                src={BENGALI_ASSETS.modelAnarkali}
                alt="Baluchari Silk Festive Model"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. INSTAGRAM / SOCIAL SECTION (Section 15: Follow the world of Maison Aura) */}
      <section id="instagram-section" className="py-20 bg-[#F3EFEA] border-t border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E8279] font-medium">
            Social Community
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] mt-1 mb-2 font-normal">
            FOLLOW THE WORLD OF MAISON AURA
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.22em] text-[#8E8279] hover:text-[#1C1B1A] transition-colors inline-flex items-center"
          >
            <Instagram className="w-3.5 h-3.5 mr-1 text-[#C5A880]" />
            <span>@MAISONAURA</span>
          </a>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { img: BENGALI_ASSETS.heroCampaign, likes: '2.4k' },
              { img: BENGALI_ASSETS.modelSaree, likes: '3.1k' },
              { img: BENGALI_ASSETS.modelGarad, likes: '1.9k' },
              { img: BENGALI_ASSETS.modelKantha, likes: '2.8k' },
              { img: BENGALI_ASSETS.bonediEdit, likes: '4.2k' },
              { img: BENGALI_ASSETS.modelKurta, likes: '2.5k' }
            ].map((post, idx) => (
              <div 
                key={idx}
                className="group relative aspect-square overflow-hidden bg-[#FAF8F5] cursor-pointer shadow-xs"
              >
                <img
                  src={post.img}
                  alt="Maison Aura Bengali Model Community"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white space-x-1.5 text-xs font-medium">
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{post.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. NEWSLETTER (Section 16: Join the inner circle) */}
      <section id="newsletter-section" className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#EDE7DF] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E8279] font-medium block mb-2">
            Private Atelier List
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal leading-tight">
            JOIN THE INNER CIRCLE
          </h2>
          <p className="text-xs sm:text-sm text-[#7B726B] mt-3 mb-8 leading-relaxed font-light">
            Be the first to discover new seasonal collections, private runway edits, and exclusive invitations to salon previews.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-white border border-[#DDD5C9] px-4 py-3.5 text-xs text-[#1C1B1A] focus:outline-none focus:border-[#1C1B1A] placeholder:text-[#9A9086]"
              required
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333130] transition-colors"
            >
              SUBSCRIBE
            </button>
          </form>

          <p className="text-[10px] text-[#8E8279] mt-3">
            By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
          </p>
        </div>
      </section>

    </div>
  );
};
