import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, MessageSquare, Phone, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export const FAQPage: React.FC = () => {
  const { navigateTo } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Shipping & Delivery',
      q: 'How long does domestic delivery take?',
      a: 'We dispatch all confirmed orders within 24 business hours from our central Mumbai atelier. Express courier transit via Blue Dart Luxury takes 2–3 business days for metro cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata) and 3–5 business days for other regional destinations.'
    },
    {
      category: 'Shipping & Delivery',
      q: 'Is complimentary shipping provided?',
      a: 'Yes, all domestic orders above ₹2,999 qualify for complimentary insured express shipping. For orders below this threshold, a flat delivery fee of ₹250 is applied at checkout.'
    },
    {
      category: 'Returns & Exchanges',
      q: 'What is the Maison Aura return policy?',
      a: 'We offer a 14-day complimentary return and size exchange window from the date of delivery. Garments must be unworn, unwashed, with all original atelier security ribbon tags attached, and returned in the signature presentation box.'
    },
    {
      category: 'Returns & Exchanges',
      q: 'How do I schedule a doorstep return pickup?',
      a: 'Simply visit our dedicated Returns Portal or contact our WhatsApp concierge. Our courier will collect the package directly from your home or office. Once received and verified at our atelier, your refund or exchange is processed within 48 hours.'
    },
    {
      category: 'Sizing & Fit',
      q: 'How do I determine my size across different silhouettes?',
      a: 'Each product detail page contains an interactive Size Guide with exact garment measurements in both inches and centimeters, alongside our model’s height and proportions. If you require tailored advice, our WhatsApp concierge will assist you in selecting your optimal fit.'
    },
    {
      category: 'Sizing & Fit',
      q: 'Do you offer custom made-to-measure tailoring?',
      a: 'Yes. For our evening wear and structured blazer collection, made-to-measure services are available by booking an appointment at our Mumbai, Delhi, or Bengaluru salons, or digitally with our master patternmaker.'
    },
    {
      category: 'Fabric & Care',
      q: 'How should I care for my 22-Momme Mulberry Silk garments?',
      a: 'We recommend professional eco dry-cleaning to maintain the luminous natural luster and soft drape. If hand-washing at home, use lukewarm water with a pH-neutral silk wash, do not wring, dry flat away from direct sunlight, and steam gently on the reverse.'
    },
    {
      category: 'Orders & Payments',
      q: 'Which payment methods are accepted?',
      a: 'We accept all major domestic and international Credit & Debit Cards (Visa, Mastercard, American Express), UPI (Google Pay, PhonePe, Paytm), Net Banking across 40+ banks, and Cash on Delivery for select domestic pincodes.'
    }
  ];

  const categories = ['All', 'Shipping & Delivery', 'Returns & Exchanges', 'Sizing & Fit', 'Fabric & Care', 'Orders & Payments'];

  const filteredFaqs = faqs.filter(f => {
    const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
    const matchesSearch = f.q.toLowerCase().includes(searchQuery.toLowerCase()) || f.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="faq-page-root" className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E8279] font-medium block mb-2">
            Frequently Addressed Questions
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1B1A] font-normal">
            ATELIER INQUIRIES
          </h1>
          <p className="text-xs sm:text-sm text-[#7B726B] mt-2 font-light">
            Comprehensive guidance regarding orders, sizing, delivery telemetry, and textile preservation.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-[#8E8279] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search questions by keyword (e.g. shipping, silk, exchange)..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#DDD5C9] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#1C1B1A] shadow-xs"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex space-x-2 overflow-x-auto pb-4 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#1C1B1A] text-[#FAF8F5]'
                  : 'bg-white text-[#7B726B] border border-[#DDD5C9] hover:border-[#1C1B1A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="bg-white border border-[#EDE7DF] divide-y divide-[#EDE7DF] shadow-xs">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#8E8279]">
              No questions found matching your inquiry. Please reach out to our concierge below.
            </div>
          ) : (
            filteredFaqs.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="p-6">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left space-x-4 group"
                  >
                    <span className="font-serif text-base sm:text-lg text-[#1C1B1A] group-hover:text-[#8E8279] transition-colors">
                      {item.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#8E8279] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-[#524B46] leading-relaxed font-light pr-6">
                      <p>{item.a}</p>
                      <span className="text-[10px] uppercase tracking-wider text-[#8E8279] mt-2 block">
                        Category: {item.category}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Concierge Card */}
        <div className="mt-12 p-8 bg-[#F3EFEA] border border-[#E8DFC8] text-center space-y-4">
          <HelpCircle className="w-8 h-8 text-[#C5A880] mx-auto" />
          <h3 className="font-serif text-xl text-[#1C1B1A]">Require Additional Assistance?</h3>
          <p className="text-xs text-[#7B726B] max-w-sm mx-auto">
            Our atelier client concierge is available daily to provide tailored guidance regarding your wardrobe.
          </p>
          <div className="flex justify-center space-x-4 pt-2">
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-2.5 bg-[#1C1B1A] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#333130]"
            >
              Contact Concierge
            </button>
            <a
              href="https://wa.me/919820012345"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white border border-[#DDD5C9] text-xs uppercase tracking-wider font-medium text-[#1C1B1A] hover:bg-[#FAF8F5]"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
