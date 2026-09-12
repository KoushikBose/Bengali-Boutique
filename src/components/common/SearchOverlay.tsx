import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateTo, formatPrice } = useShop();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Silk Dresses',
    'Linen Blazer',
    'Handbags',
    'Wide-Leg Trousers',
    '18k Gold Hoops',
    'Co-ord Set'
  ];

  const trimmed = query.trim().toLowerCase();

  const matchingProducts = trimmed
    ? products.filter(p =>
        p.name.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.collection.toLowerCase().includes(trimmed) ||
        p.materials.toLowerCase().includes(trimmed) ||
        p.tags.some(t => t.toLowerCase().includes(trimmed))
      ).slice(0, 6)
    : [];

  const matchingCategories = trimmed
    ? Array.from(
        new Set(
          products
            .filter(p => p.category.toLowerCase().includes(trimmed))
            .map(p => p.category)
        )
      )
    : [];

  const handleProductSelect = (product: Product) => {
    setIsSearchOpen(false);
    navigateTo('product-detail', { productId: product.id });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsSearchOpen(false);
    navigateTo('shop', { tag: query.trim() });
  };

  const handleSearchChipClick = (term: string) => {
    setQuery(term);
    setIsSearchOpen(false);
    navigateTo('shop', { tag: term });
  };

  return (
    <div 
      id="predictive-search-overlay"
      className="fixed inset-0 z-50 bg-[#FAF8F5]/98 backdrop-blur-md overflow-y-auto animate-fade-in"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-full flex flex-col">
        {/* Top bar with Close */}
        <div className="flex items-center justify-between pb-6 border-b border-[#EDE7DF]">
          <span className="font-serif tracking-[0.2em] font-medium uppercase text-sm text-[#8E8279]">
            MAISON AURA • PREDICTIVE SEARCH
          </span>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-[#1C1B1A] hover:text-[#8E8279] flex items-center space-x-1 text-xs uppercase tracking-widest"
          >
            <span>Close (ESC)</span>
            <X className="w-5 h-5 ml-1" />
          </button>
        </div>

        {/* Big Search Input */}
        <form onSubmit={handleSearchSubmit} className="my-8 sm:my-12">
          <div className="relative flex items-center border-b-2 border-[#1C1B1A] pb-4">
            <Search className="w-7 h-7 sm:w-9 sm:h-9 text-[#8E8279] mr-4 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full bg-transparent text-xl sm:text-3xl lg:text-4xl font-serif text-[#1C1B1A] placeholder:text-[#BBB0A4] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-[#8E8279] hover:text-[#1C1B1A] p-2"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </form>

        {/* Content Area */}
        <div className="flex-1">
          {!query.trim() ? (
            /* Popular Searches and Editorial Collections when empty */
            <div className="space-y-10">
              <div>
                <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#8E8279] mb-4 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {popularSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => handleSearchChipClick(term)}
                      className="px-4 py-2 bg-[#F3EFEA] hover:bg-[#1C1B1A] hover:text-[#FAF8F5] text-xs uppercase tracking-wider text-[#1C1B1A] transition-all duration-200 border border-[#E8DFC8]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#8E8279] mb-4 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Curated Quick Links</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { title: 'New Arrivals', sub: 'Seasonal drop', tag: 'New' },
                    { title: 'Dresses', sub: 'Silk & linen', cat: 'Dresses' },
                    { title: 'Handbags', sub: 'Florentine leather', cat: 'Handbags' },
                    { title: 'Signature Edit', sub: 'Artisanal tailoring', col: 'Signature Collection' }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setIsSearchOpen(false);
                        if (item.cat) navigateTo('shop', { category: item.cat });
                        else if (item.col) navigateTo('shop', { collection: item.col });
                        else navigateTo('shop', { tag: item.tag });
                      }}
                      className="p-4 bg-[#F3EFEA] text-left hover:border-[#1C1B1A] border border-transparent transition-colors group"
                    >
                      <h4 className="font-serif text-base text-[#1C1B1A] group-hover:text-[#8E8279]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#8E8279] mt-0.5">{item.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Live Predictive Results */
            <div>
              {matchingProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-serif text-2xl text-[#1C1B1A]">We couldn't find matches for "{query}"</p>
                  <p className="text-xs text-[#8E8279] mt-2 max-w-sm mx-auto">
                    Try searching for broader keywords like silk, dresses, trousers, or handcrafted leather.
                  </p>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('shop');
                    }}
                    className="mt-6 px-6 py-3 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#322F2D]"
                  >
                    Browse All Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {matchingCategories.length > 0 && (
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] text-[#8E8279] block mb-2 font-medium">
                        Suggested Categories
                      </span>
                      <div className="flex gap-2">
                        {matchingCategories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => {
                              setIsSearchOpen(false);
                              navigateTo('shop', { category: cat });
                            }}
                            className="text-xs px-3 py-1.5 bg-[#F3EFEA] hover:bg-[#1C1B1A] hover:text-white transition-colors"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#8E8279] font-medium">
                        Matching Pieces ({matchingProducts.length})
                      </span>
                      <button
                        onClick={handleSearchSubmit}
                        className="text-xs text-[#1C1B1A] hover:text-[#8E8279] flex items-center font-medium"
                      >
                        <span>View all matching results</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                      {matchingProducts.map(prod => (
                        <div
                          key={prod.id}
                          onClick={() => handleProductSelect(prod)}
                          className="group cursor-pointer flex flex-col"
                        >
                          <div className="aspect-[3/4] bg-[#F3EFEA] overflow-hidden mb-2">
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <span className="text-[10px] text-[#8E8279] uppercase tracking-wider">
                            {prod.category}
                          </span>
                          <h5 className="font-serif text-xs text-[#1C1B1A] group-hover:text-[#8E8279] transition-colors line-clamp-1">
                            {prod.name}
                          </h5>
                          <span className="text-xs font-medium text-[#1C1B1A] mt-1">
                            {formatPrice(prod.salePrice ?? prod.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
