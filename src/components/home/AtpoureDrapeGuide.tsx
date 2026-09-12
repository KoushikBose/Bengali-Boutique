import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Key, HelpCircle, ChevronRight, ChevronLeft, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { BENGALI_ASSETS } from '../../data/products';
import { AlponaDivider } from '../common/AlponaMotifs';

interface DrapeStep {
  stepNumber: number;
  title: string;
  bengaliTitle: string;
  shortDesc: string;
  instructions: string[];
  proTip: string;
}

export const AtpoureDrapeGuide: React.FC = () => {
  const { navigateTo, addToCart, products } = useShop();
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: DrapeStep[] = [
    {
      stepNumber: 1,
      title: 'The Foundation Tuck & Waist Perimeter',
      bengaliTitle: 'নাভিপ্রান্তে প্রাথমিক প্যাঁচ ও কোমরে গুঁজে রাখা',
      shortDesc: 'Anchor the inner plain end of the saree securely at the navel and complete one fluid anti-clockwise circle.',
      instructions: [
        'Stand tall with your chosen heels or mojaris already on to calibrate exact floor length.',
        'Tuck the upper top border firmly into the underskirt waistband slightly to the right of your navel.',
        'Smoothly drape the saree around your waist anti-clockwise in a complete 360-degree rotation, ensuring the lower temple border skims just 0.5 inches above the floor evenly.'
      ],
      proTip: 'For crisp silk like Murshidabad Garad or Korial, ensure the petticoat waistband is firm so the weight of the silk remains taut.'
    },
    {
      stepNumber: 2,
      title: 'The Relaxed Box Pleats',
      bengaliTitle: 'প্রশস্ত মুক্ত বক্স-কুঁচি (কোনো সংকীর্ণ ভাঁজ নয়)',
      shortDesc: 'Fold wide, unhurried box pleats that expand gracefully rather than stiff contemporary knife pleats.',
      instructions: [
        'Form 3 to 4 generous, wide pleats (roughly 6 to 7 inches broad), folding them inwards towards each other.',
        'Align the pleats neatly from top to bottom, making sure the inner borders line up parallel with the outer edge.',
        'Tuck the pleats comfortably into the center navel. Unlike modern Nivi drapes, Atpoure pleats face both directions symmetrically for ease of walking.'
      ],
      proTip: 'Traditional Bengali zamindar wives created only 2-3 wide pleats so they could walk effortlessly across polished marble courtyards.'
    },
    {
      stepNumber: 3,
      title: 'The Left Shoulder Cascade',
      bengaliTitle: 'বাঁ কাঁধে আঁচলের প্রথম পর্ব স্থাপন',
      shortDesc: 'Take the decorative woven aanchal (pallu) and guide it over the left shoulder, letting it sweep down behind you.',
      instructions: [
        'Gather the remaining length of the saree and bring it around your hips from right to left.',
        'Pleat the iconic woven pallu along its natural lengthwise folds so the golden zari borders are showcased.',
        'Drape the gathered pallu over your left shoulder from front to back, securing it with a discreet safety pin at the shoulder seam.',
        'Allow the pallu to fall gracefully behind your knees.'
      ],
      proTip: 'Ensure at least 1.5 to 2 yards of fabric remain in the trailing pallu—you will need this generous length for the signature right-shoulder throw.'
    },
    {
      stepNumber: 4,
      title: 'The Signature Atpoure Throw',
      bengaliTitle: 'ডান কাঁধ দিয়ে আঁচলের দ্বিতীয় ভাঁজ সামনে আনা',
      shortDesc: 'Bring the lower tip of the pallu forward under the right arm and cast it proudly over the right shoulder.',
      instructions: [
        'Reach behind your back and grasp the bottom right corner tip of the trailing pallu.',
        'Pass the fabric under your right armpit, bringing it smoothly across the chest or waist.',
        'Toss the corner over your right shoulder so it drapes forward across the front of your torso, creating the regal two-shoulder frame.',
        'Adjust the front drape so the center of your chest is elegantly layered with the handloom weave.'
      ],
      proTip: 'This unique double-shoulder drape was designed so women could carry temple offerings and hold prayer lamps freely with both hands.'
    },
    {
      stepNumber: 5,
      title: 'The Heirloom Key Ring Weight (Chabi-Guchha)',
      bengaliTitle: 'আঁচলের কোণে রূপোর চাবির গোছা ও চূড়ান্ত বেশ',
      shortDesc: 'Weight the front corner of the pallu with an ornate silver key ring bunch or Dokra heirloom pendant.',
      instructions: [
        'Fasten an antique silver or brass Chabi-Guchha (key ring bunch) to the forward-hanging corner of the pallu on your right shoulder.',
        'The natural metallic weight holds the fabric down firmly, preventing the pallu from sliding off during floral Pushpanjali or vigorous Dhunuchi dance.',
        'Complete the aristocratic look with conch shell bangles (Shankha-Pola), a round vermilion bindi, and Alta traced around the feet.'
      ],
      proTip: 'In Bengal aristocracy, the household keys (চাবির গোছা) signified the supreme authority and grace of the Bonedi Ginnima (matriarch).'
    }
  ];

  const currentStepData = steps[activeStep - 1];
  const garadSaree = products.find(p => p.id === 'prod-2') || products[0];

  return (
    <section id="atpoure-guide-section" className="py-20 sm:py-28 bg-white border-t border-[#E8DFC8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#FBF9F5] border border-[#DDD5C9] text-[#9E2A2B] text-xs uppercase tracking-[0.25em] mb-4">
            <Key className="w-3.5 h-3.5 text-[#9E2A2B]" />
            <span className="font-bengali text-xs tracking-normal font-semibold">আটপৌরে শাড়ি পরিধান পদ্ধতি</span>
            <span className="text-[#C5A880]">•</span>
            <span className="font-medium">Master Drape Tutorial</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal tracking-tight">
            The Timeless Art of the Atpoure Drape
          </h2>
          <p className="font-bengali text-lg sm:text-2xl text-[#9E2A2B] font-medium mt-2">
            আটপৌরে শাড়ির বনেদি আভিজাত্য: ৫টি সহজ ধাপে সম্পূর্ণ নির্দেশিকা
          </p>
          <p className="text-xs sm:text-sm text-[#6E645D] mt-3 font-light leading-relaxed max-w-2xl mx-auto">
            The <em>Atpoure</em> style represents the quintessential sartorial identity of aristocratic Bengal. Unlike modern westernized drapes, Atpoure frames both shoulders with the pallu, weighted gracefully by an heirloom silver key bunch (*চাবির গোছা*).
          </p>
        </div>

        <AlponaDivider bengaliSubtitle="ধাপে ধাপে আটপৌরে শাড়ি পরার শিল্প" className="my-6" />

        {/* Step Progression Tabs */}
        <div className="flex justify-between items-center max-w-4xl mx-auto mb-10 overflow-x-auto pb-3 gap-2">
          {steps.map((step) => {
            const isActive = activeStep === step.stepNumber;
            const isCompleted = activeStep > step.stepNumber;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStep(step.stepNumber)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#9E2A2B] text-white border-[#9E2A2B] shadow-sm'
                    : isCompleted
                    ? 'bg-[#FAF8F5] text-[#1C1B1A] border-[#9E2A2B]/40'
                    : 'bg-white text-[#7B726B] border-[#DDD5C9] hover:border-[#1C1B1A]'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono ${
                  isActive ? 'bg-white text-[#9E2A2B]' : 'bg-[#EDE7DF] text-[#1C1B1A]'
                }`}>
                  {isCompleted ? '✓' : step.stepNumber}
                </span>
                <span className="hidden sm:inline">Step 0{step.stepNumber}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Drape Stage */}
        <div className="bg-[#FAF8F5] border border-[#DDD5C9] p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Atmospheric Atpoure Visual Display */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] bg-white overflow-hidden shadow-md border border-[#E8DFC8]">
                <img
                  src={BENGALI_ASSETS.atpoureDrape}
                  alt="Authentic Atpoure Saree Drape Model in Kolkata Mansion"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Step Marker Badge */}
                <div className="absolute top-4 left-4 bg-[#1C1B1A]/95 text-[#FAF8F5] px-3.5 py-1.5 text-[10px] uppercase tracking-widest border-l-2 border-[#9E2A2B]">
                  <span>Step 0{activeStep} of 05</span>
                  <span className="text-[#C5A880] mx-1.5">•</span>
                  <span className="font-bengali text-xs text-[#E2856E]">{currentStepData.bengaliTitle}</span>
                </div>

                {/* Key Guchha Callout on Step 5 */}
                {activeStep === 5 && (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 border border-[#DDD5C9] text-xs text-[#1C1B1A] shadow-md animate-fade-in">
                    <div className="flex items-center space-x-1.5 text-[#9E2A2B] font-semibold text-[11px] mb-0.5">
                      <Key className="w-3.5 h-3.5" />
                      <span>The Signature Chabi Guchha (চাবির গোছা)</span>
                    </div>
                    <p className="text-[11px] text-[#524B46] leading-tight">
                      A silver key bunch placed on the right shoulder holds the pallu in place and symbolizes the matriarchal grace of the home.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Step Details & Interactive Flow */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E2A2B] font-semibold block mb-1">
                  Stage 0{activeStep} • {currentStepData.bengaliTitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A]">
                  {currentStepData.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#524B46] mt-2 font-light leading-relaxed">
                  {currentStepData.shortDesc}
                </p>
              </div>

              {/* Instructions List */}
              <div className="space-y-3 bg-white p-5 border border-[#E2DAD0]">
                <span className="text-[11px] uppercase tracking-widest text-[#1C1B1A] font-semibold block mb-2">
                  Action Checklist (করণীয় পদক্ষেপ):
                </span>
                {currentStepData.instructions.map((inst, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-[#524B46] leading-relaxed">
                    <span className="w-4 h-4 rounded-full bg-[#FAF8F5] border border-[#C5A880] text-[#9E2A2B] font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                      {idx + 1}
                    </span>
                    <span>{inst}</span>
                  </div>
                ))}
              </div>

              {/* Pro Weaver / Stylist Tip */}
              <div className="p-4 bg-[#F2ECE4] border-l-2 border-[#9E2A2B] text-xs text-[#524B46]">
                <strong className="text-[#1C1B1A] block font-serif text-sm mb-0.5">
                  Artisan Draper's Secret (তাঁতীর গোপন পরামর্শ):
                </strong>
                {currentStepData.proTip}
              </div>

              {/* Step Navigation Controls */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                  disabled={activeStep === 1}
                  className={`px-4 py-2.5 text-xs uppercase tracking-wider font-medium border flex items-center space-x-1 ${
                    activeStep === 1
                      ? 'border-[#EDE7DF] text-[#B8AFA7] cursor-not-allowed'
                      : 'border-[#1C1B1A] text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-white'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Step</span>
                </button>

                <div className="text-xs text-[#7B726B]">
                  Step <strong className="text-[#1C1B1A]">{activeStep}</strong> of 5
                </div>

                {activeStep < 5 ? (
                  <button
                    onClick={() => setActiveStep(prev => Math.min(5, prev + 1))}
                    className="px-5 py-2.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#9E2A2B] transition-colors flex items-center space-x-1"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addToCart(garadSaree, 'Free Size', 'Raw Ivory & Vermilion', 1);
                    }}
                    className="px-5 py-2.5 bg-[#9E2A2B] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#7D2223] transition-colors flex items-center space-x-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Drape with Murshidabad Garad</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
