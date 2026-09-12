import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductColor } from '../../types';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    formatPrice,
    setIsSizeGuideOpen 
  } = useShop();

  const product = quickViewProduct;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedColor(product.colors[0] || null);
      setSelectedSize(product.sizes[0] || '');
    }
  }, [product]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAdd = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart(product, selectedSize, selectedColor, 1);
    setQuickViewProduct(null);
  };

  const handleViewDetails = () => {
    setQuickViewProduct(null);
    navigateTo('product-detail', { productId: product.id });
  };

  return (
    <div 
      id="quick-view-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={() => setQuickViewProduct(null)}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#E8DFC8] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#1C1B1A] bg-[#FAF8F5]/80 hover:bg-[#FAF8F5] rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Gallery Preview */}
        <div className="md:w-1/2 bg-[#F3EFEA] flex flex-col justify-between p-4">
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-14 h-16 shrink-0 border transition-all ${
                    selectedImage === i ? 'border-[#1C1B1A] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 flex-wrap">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E8279]">
                  {product.collection}
                </span>
                {product.craftCluster && (
                  <span className="text-[10px] text-[#9E2A2B] font-medium bg-[#9E2A2B]/10 px-1.5 py-0.2 rounded font-serif">
                    {product.craftCluster}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1 text-xs text-[#7B726B]">
                <Star className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                <span className="font-medium text-[#1C1B1A]">{product.rating}</span>
                <span className="text-[#8E8279]">({product.reviewCount})</span>
              </div>
            </div>

            <div className="flex items-baseline justify-between gap-2 mt-1 mb-2">
              <h2 className="font-serif text-2xl text-[#1C1B1A] font-normal leading-snug">
                {product.name}
              </h2>
              {product.bengaliName && (
                <span className="text-base text-[#9E2A2B] font-bengali font-normal shrink-0">
                  {product.bengaliName}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3 mb-4">
              {product.salePrice ? (
                <>
                  <span className="text-xl font-medium text-[#9A3412]">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-sm text-[#8E8279] line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-medium text-[#1C1B1A]">
                  {formatPrice(product.price)}
                </span>
              )}
              <span className="text-[11px] text-[#15803d] font-medium bg-[#ecfdf5] px-2 py-0.5 rounded">
                In Stock & Ready to Ship
              </span>
            </div>

            <p className="text-xs text-[#524B46] leading-relaxed mb-5 line-clamp-3">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#8E8279] uppercase tracking-wider text-[11px]">Color:</span>
                <span className="font-medium text-[#1C1B1A]">{selectedColor?.name}</span>
              </div>
              <div className="flex space-x-2">
                {product.colors.map(col => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col)}
                    className={`w-7 h-7 rounded-full border transition-all flex items-center justify-center ${
                      selectedColor?.name === col.name 
                        ? 'ring-2 ring-[#1C1B1A] ring-offset-2' 
                        : 'border-[#D9CFBE] opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#8E8279] uppercase tracking-wider text-[11px]">Size:</span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#8E8279] hover:text-[#1C1B1A] underline underline-offset-2"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[40px] h-9 px-3 text-xs font-medium border transition-colors ${
                      selectedSize === sz
                        ? 'bg-[#1C1B1A] text-[#FAF8F5] border-[#1C1B1A]'
                        : 'bg-white text-[#1C1B1A] border-[#DDD5C9] hover:border-[#1C1B1A]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4 border-t border-[#EDE7DF]">
            <div className="flex space-x-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333130] transition-colors"
              >
                Add To Bag
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`p-3.5 border transition-colors ${
                  inWishlist 
                    ? 'border-[#1C1B1A] bg-[#1C1B1A] text-[#DFCFBE]' 
                    : 'border-[#DDD5C9] text-[#1C1B1A] hover:border-[#1C1B1A]'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#DFCFBE]' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleViewDetails}
              className="w-full text-center text-xs uppercase tracking-[0.16em] text-[#8E8279] hover:text-[#1C1B1A] py-2 flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>View Full Editorial Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
