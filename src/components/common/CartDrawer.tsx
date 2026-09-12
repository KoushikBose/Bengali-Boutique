import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, Heart, ArrowRight, Truck, Check, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    freeShippingThreshold,
    isFreeShipping,
    amountToFreeShipping,
    promoCode,
    discountPercentage,
    applyPromoCode,
    removePromoCode,
    discountAmount,
    cartTotal,
    toggleWishlist,
    formatPrice,
    navigateTo
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!inputCode.trim()) return;
    const res = applyPromoCode(inputCode);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setInputCode('');
    }
  };

  const handleSaveForLater = (item: any) => {
    toggleWishlist(item.product);
    removeFromCart(item.id);
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleViewCartPage = () => {
    setIsCartDrawerOpen(false);
    navigateTo('cart');
  };

  const shippingPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div 
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-fade-in"
      onClick={() => setIsCartDrawerOpen(false)}
    >
      <div 
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#FAF8F5] h-full flex flex-col justify-between shadow-2xl border-l border-[#E8DFC8] animate-slide-left overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EDE7DF] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="font-serif text-xl tracking-wide text-[#1C1B1A]">Shopping Bag</span>
            <span className="text-xs text-[#8E8279] ml-2">({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1 text-[#1C1B1A] hover:text-[#8E8279] transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-5 py-3 bg-[#F3EFEA] border-b border-[#EDE7DF]">
          <div className="flex items-center space-x-2 text-xs text-[#1C1B1A] mb-1.5">
            <Truck className="w-4 h-4 text-[#8E8279]" />
            {isFreeShipping ? (
              <span className="font-medium text-[#15803d] flex items-center">
                <Check className="w-3.5 h-3.5 mr-1" />
                Complimentary express shipping unlocked!
              </span>
            ) : (
              <span>
                Add <span className="font-semibold text-[#1C1B1A]">{formatPrice(amountToFreeShipping)}</span> more for complimentary express delivery.
              </span>
            )}
          </div>
          <div className="w-full h-1.5 bg-[#DDD5C9] rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShipping ? 'bg-[#15803d]' : 'bg-[#1C1B1A]'
              }`}
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EDE7DF]">
          {cart.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-[#F3EFEA] flex items-center justify-center text-[#8E8279] mb-4">
                <Sparkles className="w-6 h-6 text-[#C5A880]" />
              </span>
              <h4 className="font-serif text-xl text-[#1C1B1A]">Your bag is waiting.</h4>
              <p className="text-xs text-[#8E8279] mt-2 max-w-xs">
                Explore our curated ready-to-wear silhouettes and luxury atelier edits.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigateTo('shop');
                }}
                className="mt-6 px-6 py-3 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#333130]"
              >
                Discover New Arrivals
              </button>
            </div>
          ) : (
            cart.map(item => {
              const itemPrice = item.product.salePrice ?? item.product.price;
              return (
                <div key={item.id} className="py-4 flex space-x-3.5 first:pt-0">
                  {/* Thumbnail */}
                  <div 
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigateTo('product-detail', { productId: item.productId });
                    }}
                    className="w-20 h-26 bg-[#F3EFEA] shrink-0 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          {item.product.craftCluster && (
                            <span className="text-[9px] uppercase tracking-wider text-[#9E2A2B] font-medium block">
                              {item.product.craftCluster}
                            </span>
                          )}
                          <h4 
                            onClick={() => {
                              setIsCartDrawerOpen(false);
                              navigateTo('product-detail', { productId: item.productId });
                            }}
                            className="font-serif text-sm text-[#1C1B1A] hover:text-[#9E2A2B] cursor-pointer line-clamp-1"
                          >
                            {item.product.name}
                          </h4>
                          {item.product.bengaliName && (
                            <span className="font-bengali text-xs text-[#7B726B] block">
                              {item.product.bengaliName}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#8E8279] hover:text-[#9A3412] p-1 -mr-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#7B726B] mt-0.5 space-x-2">
                        <span>Size: <strong className="text-[#1C1B1A] font-medium">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-[#1C1B1A] font-medium">{item.selectedColor.name}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DDD5C9] bg-white text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#1C1B1A] hover:bg-[#F3EFEA]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 font-medium text-[#1C1B1A]">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#1C1B1A] hover:bg-[#F3EFEA]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Price & Save for Later */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleSaveForLater(item)}
                          className="text-[10px] text-[#8E8279] hover:text-[#1C1B1A] flex items-center"
                          title="Save for Later"
                        >
                          <Heart className="w-3 h-3 mr-0.5" />
                          <span>Save</span>
                        </button>
                        <span className="text-sm font-medium text-[#1C1B1A]">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Checkout Controls */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#EDE7DF] bg-[#FAF8F5] space-y-3">
            {/* Promo Code Entry */}
            {!promoCode ? (
              <form onSubmit={handleApplyCode} className="flex space-x-2">
                <input
                  type="text"
                  value={inputCode}
                  onChange={e => setInputCode(e.target.value)}
                  placeholder="Promo Code (try AURA10)"
                  className="flex-1 bg-white border border-[#DDD5C9] px-3 py-1.5 text-xs text-[#1C1B1A] focus:outline-none focus:border-[#1C1B1A] uppercase placeholder:normal-case"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#EDE7DF] hover:bg-[#DFCFBE] text-[#1C1B1A] text-xs font-semibold uppercase tracking-wider"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between text-xs bg-[#F3EFEA] p-2 border border-[#E8DFC8]">
                <span className="font-medium text-[#15803d]">
                  Code {promoCode} applied ({discountPercentage}% off)
                </span>
                <button
                  onClick={removePromoCode}
                  className="text-[#9A3412] hover:underline font-medium text-[11px]"
                >
                  Remove
                </button>
              </div>
            )}
            {promoError && (
              <p className="text-[11px] text-[#9A3412]">{promoError}</p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#7B726B]">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#15803d]">
                  <span>Privilege Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#7B726B]">
                <span>Estimated Express Shipping</span>
                <span>{isFreeShipping ? 'Complimentary' : formatPrice(250)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#1C1B1A] pt-1.5 border-t border-[#EDE7DF]">
                <span>Total</span>
                <span>{formatPrice(cartTotal + (isFreeShipping ? 0 : 250))}</span>
              </div>
            </div>

            {/* Packaging & Handloom Guarantee Note */}
            <div className="bg-[#F8F5F0] p-2.5 border border-[#E8DFC8] text-[11px] text-[#524B46] flex items-center space-x-2">
              <span className="text-[#9E2A2B] text-sm">✦</span>
              <p>
                <strong className="text-[#1C1B1A] font-medium">Atelier Guarantee:</strong> Handloommark certified. Packaged in recycled Bengal craft box with fragrant dried mogra & camphor.
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#1C1B1A] hover:bg-[#333130] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleViewCartPage}
                className="w-full py-2.5 bg-white border border-[#DDD5C9] hover:border-[#1C1B1A] text-[#1C1B1A] text-xs uppercase tracking-[0.16em] font-medium transition-colors text-center"
              >
                View Full Bag & Summary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
