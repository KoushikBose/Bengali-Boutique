import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BENGALI_ASSETS } from '../data/products';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div id="about-page-root" className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Editorial Hero Header */}
      <section className="relative h-[65vh] w-full overflow-hidden flex items-center justify-center bg-[#1C1B1A]">
        <img
          src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2000&auto=format&fit=crop"
          alt="Maison Aura Bengal Loom Atelier"
          className="w-full h-full object-cover opacity-45 brightness-90 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

        <div className="relative z-10 text-center max-w-3xl px-4 text-[#FAF8F5]">
          <span className="text-xs uppercase tracking-[0.35em] text-[#DFCFBE] mb-3 flex items-center justify-center space-x-2 font-light">
            <span className="font-bengali text-sm text-[#C5A880]">আমাদের ঐতিহ্য ও দর্শন</span>
            <span>•</span>
            <span>Heritage & Atelier Philosophy</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-tight">
            Elegance, Curated.
          </h1>
          <p className="text-sm sm:text-base text-[#FAF8F5]/85 mt-4 font-light max-w-xl mx-auto leading-relaxed">
            Uniting the understated refinement of Scandinavian minimalism with Bengal's peerless handloom heritage — Jamdani, Garad, and Shantiniketan Nakshi Kantha.
          </p>
        </div>
      </section>

      {/* Chapter 1: The Atelier Genesis */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#9E2A2B] font-medium flex items-center space-x-2">
              <span className="font-bengali text-sm">প্রথম অধ্যায় • সূচনা</span>
              <span>•</span>
              <span>Chapter I • The Genesis</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal leading-tight">
              BORN ON BENGAL'S ANCIENT LOOMS
            </h2>
            <p className="text-sm text-[#524B46] leading-relaxed font-light">
              Maison Aura (মেসন অরা) was conceived in Ballygunge, Kolkata, as an ode to Bengal's millenia-old artisanal guilds. We observed that while fast fashion flooded the modern world, the incomparable artistry of Bengal pit-loom weavers — who once spun muslin so gossamer it could pass through a signet ring — deserved a contemporary global stage.
            </p>
            <p className="text-sm text-[#524B46] leading-relaxed font-light">
              From our flagship heritage salon on Ballygunge Circular Road to our weaver clusters in Murshidabad, Nadia, and the red laterite soil of Bolpur-Shantiniketan, every garment is drafted with pure geometric proportions before being woven thread by thread on traditional wooden looms.
            </p>

            <div className="pt-4 border-t border-[#EDE7DF] grid grid-cols-3 gap-4">
              <div>
                <span className="font-serif text-2xl text-[#1C1B1A] block">100%</span>
                <span className="text-xs text-[#8E8279]">Handloom & natural fibers</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#1C1B1A] block">6 Guilds</span>
                <span className="text-xs text-[#8E8279]">Direct artisan cooperatives</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#1C1B1A] block">Zero</span>
                <span className="text-xs text-[#8E8279]">Petroleum synthetic blends</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] bg-[#F3EFEA] overflow-hidden shadow-lg">
              <img
                src={BENGALI_ASSETS.heroCampaign}
                alt="Bengal Pit-Loom Weaving & Saree Atelier"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-[#FAF8F5]/95 backdrop-blur-xs py-2 px-4 text-[10px] uppercase tracking-widest text-[#1C1B1A] border-l-2 border-[#9E2A2B]">
                Artisan Handloom Atelier • Nadia & Murshidabad
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2: Noble Bengal Materials */}
      <section className="py-20 bg-[#F3EFEA] border-y border-[#E8DFC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#9E2A2B] font-medium block mb-1">
              বাংলার বুনন শিল্প • Textile Provenance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A]">
              The Four Sacred Bengal Textile Traditions
            </h2>
            <p className="text-xs sm:text-sm text-[#7B726B] mt-2">
              Each garment carries the certified Handloommark and direct geographical indication of Bengal artisans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 bg-[#FAF8F5] border border-[#E8DFC8] space-y-3">
              <span className="text-[11px] uppercase tracking-widest text-[#9E2A2B] font-semibold block">Dhakai Jamdani</span>
              <h3 className="font-serif text-lg text-[#1C1B1A]">Gossamer Muslin Cotton</h3>
              <p className="text-xs text-[#7B726B] leading-relaxed">
                Hand-woven using opaque supplementary wefts on transparent muslin. Each floral and geometric motif is counted thread by thread using fine bamboo needles.
              </p>
            </div>

            <div className="p-8 bg-[#FAF8F5] border border-[#E8DFC8] space-y-3">
              <span className="text-[11px] uppercase tracking-widest text-[#9E2A2B] font-semibold block">Murshidabad Garad</span>
              <h3 className="font-serif text-lg text-[#1C1B1A]">Kora Mulberry Silk</h3>
              <p className="text-xs text-[#7B726B] leading-relaxed">
                Reeled from undyed mulberry silk cocoon threads, distinguished by auspicious crimson (Lal-Paar) temple borders worn during Bonedi Bari Sharodutsav ceremonies.
              </p>
            </div>

            <div className="p-8 bg-[#FAF8F5] border border-[#E8DFC8] space-y-3">
              <span className="text-[11px] uppercase tracking-widest text-[#9E2A2B] font-semibold block">Shantiniketan Kantha</span>
              <h3 className="font-serif text-lg text-[#1C1B1A]">Nakshi Running Stitch</h3>
              <p className="text-xs text-[#7B726B] leading-relaxed">
                Nurtured under Tagore's Visva-Bharati Sriniketan legacy, rural artisan women transform tussar silk into living tapestries depicting rural Bengal folktales.
              </p>
            </div>

            <div className="p-8 bg-[#FAF8F5] border border-[#E8DFC8] space-y-3">
              <span className="text-[11px] uppercase tracking-widest text-[#9E2A2B] font-semibold block">Bishnupur & Bankura</span>
              <h3 className="font-serif text-lg text-[#1C1B1A]">Baluchari & Dokra Cast</h3>
              <p className="text-xs text-[#7B726B] leading-relaxed">
                Intricate zari borders narrating classical terracotta temple epics, paired with 4,000-year-old lost-wax non-ferrous brass alloy ornaments by Dokra metal guilds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Letter */}
      <section className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#9E2A2B] font-medium block mb-3">
          প্রতিষ্ঠাতার কথা • Creative Director's Note
        </span>
        <blockquote className="font-serif text-2xl sm:text-3xl text-[#1C1B1A] font-normal leading-relaxed italic mb-6">
          "When you wrap yourself in a handloom Jamdani or slip on a tailored Kantha silk jacket, you are not just wearing luxury; you are carrying forward centuries of love, patience, and poetic stillness from the heart of Bengal."
        </blockquote>
        <div className="text-xs uppercase tracking-widest text-[#8E8279]">
          <strong className="text-[#1C1B1A] block text-base font-serif">Aura Sen (অরা সেন)</strong>
          Founder & Creative Director • Ballygunge, Kolkata
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-4 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#9E2A2B] transition-colors"
          >
            Explore The Bengal Handloom Edit
          </button>
          <button
            onClick={() => navigateTo('lookbook')}
            className="px-8 py-4 bg-white border border-[#DDD5C9] text-[#1C1B1A] text-xs uppercase tracking-[0.22em] font-medium hover:border-[#1C1B1A] transition-colors"
          >
            View Sharodutsav Lookbook
          </button>
        </div>
      </section>

    </div>
  );
};
