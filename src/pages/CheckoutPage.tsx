import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Smartphone, 
  Building, 
  DollarSign, 
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    discountAmount, 
    promoCode, 
    isFreeShipping, 
    cartTotal, 
    formatPrice, 
    placeOrder, 
    navigateTo 
  } = useShop();

  // Form states
  const [email, setEmail] = useState('ananya.sharma@example.com');
  const [phone, setPhone] = useState('+91 98200 12345');
  const [firstName, setFirstName] = useState('Ananya');
  const [lastName, setLastName] = useState('Sharma');
  const [street, setStreet] = useState('72 Maker Chambers VI, Nariman Point');
  const [apartment, setApartment] = useState('Apt 14B');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [postalCode, setPostalCode] = useState('400021');

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('ananya@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('891');
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = shippingMethod === 'express' ? 450 : (isFreeShipping ? 0 : 250);
  const grandTotal = cartTotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-[#FAF8F5] text-center">
        <h2 className="font-serif text-2xl text-[#1C1B1A]">No items in your bag</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-4 px-6 py-3 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-widest"
        >
          Return to Atelier
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder({
        items: cart.map(item => ({
          productId: item.productId,
          name: item.product.name,
          price: item.product.salePrice ?? item.product.price,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor.name,
          image: item.product.images[0]
        })),
        subtotal: cartSubtotal,
        shipping: shippingCost,
        discount: discountAmount,
        total: grandTotal,
        shippingAddress: {
          fullName: `${firstName} ${lastName}`,
          email,
          phone,
          address: `${street}, ${apartment}`,
          city,
          state,
          postalCode,
          country: 'India'
        },
        paymentMethod: paymentMethod === 'upi' ? 'UPI / QR' : paymentMethod === 'card' ? 'Credit / Debit Card' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery',
        estimatedDelivery: shippingMethod === 'express' ? 'Tomorrow Morning' : '3-4 Business Days'
      });

      setIsProcessing(false);
      navigateTo('tracking', { orderNumber: order.orderNumber });
    }, 1200);
  };

  return (
    <div id="checkout-page-root" className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Dedicated Clean Luxury Checkout Header */}
      <header className="bg-white border-b border-[#EDE7DF] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigateTo('cart')}
            className="text-xs uppercase tracking-wider text-[#8E8279] hover:text-[#1C1B1A] flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            <span>Return to Bag</span>
          </button>

          <div className="text-center">
            <span className="font-serif text-xl tracking-[0.2em] font-medium text-[#1C1B1A] block">
              MAISON AURA
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#8E8279]">
              Secure Atelier Checkout
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#15803d]">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-medium">SSL Encrypted</span>
          </div>
        </div>
      </header>

      {/* Main Checkout Form + Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Checkout Stages */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Customer Contact */}
            <div className="p-6 bg-white border border-[#EDE7DF] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE7DF]">
                <h3 className="font-serif text-lg text-[#1C1B1A] flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#1C1B1A] text-white text-[10px] flex items-center justify-center mr-2">1</span>
                  Contact Information
                </h3>
                <span className="text-xs text-[#8E8279]">Private Salon Member</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="uppercase tracking-wider text-[#8E8279] text-[11px] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                  />
                </div>
                <div>
                  <label className="uppercase tracking-wider text-[#8E8279] text-[11px] block mb-1">Phone (for courier updates)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="p-6 bg-white border border-[#EDE7DF] space-y-4">
              <div className="pb-3 border-b border-[#EDE7DF]">
                <h3 className="font-serif text-lg text-[#1C1B1A] flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#1C1B1A] text-white text-[10px] flex items-center justify-center mr-2">2</span>
                  Delivery Destination
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="uppercase tracking-wider text-[#8E8279] text-[11px] block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]"
                  />
                </div>
                <div>
                  <label className="uppercase tracking-wider text-[#8E8279] text-[11px] block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="uppercase tracking-wider text-[#8E8279] text-[11px] block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]"
                  />
                </div>
                <div>
                  <label className="uppercase tracking-wider text-[#8E8279] text-[11px] block mb-1">Apartment, Suite, Unit</label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={e => setApartment(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]"
                  />
                </div>
                <div>
                  <label className="uppercase tracking-wider text-[#8E8279] text-[11px] block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]"
                  />
                </div>
                <div>
                  <label className="uppercase tracking-wider text-[#8E8279] text-[11px] block mb-1">State / Region</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]"
                  />
                </div>
                <div>
                  <label className="uppercase tracking-wider text-[#8E8279] text-[11px] block mb-1">Pincode / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Shipping Method */}
            <div className="p-6 bg-white border border-[#EDE7DF] space-y-4">
              <div className="pb-3 border-b border-[#EDE7DF]">
                <h3 className="font-serif text-lg text-[#1C1B1A] flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#1C1B1A] text-white text-[10px] flex items-center justify-center mr-2">3</span>
                  Shipping Service
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <label 
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                    shippingMethod === 'standard' ? 'border-[#1C1B1A] bg-[#F3EFEA]' : 'border-[#DDD5C9]'
                  }`}
                  onClick={() => setShippingMethod('standard')}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="text-[#1C1B1A] focus:ring-0"
                    />
                    <div>
                      <span className="font-semibold text-[#1C1B1A] block">Express Courier Delivery</span>
                      <span className="text-[#8E8279]">Estimated 2–4 business days with signature receipt</span>
                    </div>
                  </div>
                  <span className="font-semibold text-[#1C1B1A]">
                    {isFreeShipping ? 'Complimentary' : formatPrice(250)}
                  </span>
                </label>

                <label 
                  className={`p-4 border flex items-center justify-between cursor-pointer transition-colors ${
                    shippingMethod === 'express' ? 'border-[#1C1B1A] bg-[#F3EFEA]' : 'border-[#DDD5C9]'
                  }`}
                  onClick={() => setShippingMethod('express')}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="text-[#1C1B1A] focus:ring-0"
                    />
                    <div>
                      <span className="font-semibold text-[#1C1B1A] block">Priority Next-Day Air Courier</span>
                      <span className="text-[#8E8279]">Next business morning dispatch with luxury tamper seal</span>
                    </div>
                  </div>
                  <span className="font-semibold text-[#1C1B1A]">{formatPrice(450)}</span>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Options */}
            <div className="p-6 bg-white border border-[#EDE7DF] space-y-5">
              <div className="pb-3 border-b border-[#EDE7DF]">
                <h3 className="font-serif text-lg text-[#1C1B1A] flex items-center">
                  <span className="w-5 h-5 rounded-full bg-[#1C1B1A] text-white text-[10px] flex items-center justify-center mr-2">4</span>
                  Payment Method
                </h3>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 border flex flex-col items-center justify-center text-center space-y-1.5 transition-colors ${
                    paymentMethod === 'upi' ? 'border-[#1C1B1A] bg-[#FAF8F5] font-semibold text-[#1C1B1A]' : 'border-[#DDD5C9] text-[#7B726B]'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#C5A880]" />
                  <span>UPI / QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 border flex flex-col items-center justify-center text-center space-y-1.5 transition-colors ${
                    paymentMethod === 'card' ? 'border-[#1C1B1A] bg-[#FAF8F5] font-semibold text-[#1C1B1A]' : 'border-[#DDD5C9] text-[#7B726B]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#C5A880]" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 border flex flex-col items-center justify-center text-center space-y-1.5 transition-colors ${
                    paymentMethod === 'netbanking' ? 'border-[#1C1B1A] bg-[#FAF8F5] font-semibold text-[#1C1B1A]' : 'border-[#DDD5C9] text-[#7B726B]'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#C5A880]" />
                  <span>NetBanking</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 border flex flex-col items-center justify-center text-center space-y-1.5 transition-colors ${
                    paymentMethod === 'cod' ? 'border-[#1C1B1A] bg-[#FAF8F5] font-semibold text-[#1C1B1A]' : 'border-[#DDD5C9] text-[#7B726B]'
                  }`}
                >
                  <DollarSign className="w-5 h-5 text-[#C5A880]" />
                  <span>COD</span>
                </button>
              </div>

              {/* Dynamic Payment Details Fields */}
              <div className="p-4 bg-[#F9F7F4] border border-[#EDE7DF] text-xs">
                {paymentMethod === 'upi' && (
                  <div className="space-y-3">
                    <label className="block text-[#524B46]">Enter your UPI ID (Google Pay, PhonePe, Paytm, BHIM):</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full p-2.5 bg-white border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                    />
                    <p className="text-[11px] text-[#8E8279]">
                      A payment authorization prompt will be forwarded securely to your UPI mobile app upon clicking Place Order.
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[#524B46] mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full p-2.5 bg-white border border-[#DDD5C9]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#524B46] mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={e => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 bg-white border border-[#DDD5C9]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#524B46] mb-1">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          className="w-full p-2.5 bg-white border border-[#DDD5C9]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="space-y-2">
                    <label className="block text-[#524B46]">Select Banking Institution:</label>
                    <select className="w-full p-2.5 bg-white border border-[#DDD5C9]">
                      <option>HDFC Bank Private Banking</option>
                      <option>ICICI Bank Wealth Management</option>
                      <option>Axis Bank Burgundy</option>
                      <option>State Bank of India</option>
                      <option>Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="space-y-1 text-xs text-[#7B726B]">
                    <p className="font-semibold text-[#1C1B1A]">Cash on Delivery Available</p>
                    <p>An OTP verification SMS will be sent to {phone} prior to dispatch.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary Sticky Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#EDE7DF] p-6 space-y-6 sticky top-24">
              <h3 className="font-serif text-xl text-[#1C1B1A] pb-3 border-b border-[#EDE7DF]">
                Ensemble Summary ({cart.length})
              </h3>

              {/* Items preview list */}
              <div className="max-h-72 overflow-y-auto divide-y divide-[#EDE7DF] space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-14 h-18 bg-[#F3EFEA] overflow-hidden shrink-0">
                        <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                        <span className="absolute top-0 right-0 w-4 h-4 bg-[#1C1B1A] text-white text-[9px] flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-serif text-xs text-[#1C1B1A] line-clamp-1">{item.product.name}</h4>
                        <span className="text-[10px] text-[#8E8279]">
                          {item.selectedSize} • {item.selectedColor.name}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#1C1B1A]">
                      {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="border-t border-[#EDE7DF] pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-[#7B726B]">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#15803d]">
                    <span>Atelier Privilege ({promoCode})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#7B726B]">
                  <span>Shipping ({shippingMethod === 'express' ? 'Priority Air' : 'Courier'})</span>
                  <span>{shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#1C1B1A] border-t border-[#EDE7DF] pt-3">
                  <span>Grand Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#1C1B1A] hover:bg-[#333130] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-sm"
              >
                {isProcessing ? (
                  <span>Authorizing Payment...</span>
                ) : (
                  <>
                    <span>Place Order</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#8E8279] text-center space-y-1 pt-1">
                <p>By placing your order, you agree to the Maison Aura Terms of Atelier Sale.</p>
                <p className="text-[#15803d]">Complimentary 14-day domestic returns included.</p>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
