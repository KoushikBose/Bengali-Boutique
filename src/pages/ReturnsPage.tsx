import React, { useState } from 'react';
import { RefreshCw, Package, Truck, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ReturnsPage: React.FC = () => {
  const { orders, addToast, navigateTo } = useShop();

  const [orderNumber, setOrderNumber] = useState(orders[0]?.orderNumber || '');
  const [returnType, setReturnType] = useState<'exchange' | 'refund'>('exchange');
  const [reason, setReason] = useState('Need a different size');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Return Authorized', 'Complimentary courier pickup scheduled for tomorrow.', 'success');
  };

  return (
    <div id="returns-page-root" className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E8279] font-medium block mb-2">
            Complimentary Client Care
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A]">
            14-Day Returns & Size Exchanges
          </h1>
          <p className="text-xs sm:text-sm text-[#7B726B] mt-2 font-light">
            We want your Maison Aura creations to fit impeccably. Doorstep pickup and complimentary exchanges are provided nationwide.
          </p>
        </div>

        {/* 3-Step Return Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-white border border-[#EDE7DF] space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#1C1B1A] text-[#DFCFBE] text-xs font-semibold flex items-center justify-center mb-3">
              1
            </span>
            <h4 className="font-serif text-base text-[#1C1B1A]">Initiate Request</h4>
            <p className="text-xs text-[#7B726B] leading-relaxed">
              Select whether you desire a complimentary size exchange or a full refund to your original payment method.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EDE7DF] space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#1C1B1A] text-[#DFCFBE] text-xs font-semibold flex items-center justify-center mb-3">
              2
            </span>
            <h4 className="font-serif text-base text-[#1C1B1A]">Doorstep Collection</h4>
            <p className="text-xs text-[#7B726B] leading-relaxed">
              Our courier arrives at your preferred home or office address to collect the garment in its original bespoke packaging.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#EDE7DF] space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#1C1B1A] text-[#DFCFBE] text-xs font-semibold flex items-center justify-center mb-3">
              3
            </span>
            <h4 className="font-serif text-base text-[#1C1B1A]">Rapid Settlement</h4>
            <p className="text-xs text-[#7B726B] leading-relaxed">
              Replacement garments are dispatched immediately. Refunds are credited in 24–48 hours upon pickup verification.
            </p>
          </div>
        </div>

        {/* Main Return Form Card */}
        <div className="bg-white border border-[#EDE7DF] p-6 sm:p-10 shadow-xs">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-serif text-2xl text-[#1C1B1A] pb-3 border-b border-[#EDE7DF]">
                Request Atelier Return or Exchange
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[#8E8279] text-[11px] mb-1">
                    Order Number
                  </label>
                  <input
                    type="text"
                    required
                    value={orderNumber}
                    onChange={e => setOrderNumber(e.target.value)}
                    placeholder="e.g. MA-91823"
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#8E8279] text-[11px] mb-1">
                    Desired Action
                  </label>
                  <select
                    value={returnType}
                    onChange={e => setReturnType(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]"
                  >
                    <option value="exchange">Complimentary Size/Color Exchange</option>
                    <option value="refund">Full Refund to Original Payment Source</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#8E8279] text-[11px] mb-1">
                    Reason for Return
                  </label>
                  <select
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]"
                  >
                    <option>Need a smaller size</option>
                    <option>Need a larger size</option>
                    <option>Desired a different colorway</option>
                    <option>Garment did not suit silhouette</option>
                    <option>Fabric texture preference</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#8E8279] text-[11px] mb-1">
                    Additional Notes for Atelier Stylist (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    placeholder="Mention specific fit details or requested replacement size..."
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#EDE7DF] flex items-center justify-between">
                <span className="text-xs text-[#15803d] flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  Zero restocking or pickup courier fees
                </span>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333130]"
                >
                  Authorize Pickup
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#ecfdf5] text-[#15803d] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl text-[#1C1B1A]">
                Return Request Authorized
              </h3>
              <p className="text-xs text-[#524B46] max-w-md mx-auto leading-relaxed">
                A Blue Dart courier will arrive tomorrow between 11:00 AM – 3:00 PM for doorstep collection for Order #{orderNumber}. Please keep the garment in its original box with security tags intact.
              </p>
              <div className="pt-4 flex justify-center space-x-3">
                <button
                  onClick={() => navigateTo('tracking')}
                  className="px-6 py-2.5 bg-[#1C1B1A] text-white text-xs uppercase tracking-wider font-medium"
                >
                  Track Pickup
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 border border-[#DDD5C9] text-xs uppercase tracking-wider font-medium"
                >
                  Submit Another
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
