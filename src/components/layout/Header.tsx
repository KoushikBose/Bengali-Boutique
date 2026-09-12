import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  LayoutDashboard
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { MegaMenu } from './MegaMenu';

export const Header: React.FC = () => {
  const { 
    navigateTo, 
    currentPage, 
    cartCount, 
    wishlist, 
    setIsCartDrawerOpen, 
    setIsSearchOpen 
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'clothing' | 'accessories' | 'collections' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (type: 'clothing' | 'accessories' | 'collections') => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setActiveMegaMenu(type);
  };

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFC8]/70 py-3' 
          : 'bg-[#FAF8F5] border-b border-[#EDE7DF] py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-[#1C1B1A] hover:text-[#8E8279] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#1C1B1A] hover:text-[#8E8279] ml-1"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Left: Brand Logo */}
          <div className="flex-shrink-0 text-center lg:text-left">
            <button
              onClick={() => navigateTo('home')}
              className="group text-left inline-block focus:outline-none"
            >
              <span className={`font-serif tracking-[0.22em] font-medium uppercase text-[#1C1B1A] transition-all duration-300 block ${
                isScrolled ? 'text-2xl' : 'text-2xl sm:text-3xl'
              }`}>
                MAISON AURA
              </span>
              <span className="block text-[9px] uppercase tracking-[0.35em] text-[#8E8279] font-light mt-0.5">
                Elegance, Curated • মেসন অরা
              </span>
            </button>
          </div>

          {/* Center Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-6 text-[12px] uppercase tracking-[0.14em] font-medium text-[#1C1B1A]">
            <button
              onClick={() => navigateTo('shop', { tag: 'New' })}
              className={`hover:text-[#8E8279] transition-colors relative py-2 ${
                currentPage === 'shop' ? 'text-[#1C1B1A]' : ''
              }`}
            >
              New Arrivals
            </button>

            <button
              onClick={() => navigateTo('shop', { category: 'Sarees & Drapes' })}
              className="hover:text-[#8E8279] transition-colors py-2 flex items-center space-x-1"
            >
              <span>Sarees & Drapes</span>
              <span className="text-[10px] text-[#9E2A2B] font-bengali font-normal lowercase tracking-normal">শাড়ি</span>
            </button>

            {/* Handloom & Clothing with Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('clothing')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => navigateTo('shop', { category: 'Clothing' })}
                className="hover:text-[#8E8279] transition-colors py-2 flex items-center space-x-1"
              >
                <span>Handlooms & Apparel</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8E8279]" />
              </button>
            </div>

            {/* Accessories with Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('accessories')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => navigateTo('shop', { category: 'Accessories' })}
                className="hover:text-[#8E8279] transition-colors py-2 flex items-center space-x-1"
              >
                <span>Dokra & Accents</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8E8279]" />
              </button>
            </div>

            {/* Collections with Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('collections')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => navigateTo('shop', { collection: 'Sharodutsav Edit' })}
                className="hover:text-[#8E8279] transition-colors py-2 flex items-center space-x-1"
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#8E8279]" />
              </button>
            </div>

            <button
              onClick={() => {
                if (currentPage !== 'home') {
                  navigateTo('home');
                  setTimeout(() => {
                    document.getElementById('craftsmanship-heritage-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 120);
                } else {
                  document.getElementById('craftsmanship-heritage-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hover:text-[#9E2A2B] transition-colors py-2 flex items-center space-x-1"
            >
              <span>Craftsmanship</span>
              <span className="text-[10px] text-[#9E2A2B] font-bengali font-normal tracking-normal">তাঁত</span>
            </button>

            <button
              onClick={() => navigateTo('lookbook')}
              className="hover:text-[#8E8279] transition-colors py-2"
            >
              Lookbook
            </button>

            <button
              onClick={() => navigateTo('journal')}
              className="hover:text-[#8E8279] transition-colors py-2 flex items-center space-x-1"
            >
              <span>The Journal</span>
              <span className="text-[10px] text-[#C5A880] font-bengali font-normal lowercase tracking-normal">পত্রিকা</span>
            </button>

            <button
              onClick={() => navigateTo('sale')}
              className="hover:text-[#B45309] text-[#9A3412] font-semibold transition-colors py-2"
            >
              Sale
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Desktop Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center text-xs uppercase tracking-wider text-[#1C1B1A] hover:text-[#8E8279] transition-colors p-1"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4 mr-1.5" />
              <span className="hidden xl:inline text-[11px]">Search</span>
            </button>

            {/* Customer Account */}
            <button
              onClick={() => navigateTo('account')}
              className="text-[#1C1B1A] hover:text-[#8E8279] transition-colors p-1"
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="text-[#1C1B1A] hover:text-[#8E8279] transition-colors p-1 relative"
              aria-label={`Wishlist with ${wishlist.length} items`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1C1B1A] text-[#FAF8F5] text-[10px] font-medium rounded-full flex items-center justify-center animate-scale-in">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="text-[#1C1B1A] hover:text-[#8E8279] transition-colors p-1 relative flex items-center"
              aria-label={`Shopping Bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#C5A880] text-[#1C1B1A] text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Switcher */}
            <button
              onClick={() => navigateTo('admin')}
              className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 text-[11px] uppercase tracking-wider bg-[#EDE7DF] text-[#1C1B1A] hover:bg-[#DFCFBE] rounded transition-colors"
              title="Switch to Admin Dashboard"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menus Render */}
      {activeMegaMenu && (
        <MegaMenu
          type={activeMegaMenu}
          onClose={() => setActiveMegaMenu(null)}
        />
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-[#FAF8F5] h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EDE7DF]">
                <div>
                  <span className="font-serif text-xl tracking-[0.2em] font-medium text-[#1C1B1A]">
                    MAISON AURA
                  </span>
                  <span className="block text-[9px] uppercase tracking-[0.3em] text-[#8E8279]">
                    Elegance, Curated.
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-[#1C1B1A]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="py-6 space-y-4 text-base font-medium">
                <button
                  onClick={() => { navigateTo('shop', { tag: 'New' }); setIsMobileMenuOpen(false); }}
                  className="block w-full text-left text-[#1C1B1A] py-1"
                >
                  New Arrivals
                </button>

                <div className="border-t border-[#EDE7DF] pt-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8E8279] block mb-2 font-semibold">
                    Categories
                  </span>
                  {[
                    'Sarees & Drapes',
                    'Kurtas & Tunics',
                    'Heritage Layers',
                    'Dresses',
                    'Tops & Blouses',
                    'Trousers & Dhotis',
                    'Dokra Jewellery',
                    'Handcrafted Bags'
                  ].map(cat => (
                    <button
                      key={cat}
                      onClick={() => { navigateTo('shop', { category: cat }); setIsMobileMenuOpen(false); }}
                      className="block w-full text-left text-sm text-[#1C1B1A] py-1.5 hover:text-[#8E8279]"
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="border-t border-[#EDE7DF] pt-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8E8279] block mb-2 font-semibold">
                    Curated Bengal Edits
                  </span>
                  {[
                    'Sharodutsav Edit',
                    'Jamdani Atelier',
                    'Shantiniketan Edit',
                    'Bonedi Bari Couture',
                    'Everyday Essentials'
                  ].map(col => (
                    <button
                      key={col}
                      onClick={() => { navigateTo('shop', { collection: col }); setIsMobileMenuOpen(false); }}
                      className="block w-full text-left text-sm text-[#1C1B1A] py-1.5 hover:text-[#8E8279]"
                    >
                      {col}
                    </button>
                  ))}
                </div>

                <div className="border-t border-[#EDE7DF] pt-4 space-y-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (currentPage !== 'home') {
                        navigateTo('home');
                        setTimeout(() => {
                          document.getElementById('craftsmanship-heritage-section')?.scrollIntoView({ behavior: 'smooth' });
                        }, 120);
                      } else {
                        document.getElementById('craftsmanship-heritage-section')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="block w-full text-left text-sm py-1 font-medium text-[#9E2A2B] flex items-center justify-between"
                  >
                    <span>Loom Craftsmanship</span>
                    <span className="font-bengali text-xs">তাঁতশিল্প</span>
                  </button>
                  <button
                    onClick={() => { navigateTo('lookbook'); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left text-sm py-1 hover:text-[#8E8279]"
                  >
                    The Lookbook
                  </button>
                  <button
                    onClick={() => { navigateTo('journal'); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left text-sm py-1 hover:text-[#8E8279]"
                  >
                    Editorial Journal
                  </button>
                  <button
                    onClick={() => { navigateTo('about'); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left text-sm py-1 hover:text-[#8E8279]"
                  >
                    Our Story & Ateliers
                  </button>
                  <button
                    onClick={() => { navigateTo('stores'); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left text-sm py-1 hover:text-[#8E8279]"
                  >
                    Store Locator
                  </button>
                  <button
                    onClick={() => { navigateTo('sale'); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left text-sm py-1 text-[#9A3412] font-semibold"
                  >
                    The Sale Edit
                  </button>
                  <button
                    onClick={() => { navigateTo('admin'); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left text-sm py-1 text-[#8E8279] font-medium"
                  >
                    Admin Dashboard
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EDE7DF] text-xs text-[#8E8279]">
              <p>Maison Aura Boutique Atelier</p>
              <p className="mt-1">Complimentary delivery above ₹2,999</p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
