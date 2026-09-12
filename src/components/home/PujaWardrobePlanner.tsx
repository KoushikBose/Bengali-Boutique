import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Check, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Heart,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { BENGALI_ASSETS } from '../../data/products';
import { AlponaDivider, TempleBorder } from '../common/AlponaMotifs';

interface PujaDayPlan {
  id: string;
  dayNumber: string;
  bengaliName: string;
  englishTitle: string;
  ritualContext: string;
  recommendedVibe: string;
  timeOfDay: string;
  image: string;
  curatedProductIds: string[];
  stylingTips: string;
  bengaliQuote: string;
}

export const PujaWardrobePlanner: React.FC = () => {
  const { products, addToCart, formatPrice, addToast, navigateTo } = useShop();
  const [selectedDayId, setSelectedDayId] = useState<string>('ashtami');
  const [addingAll, setAddingAll] = useState<boolean>(false);

  const pujaDays: PujaDayPlan[] = [
    {
      id: 'shasthi',
      dayNumber: 'Day 01',
      bengaliName: 'মহাষষ্ঠী',
      englishTitle: 'Maha Shasthi • The Awakening & Welcoming',
      ritualContext: 'বোধনের সকাল ও দেবী আগমন',
      recommendedVibe: 'Crisp hand-spun Dhaniakhali Taant or lightweight Phulia cotton Jamdani in pastel dawn hues with subtle zari border.',
      timeOfDay: 'Morning Bodhon (সকাল ৯টা) to Evening Protima Darshan',
      image: BENGALI_ASSETS.modelTaant,
      curatedProductIds: ['prod-1', 'prod-7', 'prod-9'],
      stylingTips: 'Keep hair in a loose bun with fresh Shiuli flowers. Pair with minimalist terracotta or Dokra earrings and flat leather juttis.',
      bengaliQuote: 'ঢাকের কাঠি পড়ল বলে, মা আসছেন নিজের দেশে...'
    },
    {
      id: 'saptami',
      dayNumber: 'Day 02',
      bengaliName: 'মহাসপ্তমী',
      englishTitle: 'Maha Saptami • The Golden Harvest Dawn',
      ritualContext: 'নবপত্রিকা স্নান ও প্রথম অঞ্জলি',
      recommendedVibe: 'Vibrant mustard yellow or earthy ochre Shantiniketan Nakshi Kantha silk with intricate folk running-stitch embroidery.',
      timeOfDay: 'Kola Bou Snan (ভোর ৬:৩০) to Festive Afternoon Adda',
      image: BENGALI_ASSETS.modelKantha,
      curatedProductIds: ['prod-3', 'prod-6', 'prod-15'],
      stylingTips: 'Style with antique oxidized silver jhumkas and an embossed Shantiniketan leather batua pouch for daytime adda.',
      bengaliQuote: 'সপ্তমীর সোনা রোদে কাশফুলের দোলা, নীল আকাশে শারদ বার্তা।'
    },
    {
      id: 'ashtami',
      dayNumber: 'Day 03',
      bengaliName: 'মহাঅষ্টমী',
      englishTitle: 'Maha Ashtami • The Sacred Pushpanjali Peak',
      ritualContext: 'পুষ্পাঞ্জলি, কুমারী পূজা ও সন্ধিপূজা',
      recommendedVibe: 'Iconic Murshidabad Lal-Paar Garad / Korial silk draped in classic Atpoure style with vermilion borders.',
      timeOfDay: 'Morning Pushpanjali (সকাল ১০টা) & Sandhipuja (সন্ধ্যা)',
      image: BENGALI_ASSETS.atpoureDrape,
      curatedProductIds: ['prod-2', 'prod-7', 'prod-8'],
      stylingTips: 'Drape in royal Atpoure with a silver key bunch (chabi-guchha) over the right shoulder. Bold red bindi, alta on hands, and heirloom gold jewelry.',
      bengaliQuote: 'অষ্টমীর পুণ্য প্রাতে মায়ের চরণতলে অঞ্জলি, শঙ্খধ্বনি আর উলুধ্বনি।'
    },
    {
      id: 'navami',
      dayNumber: 'Day 04',
      bengaliName: 'মহানবমী',
      englishTitle: 'Maha Navami • Royal Splendor & Dhunuchi Dance',
      ritualContext: 'সান্ধ্য মহা আরতি ও ধুনুচি নাচ',
      recommendedVibe: 'Opulent Bishnupuri Baluchari or Swarnachari silk with mythological zari tapestries in deep imperial hues.',
      timeOfDay: 'Dhunuchi Naach & Grand Evening Gala (সন্ধ্যা ৭টা - রাত)',
      image: BENGALI_ASSETS.pujaCelebration,
      curatedProductIds: ['prod-4', 'prod-8', 'prod-12'],
      stylingTips: 'Rich crimson or midnight blue Baluchari paired with high-polish tested zari, statement filigree choker, and a raw silk tailored waistcoat for him.',
      bengaliQuote: 'ধুনুচির সুবাসে আর কাঁসর-ঘণ্টার রোলে নবমীর জমকালো সন্ধ্যা।'
    },
    {
      id: 'dashami',
      dayNumber: 'Day 05',
      bengaliName: 'বিজয়া দশমী',
      englishTitle: 'Bijoya Dashami • The Crimson Farewell & Sindoor Khela',
      ritualContext: 'দেবী বরণ, সিঁদুর খেলা ও শুভ বিজয়ার মিষ্টিমুখ',
      recommendedVibe: 'Sacred unbleached raw silk Korial draped with broad red borders, tailored for celebratory Sindoor Khela.',
      timeOfDay: 'Devi Boron (দুপুর ১২টা) to Evening Bijoya Greetings',
      image: BENGALI_ASSETS.modelGarad,
      curatedProductIds: ['prod-2', 'prod-6', 'prod-13'],
      stylingTips: 'Traditional red and white glass bangles (Shankha-Pola-Loho), bold red vermilion bindi, and festive gift boxes with artisanal Bengal sandesh.',
      bengaliQuote: 'আসছে বছর আবার হবে! শুভ বিজয়ার আন্তরিক প্রীতি ও শুভেচ্ছা।'
    }
  ];

  const currentPlan = pujaDays.find(d => d.id === selectedDayId) || pujaDays[2];
  const ensembleProducts = products.filter(p => currentPlan.curatedProductIds.includes(p.id));
  const ensembleTotalPrice = ensembleProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscountPrice = Math.round(ensembleTotalPrice * 0.90); // 10% festive bundle privilege

  const handleAddEnsemble = () => {
    setAddingAll(true);
    ensembleProducts.forEach(p => {
      addToCart(p, p.sizes[0] || 'One Size', p.colors[0]?.name || 'Natural Heritage', 1);
    });
    setTimeout(() => {
      setAddingAll(false);
      addToast(
        `${currentPlan.bengaliName} Ensemble Added!`,
        `All 3 coordinated pieces have been added to your shopping bag with 10% festive privilege.`,
        'success'
      );
    }, 400);
  };

  return (
    <section id="puja-planner-section" className="py-20 sm:py-28 bg-[#FBF9F5] border-t border-[#E8DFC8] relative overflow-hidden">
      
      {/* Decorative Traditional Alpona Header Motif */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#F2ECE4] border border-[#DDD5C9] text-[#9E2A2B] text-xs uppercase tracking-[0.25em] mb-3">
            <Flame className="w-3.5 h-3.5 text-[#9E2A2B]" />
            <span className="font-bengali text-xs tracking-normal font-semibold">পূজাবার্ষিকী বেশ সম্ভার</span>
            <span className="text-[#C5A880]">•</span>
            <span className="font-medium">Durga Puja Wardrobe Planner</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal tracking-tight">
            The 5-Day Sharodutsav Capsule
          </h2>
          <p className="font-bengali text-lg sm:text-2xl text-[#9E2A2B] font-medium mt-2">
            ষষ্ঠী থেকে দশমী: ঐতিহ্যবাহী বাঙালি সাজের নিপুণ সমন্বয়
          </p>
          <p className="text-xs sm:text-sm text-[#6E645D] mt-3 font-light leading-relaxed max-w-2xl mx-auto">
            From the crisp morning dew of Shasthi Bodhon to the crimson fervor of Dashami Sindoor Khela, discover our master-curated 5-day Puja ensembles. Complete styling with authentic handlooms, heirloom Dokra jewelry, and artisanal mojaris.
          </p>
        </div>

        <AlponaDivider bengaliSubtitle="শারদীয় পূজার পঞ্চদিনের রূপরেখা" className="my-6" />

        {/* 5-Day Festive Interactive Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mb-12">
          {pujaDays.map((day) => {
            const isSelected = selectedDayId === day.id;
            return (
              <button
                key={day.id}
                id={`puja-day-tab-${day.id}`}
                onClick={() => setSelectedDayId(day.id)}
                className={`p-4 text-left transition-all border relative cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1B1A] text-[#FAF8F5] border-[#1C1B1A] shadow-md scale-[1.02]'
                    : 'bg-white text-[#524B46] border-[#E2DAD0] hover:border-[#9E2A2B] hover:bg-[#FAF8F5]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#9E2A2B]" />
                )}
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest mb-1.5">
                  <span className={isSelected ? 'text-[#E2856E]' : 'text-[#8E8279]'}>
                    {day.dayNumber}
                  </span>
                  <Sparkles className={`w-3 h-3 ${isSelected ? 'text-[#E2856E]' : 'opacity-0'}`} />
                </div>
                <div className="font-bengali text-xl sm:text-2xl font-bold leading-tight mb-1">
                  {day.bengaliName}
                </div>
                <div className={`text-[11px] font-serif truncate ${isSelected ? 'text-[#D5C9BD]' : 'text-[#7B726B]'}`}>
                  {day.ritualContext}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Day Showcase Stage */}
        <div className="bg-white border border-[#DDD5C9] shadow-lg p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Atmospheric Model & Ritual Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] bg-[#F3EFEA] overflow-hidden shadow-md border border-[#E8DFC8]">
                <img
                  src={currentPlan.image}
                  alt={currentPlan.englishTitle}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#1C1B1A]/90 backdrop-blur-xs text-[#FAF8F5] px-3 py-1.5 text-[10px] uppercase tracking-widest border-l-2 border-[#9E2A2B]">
                  <span className="font-bengali text-xs mr-1.5 text-[#E2856E]">{currentPlan.bengaliName} বেশ</span>
                  <span>{currentPlan.dayNumber}</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 border border-[#DDD5C9] text-xs text-[#1C1B1A]">
                  <div className="flex items-center space-x-1.5 text-[#9E2A2B] font-medium text-[11px] mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentPlan.timeOfDay}</span>
                  </div>
                  <p className="font-bengali text-xs text-[#4A423D] italic">
                    "{currentPlan.bengaliQuote}"
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Day Overview & 3-Piece Curated Shoppable Bundle */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold mb-1">
                  <span>{currentPlan.dayNumber}</span>
                  <span>•</span>
                  <span>{currentPlan.ritualContext}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A]">
                  {currentPlan.englishTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#524B46] mt-2 font-light leading-relaxed">
                  {currentPlan.recommendedVibe}
                </p>
              </div>

              {/* Styling Tips Banner */}
              <div className="p-3.5 bg-[#FAF7F2] border-l-2 border-[#C5A880] text-xs text-[#5C534D]">
                <strong className="text-[#1C1B1A] block font-serif mb-0.5">আভিজাত্যময় পরিধান পরামর্শ (Styling Direction):</strong>
                {currentPlan.stylingTips}
              </div>

              {/* Coordinated Ensemble Products */}
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[#EDE7DF] pb-2">
                  <span className="text-xs uppercase tracking-widest text-[#1C1B1A] font-semibold">
                    The Coordinated 3-Piece Ensemble ({ensembleProducts.length} Items)
                  </span>
                  <span className="text-[11px] text-[#9E2A2B] font-medium font-bengali">
                    ১০% শারদ উপহার সহ
                  </span>
                </div>

                <div className="space-y-3">
                  {ensembleProducts.map(prod => (
                    <div 
                      key={prod.id} 
                      className="flex items-center justify-between p-3 bg-[#FAF8F5] border border-[#EDE7DF] hover:border-[#C5A880] transition-colors"
                    >
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-14 h-14 object-cover shrink-0 bg-white border border-[#E0D7CB]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <h4 className="font-serif text-xs sm:text-sm text-[#1C1B1A] font-medium truncate">
                            {prod.name}
                          </h4>
                          {prod.bengaliName && (
                            <p className="font-bengali text-xs text-[#9E2A2B]">
                              {prod.bengaliName}
                            </p>
                          )}
                          <div className="text-xs text-[#7B726B] mt-0.5">
                            {formatPrice(prod.price)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(prod, prod.sizes[0] || 'One Size', prod.colors[0]?.name || 'Natural', 1)}
                        className="px-3 py-1.5 bg-white border border-[#1C1B1A] text-[#1C1B1A] text-[11px] uppercase tracking-wider font-medium hover:bg-[#1C1B1A] hover:text-white transition-colors shrink-0 ml-2"
                      >
                        + Add Item
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bundle Checkout Bar */}
              <div className="pt-4 border-t border-[#EDE7DF] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline space-x-2.5">
                    <span className="text-xs text-[#7B726B]">Complete Look Price:</span>
                    <span className="font-serif text-xl sm:text-2xl text-[#1C1B1A] font-medium">
                      {formatPrice(bundleDiscountPrice)}
                    </span>
                    <span className="text-xs text-[#8E8279] line-through">
                      {formatPrice(ensembleTotalPrice)}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#2E6B34] font-medium flex items-center space-x-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Includes 10% Sharodutsav Bundle Privilege & Complimentary Sandesh Box</span>
                  </div>
                </div>

                <button
                  onClick={handleAddEnsemble}
                  disabled={addingAll}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#9E2A2B] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#7D2223] transition-colors shadow-sm flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addingAll ? 'Adding Coordinated Look...' : 'Add Complete Ensemble to Cart'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

      <div className="mt-14">
        <TempleBorder className="w-full h-3 text-[#E8DFC8]" />
      </div>
    </section>
  );
};
