import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  aspectRatio?: 'portrait' | 'square';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  aspectRatio = 'portrait' 
}) => {
  const { 
    navigateTo, 
    toggleWishlist, 
    isInWishlist, 
    addToCart, 
    setQuickViewProduct,
    formatPrice 
  } = useShop();

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickSize, setShowQuickSize] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product-detail', { productId: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    addToCart(product, size, selectedColor, 1);
    setShowQuickSize(false);
  };

  const handleColorChange = (e: React.MouseEvent, color: ProductColor) => {
    e.stopPropagation();
    setSelectedColor(color);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative flex flex-col cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSize(false);
      }}
      onClick={handleCardClick}
    >
      {/* Product Image Stage */}
      <div className={`relative overflow-hidden bg-[#F3EFEA] ${
        aspectRatio === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
      }`}>
        
        {/* Primary & Hover Images */}
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="px-2.5 py-1 bg-[#1C1B1A] text-[#FAF8F5] text-[9px] uppercase tracking-[0.2em] font-medium">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2.5 py-1 bg-[#DFCFBE] text-[#1C1B1A] text-[9px] uppercase tracking-[0.2em] font-semibold">
              Bestseller
            </span>
          )}
          {product.salePrice && (
            <span className="px-2.5 py-1 bg-[#9A3412] text-white text-[9px] uppercase tracking-[0.2em] font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            inWishlist 
              ? 'bg-[#1C1B1A] text-[#DFCFBE]' 
              : 'bg-[#FAF8F5]/80 text-[#1C1B1A] hover:bg-[#FAF8F5] backdrop-blur-xs opacity-90 sm:opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#DFCFBE]' : ''}`} />
        </button>

        {/* Quick View Button (Center Overlay on Desktop) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickView}
            className="pointer-events-auto px-4 py-2 bg-[#FAF8F5]/90 hover:bg-[#FAF8F5] text-[#1C1B1A] text-xs uppercase tracking-widest font-medium shadow-md backdrop-blur-xs flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye className="w-3.5 h-3.5 text-[#8E8279]" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Quick Add Bar (Bottom of image) */}
        <div className="absolute bottom-0 inset-x-0 z-10">
          {!showQuickSize ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (product.sizes.length === 1 && product.sizes[0] === 'One Size') {
                  addToCart(product, 'One Size', selectedColor, 1);
                } else {
                  setShowQuickSize(true);
                }
              }}
              className="w-full py-3 bg-[#1C1B1A]/95 text-[#FAF8F5] text-xs uppercase tracking-[0.16em] font-medium backdrop-blur-xs transition-all duration-300 transform translate-y-full group-hover:translate-y-0 flex items-center justify-center space-x-2 hover:bg-[#1C1B1A]"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#DFCFBE]" />
              <span>Quick Add</span>
            </button>
          ) : (
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full p-2.5 bg-[#FAF8F5] border-t border-[#E8DFC8] shadow-lg animate-fade-in"
            >
              <div className="text-[10px] uppercase tracking-wider text-[#8E8279] text-center mb-1.5 font-medium">
                Select Size
              </div>
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                {product.sizes.map(sz => (
                  <button
                    key={sz}
                    onClick={(e) => handleQuickAdd(e, sz)}
                    className="min-w-[32px] h-7 px-1.5 text-xs font-medium border border-[#DDD5C9] bg-white text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-white transition-colors"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Metadata & Info */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Colors Swatches */}
        {product.colors.length > 1 && (
          <div className="flex items-center space-x-1.5 mb-1.5">
            {product.colors.map(col => (
              <button
                key={col.name}
                onClick={(e) => handleColorChange(e, col)}
                title={col.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === col.name 
                    ? 'ring-1 ring-[#1C1B1A] ring-offset-1 scale-110' 
                    : 'border-[#DDD5C9] opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: col.hex }}
              />
            ))}
          </div>
        )}

        {/* Category / Subtitle & Craft Cluster */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] mb-1">
          <span className="text-[#8E8279]">{product.category}</span>
          {product.craftCluster && (
            <span className="text-[#9E2A2B] font-medium tracking-normal text-[10px] bg-[#9E2A2B]/8 px-1.5 py-0.2 rounded font-serif">
              {product.craftCluster}
            </span>
          )}
        </div>

        {/* Product Title & Bengali Script */}
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-serif text-base font-normal text-[#1C1B1A] group-hover:text-[#9E2A2B] transition-colors leading-snug line-clamp-1 flex-1">
            {product.name}
          </h3>
          {product.bengaliName && (
            <span className="text-xs text-[#9E2A2B] font-bengali font-normal shrink-0 tracking-normal opacity-90">
              {product.bengaliName}
            </span>
          )}
        </div>

        {/* Price & Rating */}
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.salePrice ? (
              <>
                <span className="text-sm font-medium text-[#9A3412]">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-xs text-[#8E8279] line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-[#1C1B1A]">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <span className="text-[11px] text-[#8E8279]">
            {selectedColor.name}
          </span>
        </div>
      </div>
    </div>
  );
};
