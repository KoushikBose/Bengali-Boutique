import React, { useState } from 'react';
import { 
  Trash2, 
  Heart, 
  Plus, 
  Minus, 
  Truck, 
  ArrowRight, 
  Gift, 
  ShieldCheck, 
  Lock, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    freeShippingThreshold, 
    isFreeShipping, 
    amountToFreeShipping, 
    promoCode, 
    discountPercentage, 
    discountAmount, 
    cartTotal, 
    applyPromoCode, 
    removePromoCode, 
    formatPrice, 
    navigateTo, 
    toggleWishlist,
    products 
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [includeGiftBox, setIncludeGiftBox] = useState(true);
  const [giftNote, setGiftNote] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
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

  const shippingCost = isFreeShipping ? 0 : 250;
  const finalTotal = cartTotal + shippingCost;
  const recommendedItems = products.filter(p => !cart.some(c => c.productId === p.id)).slice(0, 4);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex flex-col items-center justify-center px-4 py-20 text-center">
        <span className="w-16 h-16 rounded-full bg-[#F3EFEA] flex items-center justify-center text-[#8E8279] mb-4">
          <ShoppingBag className="w-8 h-8 text-[#C5A880]" />
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A]">Your shopping bag is empty.</h1>
        <p className="text-xs sm:text-sm text-[#7B726B] max-w-sm mt-2 mb-8 font-light">
          Immerse yourself in our collection of timeless ready-to-wear, fluid silks, and tailored essentials.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-4 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#333130] transition-colors"
        >
          Explore The Collection
        </button>
      </div>
    );
  }

  return (
    <div id="cart-page-root" className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="border-b border-[#EDE7DF] pb-6 mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-normal">
            Your Shopping Bag
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#8E8279] mt-1">
            {cart.length} {cart.length === 1 ? 'Design' : 'Designs'} Selected
          </p>
        </div>

        {/* Free Shipping Notification Banner */}
        <div className="mb-8 p-4 bg-[#F3EFEA] border border-[#E8DFC8] flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-[#1C1B1A]">
            <Truck className="w-5 h-5 text-[#8E8279] shrink-0" />
            {isFreeShipping ? (
              <span className="font-medium text-[#15803d]">
                You have qualified for complimentary express shipping & signature delivery.
              </span>
            ) : (
              <span>
                Add <strong>{formatPrice(amountToFreeShipping)}</strong> more to your order to unlock complimentary express courier delivery.
              </span>
            )}
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="hidden sm:inline text-xs uppercase tracking-wider underline text-[#1C1B1A] font-medium"
          >
            Continue Browsing
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Table List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="border border-[#EDE7DF] bg-white divide-y divide-[#EDE7DF]">
              {cart.map(item => {
                const itemPrice = item.product.salePrice ?? item.product.price;
                return (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center space-x-5">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        onClick={() => navigateTo('product-detail', { productId: item.productId })}
                        className="w-24 h-32 object-cover bg-[#F3EFEA] cursor-pointer shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#8E8279]">
                          {item.product.category}
                        </span>
                        <h3 
                          onClick={() => navigateTo('product-detail', { productId: item.productId })}
                          className="font-serif text-lg text-[#1C1B1A] hover:text-[#8E8279] cursor-pointer"
                        >
                          {item.product.name}
                        </h3>
                        <div className="text-xs text-[#7B726B] space-x-3 pt-0.5">
                          <span>Size: <strong className="text-[#1C1B1A] font-medium">{item.selectedSize}</strong></span>
                          <span>•</span>
                          <span>Color: <strong className="text-[#1C1B1A] font-medium">{item.selectedColor.name}</strong></span>
                        </div>
                        <div className="pt-2 text-sm font-semibold text-[#1C1B1A]">
                          {formatPrice(itemPrice)}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#DDD5C9] bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#1C1B1A] hover:bg-[#F3EFEA]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#1C1B1A] hover:bg-[#F3EFEA]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Subtotal & Actions */}
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[#1C1B1A] block">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                        <div className="flex space-x-3 mt-1.5 text-xs text-[#8E8279]">
                          <button
                            onClick={() => {
                              toggleWishlist(item.product);
                              removeFromCart(item.id);
                            }}
                            className="hover:text-[#1C1B1A] flex items-center"
                          >
                            <Heart className="w-3 h-3 mr-1" />
                            <span>Save</span>
                          </button>
                          <span>•</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="hover:text-[#9A3412] flex items-center"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bespoke Gift Box Option */}
            <div className="p-6 bg-[#F3EFEA] border border-[#E8DFC8]">
              <div className="flex items-start space-x-3">
                <Gift className="w-5 h-5 text-[#8E8279] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1B1A] flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeGiftBox}
                        onChange={e => setIncludeGiftBox(e.target.checked)}
                        className="rounded-xs text-[#1C1B1A] focus:ring-0"
                      />
                      <span>Complimentary Atelier Gift Packaging</span>
                    </label>
                    <span className="text-xs font-medium text-[#15803d]">Complimentary</span>
                  </div>
                  <p className="text-xs text-[#7B726B] mt-1">
                    Every order is swathed in silk tissue paper, placed in our debossed ivory presentation box, and tied with grosgrain ribbon.
                  </p>

                  {includeGiftBox && (
                    <div className="mt-3">
                      <input
                        type="text"
                        value={giftNote}
                        onChange={e => setGiftNote(e.target.value)}
                        placeholder="Add an optional handwritten calligraphic card message..."
                        className="w-full text-xs p-2.5 bg-white border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="p-6 bg-white border border-[#EDE7DF] space-y-5 sticky top-28">
              <h2 className="font-serif text-xl text-[#1C1B1A]">Order Summary</h2>

              {/* Promo Code Box */}
              {!promoCode ? (
                <form onSubmit={handleApplyPromo} className="flex space-x-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={e => setInputCode(e.target.value)}
                    placeholder="Enter Code (AURA10)"
                    className="flex-1 bg-white border border-[#DDD5C9] px-3 py-2 text-xs uppercase placeholder:normal-case focus:outline-none focus:border-[#1C1B1A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#333130]"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between text-xs bg-[#F3EFEA] p-2.5 border border-[#E8DFC8]">
                  <span className="text-[#15803d] font-medium">
                    Promo <strong>{promoCode}</strong> applied ({discountPercentage}% Off)
                  </span>
                  <button onClick={removePromoCode} className="text-[#9A3412] hover:underline text-[11px]">
                    Remove
                  </button>
                </div>
              )}
              {promoError && <p className="text-xs text-[#9A3412]">{promoError}</p>}

              {/* Line items */}
              <div className="space-y-2.5 text-xs border-t border-[#EDE7DF] pt-4">
                <div className="flex justify-between text-[#524B46]">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#15803d]">
                    <span>Privilege Saving</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#524B46]">
                  <span>Express Domestic Delivery</span>
                  <span>{isFreeShipping ? 'Complimentary' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-[#524B46]">
                  <span>Bespoke Gift Boxing</span>
                  <span className="text-[#15803d]">Complimentary</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#1C1B1A] border-t border-[#EDE7DF] pt-3">
                  <span>Grand Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Proceed to checkout */}
              <div className="pt-2 space-y-3">
                <button
                  onClick={() => navigateTo('checkout')}
                  className="w-full py-4 bg-[#1C1B1A] hover:bg-[#333130] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium flex items-center justify-center space-x-2 transition-colors shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center justify-center space-x-4 text-[11px] text-[#8E8279] pt-2">
                  <span className="flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#15803d]" />
                    256-Bit SSL Encryption
                  </span>
                  <span>•</span>
                  <span>14-Day Boutique Exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-24 pt-12 border-t border-[#EDE7DF]">
          <h3 className="font-serif text-2xl text-[#1C1B1A] mb-8 text-center">
            Complete Your Atelier Wardrobe
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedItems.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
