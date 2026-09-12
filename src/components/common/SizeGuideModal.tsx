import React, { useState } from 'react';
import { X, Ruler, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen, sizeGuideCategory, setSizeGuideCategory } = useShop();
  const [unit, setUnit] = useState<'cm' | 'in'>('in');

  if (!isSizeGuideOpen) return null;

  const tabs = ['Clothing', 'Dresses', 'Shoes', 'Accessories'];

  const clothingData = [
    { size: 'XS', uk: 'UK 6', us: 'US 2', eu: 'EU 34', bustIn: '31 - 32', waistIn: '24 - 25', hipIn: '34 - 35', bustCm: '79 - 82', waistCm: '61 - 64', hipCm: '86 - 89' },
    { size: 'S', uk: 'UK 8', us: 'US 4', eu: 'EU 36', bustIn: '33 - 34', waistIn: '26 - 27', hipIn: '36 - 37', bustCm: '84 - 87', waistCm: '66 - 69', hipCm: '91 - 94' },
    { size: 'M', uk: 'UK 10', us: 'US 6', eu: 'EU 38', bustIn: '35 - 36', waistIn: '28 - 29', hipIn: '38 - 39', bustCm: '89 - 92', waistCm: '71 - 74', hipCm: '96 - 99' },
    { size: 'L', uk: 'UK 12', us: 'US 8', eu: 'EU 40', bustIn: '37 - 38', waistIn: '30 - 31', hipIn: '40 - 41', bustCm: '94 - 97', waistCm: '76 - 79', hipCm: '101 - 104' },
    { size: 'XL', uk: 'UK 14', us: 'US 10', eu: 'EU 42', bustIn: '39 - 41', waistIn: '32 - 34', hipIn: '42 - 44', bustCm: '99 - 104', waistCm: '81 - 86', hipCm: '106 - 112' }
  ];

  const shoesData = [
    { size: '36', inFoot: '9.0 in', cmFoot: '23.0 cm', uk: 'UK 3.5', us: 'US 5.5' },
    { size: '37', inFoot: '9.3 in', cmFoot: '23.7 cm', uk: 'UK 4.5', us: 'US 6.5' },
    { size: '38', inFoot: '9.6 in', cmFoot: '24.4 cm', uk: 'UK 5.5', us: 'US 7.5' },
    { size: '39', inFoot: '9.9 in', cmFoot: '25.1 cm', uk: 'UK 6.5', us: 'US 8.5' },
    { size: '40', inFoot: '10.2 in', cmFoot: '25.8 cm', uk: 'UK 7.5', us: 'US 9.5' },
    { size: '41', inFoot: '10.4 in', cmFoot: '26.5 cm', uk: 'UK 8.5', us: 'US 10.5' }
  ];

  return (
    <div 
      id="size-guide-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={() => setIsSizeGuideOpen(false)}
    >
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E8DFC8] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col p-6 sm:p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#EDE7DF]">
          <div>
            <div className="flex items-center space-x-2 text-[#8E8279] text-xs uppercase tracking-widest mb-1">
              <Ruler className="w-4 h-4 text-[#C5A880]" />
              <span>Atelier Size Specifications</span>
            </div>
            <h3 className="font-serif text-2xl text-[#1C1B1A] font-normal">
              Measurements & Fit Guide
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 text-[#1C1B1A] hover:text-[#8E8279]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs & Units */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-[#EDE7DF]">
          <div className="flex space-x-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setSizeGuideCategory(tab)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                  sizeGuideCategory === tab
                    ? 'bg-[#1C1B1A] text-[#FAF8F5]'
                    : 'bg-[#F3EFEA] text-[#1C1B1A] hover:bg-[#EAE4DC]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-[#EDE7DF] p-0.5 rounded text-xs">
            <button
              onClick={() => setUnit('in')}
              className={`px-2.5 py-1 rounded-xs transition-colors ${
                unit === 'in' ? 'bg-[#1C1B1A] text-white font-medium' : 'text-[#524B46]'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 rounded-xs transition-colors ${
                unit === 'cm' ? 'bg-[#1C1B1A] text-white font-medium' : 'text-[#524B46]'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Chart Body */}
        <div className="flex-1 overflow-y-auto py-4">
          {sizeGuideCategory === 'Shoes' ? (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#DDD5C9] text-[#8E8279] uppercase tracking-wider">
                  <th className="py-2.5 px-3">EU Size</th>
                  <th className="py-2.5 px-3">Foot Length ({unit.toUpperCase()})</th>
                  <th className="py-2.5 px-3">UK Size</th>
                  <th className="py-2.5 px-3">US Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE7DF]">
                {shoesData.map(r => (
                  <tr key={r.size} className="hover:bg-[#F3EFEA]/50">
                    <td className="py-2.5 px-3 font-semibold text-[#1C1B1A]">{r.size}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? r.inFoot : r.cmFoot}</td>
                    <td className="py-2.5 px-3">{r.uk}</td>
                    <td className="py-2.5 px-3">{r.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#DDD5C9] text-[#8E8279] uppercase tracking-wider">
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Bust ({unit.toUpperCase()})</th>
                  <th className="py-2.5 px-3">Waist ({unit.toUpperCase()})</th>
                  <th className="py-2.5 px-3">Hips ({unit.toUpperCase()})</th>
                  <th className="py-2.5 px-3">Intl (UK / US / EU)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE7DF]">
                {clothingData.map(r => (
                  <tr key={r.size} className="hover:bg-[#F3EFEA]/50">
                    <td className="py-2.5 px-3 font-semibold text-[#1C1B1A]">{r.size}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? r.bustIn : r.bustCm}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? r.waistIn : r.waistCm}</td>
                    <td className="py-2.5 px-3">{unit === 'in' ? r.hipIn : r.hipCm}</td>
                    <td className="py-2.5 px-3 text-[#7B726B]">{r.uk} / {r.us} / {r.eu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* How To Measure Guide */}
          <div className="mt-6 p-4 bg-[#F3EFEA] rounded-xs border border-[#E8DFC8]">
            <h4 className="font-serif text-base text-[#1C1B1A] mb-2 font-medium">
              How to Measure with Precision
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#524B46] leading-relaxed">
              <div>
                <span className="font-semibold text-[#1C1B1A] block">1. Bust</span>
                Measure around the fullest part of your bust, keeping the measuring tape horizontal and relaxed.
              </div>
              <div>
                <span className="font-semibold text-[#1C1B1A] block">2. Natural Waist</span>
                Measure around the narrowest point of your torso, typically an inch above your belly button.
              </div>
              <div>
                <span className="font-semibold text-[#1C1B1A] block">3. Hips</span>
                Stand with feet together and measure around the fullest curve of your hips and seat.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-[#EDE7DF] flex items-center justify-between text-xs text-[#8E8279]">
          <span className="flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d] mr-1.5" />
            Complimentary size exchanges on all domestic shipments
          </span>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="px-4 py-2 bg-[#1C1B1A] text-[#FAF8F5] uppercase tracking-wider text-[11px] font-medium hover:bg-[#333130]"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
