import React, { useState } from 'react';
import { 
  ArrowRight, 
  Instagram, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Sparkles,
  Flame,
  Key
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { TempleBorder } from '../common/AlponaMotifs';

export const Footer: React.FC = () => {
  const { navigateTo, setIsSizeGuideOpen, addToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    addToast('Welcome to the Inner Circle', 'Thank you for subscribing to Maison Aura private edits.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer id="main-footer" className="bg-[#1C1B1A] text-[#FAF8F5] pt-16 pb-24 lg:pb-12 border-t border-[#2C2A29]">
      {/* Brand Values Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b border-[#2E2C2B]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start space-x-4">
            <div className="p-2.5 bg-[#262423] rounded-full text-[#DFCFBE] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-[#FAF8F5]">Complimentary Shipping</h5>
              <p className="text-xs text-[#8E8279] mt-1">On all domestic orders exceeding ₹2,999. Express courier delivery.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-2.5 bg-[#262423] rounded-full text-[#DFCFBE] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-[#FAF8F5]">14-Day Boutique Exchange</h5>
              <p className="text-xs text-[#8E8279] mt-1">Hassle-free doorstep returns and size exchanges nationwide.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-2.5 bg-[#262423] rounded-full text-[#DFCFBE] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-[#FAF8F5]">Noble Fabric Integrity</h5>
              <p className="text-xs text-[#8E8279] mt-1">100% pure organic silks, European flax linen, and Italian leathers.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-2.5 bg-[#262423] rounded-full text-[#DFCFBE] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-medium text-[#FAF8F5]">Private Concierge</h5>
              <p className="text-xs text-[#8E8279] mt-1">Bespoke styling guidance and personal atelier appointments.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-serif text-2xl tracking-[0.22em] uppercase font-medium text-[#FAF8F5]">
                MAISON AURA
              </span>
              <p className="text-xs tracking-[0.3em] uppercase text-[#8E8279] mt-1">
                Elegance, Curated.
              </p>
            </div>
            <p className="text-xs text-[#A89E95] leading-relaxed max-w-sm">
              Maison Aura celebrates individuality through considered design, refined materials, and effortless silhouettes designed for contemporary living.
            </p>

            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-[0.2em] font-medium text-[#DFCFBE] mb-3">
                Join The Inner Circle
              </h5>
              <p className="text-xs text-[#8E8279] mb-3">
                Receive private collection invitations, runway edits, and complimentary seasonal gifts.
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-[#262423] border border-[#3E3A37] text-xs px-3.5 py-2.5 text-[#FAF8F5] focus:outline-none focus:border-[#DFCFBE] w-full placeholder:text-[#6D655E]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#DFCFBE] text-[#1C1B1A] px-5 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors shrink-0 flex items-center"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </form>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#DFCFBE] mb-4">
              Shop
            </h5>
            <ul className="space-y-2.5 text-xs text-[#A89E95]">
              <li>
                <button onClick={() => navigateTo('shop', { tag: 'New' })} className="hover:text-white transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'Dresses' })} className="hover:text-white transition-colors">
                  Dresses & Gowns
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'Clothing' })} className="hover:text-white transition-colors">
                  Ready-to-Wear
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { category: 'Accessories' })} className="hover:text-white transition-colors">
                  Bags & Accessories
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop', { tag: 'Bestseller' })} className="hover:text-white transition-colors">
                  Bestsellers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('sale')} className="hover:text-[#FBBF24] text-[#E5A93C] transition-colors">
                  The Sale Edit
                </button>
              </li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#DFCFBE] mb-4">
              Client Care
            </h5>
            <ul className="space-y-2.5 text-xs text-[#A89E95]">
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('tracking')} className="hover:text-white transition-colors">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('returns')} className="hover:text-white transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-white transition-colors">
                  Size Guide & Measurements
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                  My Customer Account
                </button>
              </li>
            </ul>
          </div>

          {/* ATELIER & ABOUT */}
          <div>
            <h5 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#DFCFBE] mb-4">
              Atelier & Contact
            </h5>
            <ul className="space-y-2.5 text-xs text-[#A89E95]">
              <li>
                <button 
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => {
                      document.getElementById('craftsmanship-heritage-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }} 
                  className="hover:text-white text-[#DFCFBE] font-medium transition-colors flex items-center space-x-1.5"
                >
                  <span>Jamdani & Baluchari Craftsmanship</span>
                  <span className="text-[10px] text-[#E2856E] font-bengali">(তাঁতশিল্প)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => {
                      document.getElementById('puja-planner-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }} 
                  className="hover:text-white text-[#DFCFBE] font-medium transition-colors flex items-center space-x-1.5"
                >
                  <span>5-Day Durga Puja Wardrobe Planner</span>
                  <span className="text-[10px] text-[#E2856E] font-bengali">(পূজাবার্ষিকী)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => {
                      document.getElementById('atpoure-guide-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }} 
                  className="hover:text-white text-[#DFCFBE] font-medium transition-colors flex items-center space-x-1.5"
                >
                  <span>Atpoure Saree Drape Guide</span>
                  <span className="text-[10px] text-[#E2856E] font-bengali">(আটপৌরে সাজ)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => {
                      document.getElementById('ritu-chakra-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }} 
                  className="hover:text-white text-[#DFCFBE] font-medium transition-colors flex items-center space-x-1.5"
                >
                  <span>Bengali Six Seasons (ঋতুচক্র)</span>
                  <span className="text-[10px] text-[#E2856E] font-bengali">(ষড়ঋতু)</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Our Story & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('journal')} className="hover:text-white transition-colors">
                  Editorial Journal
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('lookbook')} className="hover:text-white transition-colors">
                  Fashion Lookbook
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('stores')} className="hover:text-white transition-colors flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-[#DFCFBE]" />
                  <span>Store Locator</span>
                </button>
              </li>
              <li className="pt-2 text-xs text-[#8E8279] flex items-center">
                <MessageSquare className="w-3.5 h-3.5 mr-1 text-[#25D366]" />
                <span>WhatsApp: +91 98200 89201</span>
              </li>
              <li className="text-xs text-[#8E8279] flex items-center">
                <Mail className="w-3.5 h-3.5 mr-1 text-[#DFCFBE]" />
                <span>concierge@maisonaura.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Traditional Bengali Temple Motif Border Accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 opacity-20 text-[#DFCFBE]">
        <TempleBorder className="w-full h-3" />
      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#2A2827] flex flex-col md:flex-row items-center justify-between text-[11px] text-[#7B726B] gap-4">
        <div>
          © {new Date().getFullYear()} MAISON AURA ATELIER PRIVATE LIMITED. ALL RIGHTS RESERVED.
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <button onClick={() => navigateTo('faq')} className="hover:text-[#FAF8F5] transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => navigateTo('faq')} className="hover:text-[#FAF8F5] transition-colors">
            Terms of Service
          </button>
          <button onClick={() => navigateTo('returns')} className="hover:text-[#FAF8F5] transition-colors">
            Shipping & Return Policy
          </button>
          <button onClick={() => navigateTo('faq')} className="hover:text-[#FAF8F5] transition-colors">
            Cookie Preferences
          </button>
        </div>

        <div className="flex items-center space-x-3 text-xs text-[#9E9387]">
          <span className="px-2 py-0.5 border border-[#3E3A37] rounded-xs text-[10px]">VISA</span>
          <span className="px-2 py-0.5 border border-[#3E3A37] rounded-xs text-[10px]">MASTERCARD</span>
          <span className="px-2 py-0.5 border border-[#3E3A37] rounded-xs text-[10px]">UPI</span>
          <span className="px-2 py-0.5 border border-[#3E3A37] rounded-xs text-[10px]">AMEX</span>
        </div>
      </div>
    </footer>
  );
};
