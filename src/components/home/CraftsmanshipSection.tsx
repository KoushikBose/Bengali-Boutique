import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Layers, ShieldCheck, Compass, CheckCircle2, Award } from 'lucide-react';
import { BENGALI_ASSETS } from '../../data/products';
import { useShop } from '../../context/ShopContext';

type CraftTab = 'jamdani' | 'baluchari' | 'comparison' | 'anatomy';

export const CraftsmanshipSection: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeTab, setActiveTab] = useState<CraftTab>('jamdani');
  const [activeAnatomyHotspot, setActiveAnatomyHotspot] = useState<number | null>(null);

  const jamdaniHotspots = [
    {
      id: 1,
      name: 'Pit-Loom Trench (খাত)',
      title: 'Subterranean Pit System',
      description: 'The wooden treadles rest in a dug-out earthen pit. The natural soil humidity keeps fine cotton and silk threads pliable and prevents snapping under atmospheric dryness.',
      x: 32,
      y: 78
    },
    {
      id: 2,
      name: 'Pointed Bamboo Needle (কাঁদি / Kandi)',
      title: 'Discontinuous Supplementary Weft',
      description: 'Master weavers manipulate delicate bamboo or tamarind-wood needles by hand, manually interweaving extra-weft floral motifs without any automated guide.',
      x: 52,
      y: 46
    },
    {
      id: 3,
      name: 'Gossamer Warp (তানা / Tana)',
      title: 'High-Count Translucent Ground',
      description: 'Up to 200s count hand-spun gossamer cotton or pure Mulberry silk warp held under calibrated tension, creating the ethereal "woven air" foundation.',
      x: 70,
      y: 35
    }
  ];

  const baluchariHotspots = [
    {
      id: 4,
      name: 'Jacquard / Jala Harness (জালা ও নকশা)',
      title: 'Historical Draw-Loom Mechanism',
      description: 'Derived from ancient Bishnupur jala looms, thousands of individual harness cords elevate specific warp threads to weave elaborate epic story panels on the pallu.',
      x: 65,
      y: 22
    },
    {
      id: 5,
      name: 'Resham & Tested Zari Shuttle (মাকু)',
      title: 'Polished Metallic Weft Pass',
      description: 'Polished silver and pure gold-electroplated zari shuttles glide smoothly across the shed, bringing meenakari contrast to mythological scenes.',
      x: 42,
      y: 60
    },
    {
      id: 6,
      name: 'Murshidabad Silk Warp (মালবেরি রেশম)',
      title: 'High-Twist Mulberry Yarns',
      description: 'Certified pure Mulberry silk with high resilience and natural luster that provides the canvas for historical architectural and figurative motifs.',
      x: 28,
      y: 40
    }
  ];

  return (
    <section id="craftsmanship-heritage-section" className="py-20 sm:py-28 bg-[#FAF8F5] border-t border-[#E8DFC8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Bengali Calligraphic Charm */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#F2ECE4] border border-[#DDD5C9] text-[#9E2A2B] text-xs uppercase tracking-[0.25em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#9E2A2B]" />
            <span className="font-bengali text-xs tracking-normal font-semibold">আবহমান বাংলার তাঁতশিল্প</span>
            <span className="text-[#C5A880]">•</span>
            <span className="font-medium">Living Loom Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal tracking-tight">
            The Sacred Craftsmanship of Bengal
          </h2>
          <p className="font-bengali text-lg sm:text-xl text-[#9E2A2B] font-medium mt-2">
            ঢাকাই জামদানি ও বিষ্ণুপুরী বালুচরী: ঐতিহাসিক বয়নশৈলী ও কারুশিল্প
          </p>
          <p className="text-xs sm:text-base text-[#6E645D] mt-3 font-light leading-relaxed max-w-2xl mx-auto">
            Centuries before modern machinery, master weavers across the river basins of Bengal engineered handlooms capable of weaving sheer poetic epics into cloth. Explore the living artistic heritage of <strong className="text-[#1C1B1A] font-medium">Jamdani</strong> and <strong className="text-[#1C1B1A] font-medium">Baluchari</strong> silk.
          </p>
        </div>

        {/* Craft Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-[#EDE7DF] border border-[#DDD5C9] rounded-none max-w-full overflow-x-auto gap-1">
            {[
              {
                id: 'jamdani',
                label: 'Dhakai Jamdani',
                ben: 'ঢাকাই জামদানি',
                sub: 'Woven Air & Supplementary Weft'
              },
              {
                id: 'baluchari',
                label: 'Bishnupuri Baluchari',
                ben: 'বিষ্ণুপুরী বালুচরী',
                sub: 'Mythological Silk Tapestries'
              },
              {
                id: 'comparison',
                label: 'Historical Comparative',
                ben: 'ঐতিহাসিক তুলনা',
                sub: 'Loom, Technique & Lineage'
              },
              {
                id: 'anatomy',
                label: 'Anatomy of the Loom',
                ben: 'তাঁতের অঙ্গসংস্থান',
                sub: 'Pit-Loom & Jacquard Systems'
              }
            ].map(tab => (
              <button
                key={tab.id}
                id={`craft-tab-${tab.id}`}
                onClick={() => {
                  setActiveTab(tab.id as CraftTab);
                  setActiveAnatomyHotspot(null);
                }}
                className={`px-4 sm:px-6 py-2.5 text-xs font-medium uppercase tracking-wider transition-all text-left sm:text-center whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#1C1B1A] text-[#FAF8F5] shadow-sm'
                    : 'text-[#5C534D] hover:text-[#1C1B1A] hover:bg-white/60'
                }`}
              >
                <div className="flex items-center space-x-1.5 justify-center">
                  <span>{tab.label}</span>
                  <span className="font-bengali text-[11px] opacity-80 hidden md:inline">({tab.ben})</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: DHAKAI JAMDANI */}
        {activeTab === 'jamdani' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Traditional Loom Image & Visual Annotation */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] bg-[#EFE9DF] overflow-hidden shadow-xl border border-[#DDD5C9]">
                <img
                  src={BENGALI_ASSETS.jamdaniLoom}
                  alt="Traditional Jamdani Pit-Loom in Nadia Bengal"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Loom Atmosphere Badges */}
                <div className="absolute top-4 left-4 bg-[#1C1B1A]/90 backdrop-blur-xs text-[#FAF8F5] px-3.5 py-1.5 text-[10px] uppercase tracking-widest border-l-2 border-[#9E2A2B]">
                  <span className="font-bengali text-xs mr-1 text-[#E2856E]">তাঁত শাল</span>
                  <span>Phulia Pit-Loom, Nadia</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs text-[#1C1B1A] p-3 shadow-lg border border-[#DDD5C9] max-w-[240px]">
                  <div className="text-[10px] uppercase tracking-widest text-[#9E2A2B] font-semibold flex items-center space-x-1 mb-0.5">
                    <Award className="w-3 h-3 text-[#9E2A2B]" />
                    <span>UNESCO Recognition</span>
                  </div>
                  <p className="text-[11px] text-[#4A423D] leading-tight">
                    Inscribed in 2013 as Intangible Cultural Heritage of Humanity.
                  </p>
                </div>
              </div>

              {/* Artisan Note */}
              <div className="mt-4 p-4 bg-[#F2ECE4] border-l-2 border-[#9E2A2B] text-xs text-[#524B46] flex items-start space-x-3">
                <Compass className="w-4 h-4 text-[#9E2A2B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1B1A] block font-serif text-sm">Discontinuous Supplementary Weft</strong>
                  Every single floral motif (*buti* or *kalka*) is embedded by hand using needle-sharp bamboo skewers (*kandis*). It takes 40 to 90 days for two master weavers to complete one heritage sari.
                </div>
              </div>
            </div>

            {/* Right: Historical & Artistic Exposition */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E2A2B] font-semibold block mb-1">
                  Art of Translucent Poetry • ২,০০০ বছরের ঐতিহ্য
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-normal leading-tight">
                  Dhakai Jamdani: The Architecture of Woven Air
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#524B46] font-light leading-relaxed">
                <p>
                  Tracing its lineage through the ancient descriptions of Megasthenes and the <em>Arthashastra</em> of Kautilya, Jamdani achieved its golden zenith under Mughal royal patronage. Emperor Jahangir and Empress Nur Jahan referred to fine Bengal muslins as <strong>Ab-i-Rawan</strong> (running water), <strong>Baft-hawa</strong> (woven air), and <strong>Shabnam</strong> (morning dew) for their miraculous transparency.
                </p>
                <p>
                  Unlike modern jacquard or screen-printed cloth where patterns run continuously across the weft, Jamdani utilizes a <strong>discontinuous extra-weft technique</strong>. As the primary shuttle passes the base gossamer cotton or silk ground, the weaver manually counts warp threads and inserts opaque dyed threads and pure gold zari with a pointed bamboo spindle.
                </p>
              </div>

              {/* Artistic Motifs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white border border-[#E0D7CB]">
                  <div className="font-serif text-sm text-[#1C1B1A] font-medium">Panna Hazar (পান্না হাজার)</div>
                  <div className="text-[11px] text-[#7B726B] mt-0.5">Thousand-emerald motif pattern sparkling across the translucent body</div>
                </div>
                <div className="p-3 bg-white border border-[#E0D7CB]">
                  <div className="font-serif text-sm text-[#1C1B1A] font-medium">Kalka & Terchi (কলকা ও তেরছি)</div>
                  <div className="text-[11px] text-[#7B726B] mt-0.5">Iconic curved paisley and diagonal creepers gracing the majestic aanchal</div>
                </div>
                <div className="p-3 bg-white border border-[#E0D7CB]">
                  <div className="font-serif text-sm text-[#1C1B1A] font-medium">Korat Paar (করাত পাড়)</div>
                  <div className="text-[11px] text-[#7B726B] mt-0.5">Traditional sharp sawtooth temple borders framing sacred serenity</div>
                </div>
                <div className="p-3 bg-white border border-[#E0D7CB]">
                  <div className="font-serif text-sm text-[#1C1B1A] font-medium">Jhalar Jaal (ঝালর জাল)</div>
                  <div className="text-[11px] text-[#7B726B] mt-0.5">Intertwining floral trellis echoing river lotus blossoms in Phulia</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('shop', { category: 'Sarees & Drapes' })}
                  className="px-6 py-3 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#9E2A2B] transition-colors inline-flex items-center space-x-2"
                >
                  <span>Explore Jamdani Collection (জামদানি সংগ্রহ)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab('anatomy')}
                  className="px-5 py-3 border border-[#1C1B1A] text-[#1C1B1A] text-xs uppercase tracking-widest font-medium hover:bg-[#1C1B1A] hover:text-white transition-colors"
                >
                  Inspect Pit-Loom Anatomy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BISHNUPURI BALUCHARI */}
        {activeTab === 'baluchari' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Baluchari Loom Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] bg-[#EFE9DF] overflow-hidden shadow-xl border border-[#DDD5C9]">
                <img
                  src={BENGALI_ASSETS.baluchariLoom}
                  alt="Traditional Baluchari Jacquard Loom in Bishnupur Bankura"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute top-4 left-4 bg-[#1C1B1A]/90 backdrop-blur-xs text-[#FAF8F5] px-3.5 py-1.5 text-[10px] uppercase tracking-widest border-l-2 border-[#9E2A2B]">
                  <span className="font-bengali text-xs mr-1 text-[#E2856E]">বিষ্ণুপুরের তাঁত</span>
                  <span>Bishnupur Jacquard Atelier, Bankura</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs text-[#1C1B1A] p-3 shadow-lg border border-[#DDD5C9] max-w-[250px]">
                  <div className="text-[10px] uppercase tracking-widest text-[#9E2A2B] font-semibold flex items-center space-x-1 mb-0.5">
                    <ShieldCheck className="w-3 h-3 text-[#9E2A2B]" />
                    <span>GI Certified Textile</span>
                  </div>
                  <p className="text-[11px] text-[#4A423D] leading-tight">
                    Protected Geographical Indication (GI) for authentic Bishnupuri Baluchari.
                  </p>
                </div>
              </div>

              {/* Artisan Note */}
              <div className="mt-4 p-4 bg-[#F2ECE4] border-l-2 border-[#9E2A2B] text-xs text-[#524B46] flex items-start space-x-3">
                <BookOpen className="w-4 h-4 text-[#9E2A2B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1B1A] block font-serif text-sm">Woven Chronicle of Bengal Terracotta</strong>
                  Inspired by the 17th-century terracotta temples of Bishnupur. Baluchari transforms sacred narrative reliefs—Shakuntala, Ramayana chariot duels, and royal Nawabi courts—into rich resham silk wefts.
                </div>
              </div>
            </div>

            {/* Right: Baluchari Narrative Deep Dive */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#9E2A2B] font-semibold block mb-1">
                  Living Silk Tapestries • মল্ল রাজাদের গৌরবগাথা
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-normal leading-tight">
                  Bishnupuri Baluchari: The Loom as a Narrative Canvas
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#524B46] font-light leading-relaxed">
                <p>
                  Originally conceived in the 18th century in the village of Baluchar along the Bhagirathi River under <strong>Nawab Murshid Quli Khan</strong>, the craft later relocated to Bishnupur under the visionary patronage of the <strong>Malla dynasty</strong>. Surrounded by Bankura's red laterite soil and terracotta temples, weavers translated temple bas-reliefs onto luminous mulberry silk.
                </p>
                <p>
                  A true Baluchari is distinguished by its grandiose <em>aanchal</em> (pallu), framed by concentric borders known as <em>kalka</em> rows and intricate figural vignettes. When woven with genuine tested gold and silver zari alongside vivid multi-colour resham meenakari threads, it assumes the celebrated title of <strong>Swarnachari (স্বর্ণচরী)</strong>.
                </p>
              </div>

              {/* Iconography breakdown */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white border border-[#E0D7CB]">
                  <div className="font-serif text-sm text-[#1C1B1A] font-medium">Epics & Terracotta (পৌরাণিক গাথা)</div>
                  <div className="text-[11px] text-[#7B726B] mt-0.5">Arjuna's chariot, Krishna-Lila, and Ramayana court gatherings</div>
                </div>
                <div className="p-3 bg-white border border-[#E0D7CB]">
                  <div className="font-serif text-sm text-[#1C1B1A] font-medium">Nawabi Darbars (নবাবী দরবার)</div>
                  <div className="text-[11px] text-[#7B726B] mt-0.5">Gentlemen with hookahs, royal royal palanquins, and historic steamers</div>
                </div>
                <div className="p-3 bg-white border border-[#E0D7CB]">
                  <div className="font-serif text-sm text-[#1C1B1A] font-medium">Swarnachari Zari (স্বর্ণচরী জরি)</div>
                  <div className="text-[11px] text-[#7B726B] mt-0.5">High-carat electroplated gold threads illuminating every contour</div>
                </div>
                <div className="p-3 bg-white border border-[#E0D7CB]">
                  <div className="font-serif text-sm text-[#1C1B1A] font-medium">Meenakari Resham (মীনাকারি রেশম)</div>
                  <div className="text-[11px] text-[#7B726B] mt-0.5">Dual-tone dyed silk filling inside each leaf and figure vignette</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('shop', { collection: 'Bonedi Bari Couture' })}
                  className="px-6 py-3 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#9E2A2B] transition-colors inline-flex items-center space-x-2"
                >
                  <span>Explore Baluchari Silks (বালুচরী সম্ভার)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveTab('comparison')}
                  className="px-5 py-3 border border-[#1C1B1A] text-[#1C1B1A] text-xs uppercase tracking-widest font-medium hover:bg-[#1C1B1A] hover:text-white transition-colors"
                >
                  Compare Weaving Techniques
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMPARISON TABLE */}
        {activeTab === 'comparison' && (
          <div className="bg-white border border-[#DDD5C9] shadow-sm p-6 sm:p-10">
            <div className="max-w-3xl mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E2A2B] font-semibold block mb-1">
                Comparative Anatomy • দুই মহান বয়নশৈলীর তুলনামূলক চিত্র
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A]">
                Dhakai Jamdani vs. Bishnupuri Baluchari Silk
              </h3>
              <p className="text-xs sm:text-sm text-[#6E645D] mt-1 font-light">
                Both arts define the aristocratic grandeur of Bengal, yet their looms, fibers, and structural philosophies are completely distinct.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8DFC8] bg-[#F7F4EF]">
                    <th className="py-3.5 px-4 text-xs uppercase tracking-wider text-[#1C1B1A] font-semibold w-1/4">Aspect</th>
                    <th className="py-3.5 px-4 text-xs uppercase tracking-wider text-[#9E2A2B] font-semibold w-3/8">Dhakai Jamdani (ঢাকাই জামদানি)</th>
                    <th className="py-3.5 px-4 text-xs uppercase tracking-wider text-[#9E2A2B] font-semibold w-3/8">Bishnupuri Baluchari (বিষ্ণুপুরী বালুচরী)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8DE] text-xs sm:text-sm text-[#524B46]">
                  <tr>
                    <td className="py-4 px-4 font-serif font-medium text-[#1C1B1A]">Geographical Heart</td>
                    <td className="py-4 px-4">Originally Dhaka (Shitalakshya River); now also master clusters in Phulia, Shantipur, & Nadia (West Bengal)</td>
                    <td className="py-4 px-4">Originally Baluchar (Murshidabad); relocated and revived in Bishnupur, Bankura (West Bengal)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-serif font-medium text-[#1C1B1A]">Traditional Loom Type</td>
                    <td className="py-4 px-4">Two-pedal earthen <strong>Pit-Loom (তাঁত শাল)</strong> operated entirely by two synchronized master weavers</td>
                    <td className="py-4 px-4">Complex <strong>Jala Loom / Traditional Jacquard Handloom</strong> with overhead harness cords and design cards</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-serif font-medium text-[#1C1B1A]">Weaving Technique</td>
                    <td className="py-4 px-4"><strong>Discontinuous Supplementary Weft</strong>: Pattern threads inserted manually with bamboo needles (*kandis*)</td>
                    <td className="py-4 px-4"><strong>Continuous Figural Extra-Weft Jacquard</strong>: Intricate warp elevation creating dense tapestry panels</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-serif font-medium text-[#1C1B1A]">Primary Fibers & Yarns</td>
                    <td className="py-4 px-4">Fine gossamer handspun cotton (100s-200s count), natural Mulberry silk, and unbleached zari</td>
                    <td className="py-4 px-4">High-twist pure Mulberry silk (Garad silk) yarns, tested gold/silver metallic zari, and dyed resham</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-serif font-medium text-[#1C1B1A]">Visual Motifs</td>
                    <td className="py-4 px-4">Geometric & botanical florals: Panna Hazar, Chameli, Kalka, Terchi, and Jal motifs floating on sheer ground</td>
                    <td className="py-4 px-4">Narrative figurative scenes: Ramayana, Mahabharata, Nawab Darbars, British carriages, and terracotta tiles</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-serif font-medium text-[#1C1B1A]">Crafting Duration</td>
                    <td className="py-4 px-4">30 to 90 days per saree (often advancing only 1.5 inches per working day)</td>
                    <td className="py-4 px-4">20 to 45 days per saree (involving intricate pre-loom graph punch-card calculations)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-serif font-medium text-[#1C1B1A]">Cultural Landmark</td>
                    <td className="py-4 px-4">UNESCO Intangible Cultural Heritage of Humanity (2013) & GI Status</td>
                    <td className="py-4 px-4">Geographical Indication (GI) of West Bengal & National Awardee Textile</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8DFC8] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[#7B726B]">
                Every Maison Aura creation includes a signed certificate of cluster origin and artisan provenance.
              </div>
              <button
                onClick={() => navigateTo('about')}
                className="text-xs uppercase tracking-widest font-medium text-[#1C1B1A] hover:text-[#9E2A2B] inline-flex items-center space-x-1"
              >
                <span>Read Our Full Handloom Manifesto (আমাদের মূলনীতি)</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: LOOM ANATOMY INTERACTIVE STAGE */}
        {activeTab === 'anatomy' && (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-[0.25em] text-[#9E2A2B] font-semibold block mb-1">
                Inside the Artisan Atelier • তাঁতশালার অঙ্গসংস্থান
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A]">
                The Engineering Behind Traditional Bengal Looms
              </h3>
              <p className="text-xs sm:text-sm text-[#6E645D] mt-1 font-light">
                Discover the ingenious mechanical and organic components developed over generations by Bengal's weaving families.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Jamdani Pit-Loom Card */}
              <div className="bg-white border border-[#DDD5C9] p-6 sm:p-8 shadow-sm relative">
                <div className="flex items-center justify-between mb-4 border-b border-[#E8DFC8] pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#9E2A2B] font-semibold block">Loom Archetype 01</span>
                    <h4 className="font-serif text-xl text-[#1C1B1A]">The Nadia Pit-Loom (তাঁত শাল)</h4>
                  </div>
                  <span className="text-xs bg-[#FAF8F5] border border-[#DDD5C9] px-2.5 py-1 text-[#524B46] font-mono">
                    Supplementary Weft
                  </span>
                </div>

                <div className="relative aspect-[16/10] bg-[#FAF8F5] overflow-hidden mb-6 border border-[#E8DFC8]">
                  <img
                    src={BENGALI_ASSETS.jamdaniLoom}
                    alt="Jamdani Pit-Loom Details"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Interactive Hotspot points */}
                  {jamdaniHotspots.map(hs => (
                    <button
                      key={hs.id}
                      onClick={() => setActiveAnatomyHotspot(hs.id)}
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif shadow-lg transition-transform ${
                        activeAnatomyHotspot === hs.id
                          ? 'bg-[#9E2A2B] text-white scale-125 ring-4 ring-[#9E2A2B]/30'
                          : 'bg-white text-[#1C1B1A] hover:scale-110'
                      }`}
                      aria-label={hs.name}
                    >
                      {hs.id}
                    </button>
                  ))}
                </div>

                {/* Hotspot details list */}
                <div className="space-y-3">
                  {jamdaniHotspots.map(hs => (
                    <div
                      key={hs.id}
                      onClick={() => setActiveAnatomyHotspot(hs.id)}
                      className={`p-3 border transition-colors cursor-pointer text-left ${
                        activeAnatomyHotspot === hs.id
                          ? 'border-[#9E2A2B] bg-[#FDF9F7]'
                          : 'border-[#EDE7DF] hover:border-[#1C1B1A] bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#1C1B1A] text-white text-[10px] flex items-center justify-center font-mono">
                          {hs.id}
                        </span>
                        <div className="font-serif text-xs sm:text-sm text-[#1C1B1A] font-medium">{hs.name}</div>
                        <span className="text-[10px] text-[#9E2A2B] uppercase tracking-wider ml-auto font-medium">{hs.title}</span>
                      </div>
                      <p className="text-xs text-[#6E645D] mt-1.5 pl-7 leading-relaxed font-light">
                        {hs.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Baluchari Jacquard / Jala Loom Card */}
              <div className="bg-white border border-[#DDD5C9] p-6 sm:p-8 shadow-sm relative">
                <div className="flex items-center justify-between mb-4 border-b border-[#E8DFC8] pb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#9E2A2B] font-semibold block">Loom Archetype 02</span>
                    <h4 className="font-serif text-xl text-[#1C1B1A]">The Bishnupur Jacquard Loom (জালা তাঁত)</h4>
                  </div>
                  <span className="text-xs bg-[#FAF8F5] border border-[#DDD5C9] px-2.5 py-1 text-[#524B46] font-mono">
                    Narrative Jacquard
                  </span>
                </div>

                <div className="relative aspect-[16/10] bg-[#FAF8F5] overflow-hidden mb-6 border border-[#E8DFC8]">
                  <img
                    src={BENGALI_ASSETS.baluchariLoom}
                    alt="Baluchari Silk Loom Details"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Interactive Hotspot points */}
                  {baluchariHotspots.map(hs => (
                    <button
                      key={hs.id}
                      onClick={() => setActiveAnatomyHotspot(hs.id)}
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif shadow-lg transition-transform ${
                        activeAnatomyHotspot === hs.id
                          ? 'bg-[#9E2A2B] text-white scale-125 ring-4 ring-[#9E2A2B]/30'
                          : 'bg-white text-[#1C1B1A] hover:scale-110'
                      }`}
                      aria-label={hs.name}
                    >
                      {hs.id}
                    </button>
                  ))}
                </div>

                {/* Hotspot details list */}
                <div className="space-y-3">
                  {baluchariHotspots.map(hs => (
                    <div
                      key={hs.id}
                      onClick={() => setActiveAnatomyHotspot(hs.id)}
                      className={`p-3 border transition-colors cursor-pointer text-left ${
                        activeAnatomyHotspot === hs.id
                          ? 'border-[#9E2A2B] bg-[#FDF9F7]'
                          : 'border-[#EDE7DF] hover:border-[#1C1B1A] bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#1C1B1A] text-white text-[10px] flex items-center justify-center font-mono">
                          {hs.id}
                        </span>
                        <div className="font-serif text-xs sm:text-sm text-[#1C1B1A] font-medium">{hs.name}</div>
                        <span className="text-[10px] text-[#9E2A2B] uppercase tracking-wider ml-auto font-medium">{hs.title}</span>
                      </div>
                      <p className="text-xs text-[#6E645D] mt-1.5 pl-7 leading-relaxed font-light">
                        {hs.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner: Artisan Guarantee & Fair Craft */}
        <div className="mt-16 bg-[#1C1B1A] text-[#FAF8F5] p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
            <span className="font-bengali text-9xl">তাঁত</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2856E] font-medium block mb-2">
                Preserving Living Traditions • হস্তচালিত তাঁতের প্রতি দায়বদ্ধতা
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug">
                100% Pit-Loom Certified. Zero Power-Loom Counterfeits.
              </h3>
              <p className="text-xs sm:text-sm text-[#BDB5AB] mt-2 font-light leading-relaxed max-w-2xl">
                Every Jamdani and Baluchari silk in our collection is strictly loomed by hand in traditional master weaver co-operatives across Phulia, Shantipur, Bishnupur, and Murshidabad. We directly support 480+ artisan families with fair compensation and health security.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
              <button
                onClick={() => navigateTo('shop', { tag: 'Handloom' })}
                className="px-6 py-3.5 bg-[#FAF8F5] text-[#1C1B1A] text-xs uppercase tracking-widest font-semibold hover:bg-[#E2856E] hover:text-white transition-colors text-center"
              >
                Shop Authentic Handlooms
              </button>
              <button
                onClick={() => navigateTo('about')}
                className="px-6 py-3.5 border border-white/30 text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-white/10 transition-colors text-center"
              >
                Our Weaver Co-operatives
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
