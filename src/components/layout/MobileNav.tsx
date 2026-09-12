import React from 'react';
import { Home, Compass, Search, Heart, User, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const MobileNav: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    setIsSearchOpen, 
    wishlist, 
    cartCount, 
    setIsCartDrawerOpen 
  } = useShop();

  return (
    <nav 
      id="mobile-bottom-nav" 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-[#E8DFC8] py-2 px-3 shadow-lg"
    >
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
            currentPage === 'home' ? 'text-[#1C1B1A]' : 'text-[#8E8279] hover:text-[#1C1B1A]'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider mt-1 font-medium">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => navigateTo('shop')}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
            currentPage === 'shop' ? 'text-[#1C1B1A]' : 'text-[#8E8279] hover:text-[#1C1B1A]'
          }`}
          aria-label="Shop All"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider mt-1 font-medium">Shop</span>
        </button>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center p-1.5 text-[#8E8279] hover:text-[#1C1B1A] transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider mt-1 font-medium">Search</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => navigateTo('wishlist')}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors relative ${
            currentPage === 'wishlist' ? 'text-[#1C1B1A]' : 'text-[#8E8279] hover:text-[#1C1B1A]'
          }`}
          aria-label="Wishlist"
        >
          <Heart className="w-5 h-5" />
          {wishlist.length > 0 && (
            <span className="absolute top-1 right-2 w-3.5 h-3.5 bg-[#1C1B1A] text-[#FAF8F5] text-[9px] rounded-full flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-wider mt-1 font-medium">Saved</span>
        </button>

        {/* Bag */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center justify-center p-1.5 text-[#8E8279] hover:text-[#1C1B1A] transition-colors relative"
          aria-label="Bag"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute top-1 right-2 w-3.5 h-3.5 bg-[#C5A880] text-[#1C1B1A] text-[9px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-wider mt-1 font-medium">Bag</span>
        </button>

        {/* Account */}
        <button
          onClick={() => navigateTo('account')}
          className={`flex flex-col items-center justify-center p-1.5 transition-colors ${
            currentPage === 'account' ? 'text-[#1C1B1A]' : 'text-[#8E8279] hover:text-[#1C1B1A]'
          }`}
          aria-label="Account"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-wider mt-1 font-medium">Account</span>
        </button>
      </div>
    </nav>
  );
};
