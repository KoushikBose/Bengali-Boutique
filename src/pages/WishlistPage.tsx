import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, addToCart, toggleWishlist, navigateTo, addToast } = useShop();

  const handleMoveAllToBag = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach(item => {
      addToCart(item, item.sizes[0], item.colors[0], 1);
    });
    addToast('All Pieces Moved', `${wishlist.length} saved garments added to your shopping bag.`, 'success');
  };

  return (
    <div id="wishlist-page-root" className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EDE7DF] mb-10 gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E8279] font-medium block mb-1">
              Private Salon Curation
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-normal">
              Your Saved Wardrobe ({wishlist.length})
            </h1>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={handleMoveAllToBag}
              className="px-6 py-3 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#333130] transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Transfer All to Bag</span>
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#EDE7DF] max-w-lg mx-auto p-8 space-y-4">
            <span className="w-14 h-14 rounded-full bg-[#FAF8F5] text-[#8E8279] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6 text-[#C5A880]" />
            </span>
            <h3 className="font-serif text-2xl text-[#1C1B1A]">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#7B726B] font-light">
              Bookmark your coveted silhouettes, fluid silks, and hand-tailored pieces as you browse the atelier collection.
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="mt-4 px-8 py-3.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333130]"
            >
              Discover The Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
