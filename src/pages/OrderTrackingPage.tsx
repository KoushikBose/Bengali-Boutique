import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Copy, 
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderTrackingPage: React.FC = () => {
  const { orders, navigateTo, formatPrice, addToast } = useShop();

  const [searchOrderId, setSearchOrderId] = useState(orders[0]?.orderNumber || 'MA-91823');
  const [currentOrder, setCurrentOrder] = useState(orders[0] || null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(o => 
      o.orderNumber.toLowerCase() === searchOrderId.trim().toLowerCase() ||
      o.id.toLowerCase() === searchOrderId.trim().toLowerCase()
    );
    if (found) {
      setCurrentOrder(found);
      addToast('Order Located', `Displaying status for Order #${found.orderNumber}`, 'success');
    } else {
      addToast('Order Not Found', 'Please verify your order number and try again.', 'error');
    }
  };

  const handleCopyTracking = (code: string) => {
    navigator.clipboard.writeText(code);
    addToast('Tracking Copied', `Airway Bill ${code} copied to clipboard.`, 'info');
  };

  const steps = [
    { label: 'Order Confirmed', date: currentOrder ? currentOrder.createdAt : '12 Oct, 10:45 AM', completed: true },
    { label: 'Atelier Inspection & Gift Boxing', date: '12 Oct, 03:15 PM', completed: true },
    { label: 'Dispatched with Blue Dart Air', date: '13 Oct, 09:20 AM', completed: currentOrder?.status !== 'Processing' },
    { label: 'Out for Doorstep Delivery', date: 'Expected Tomorrow', completed: currentOrder?.status === 'Delivered' }
  ];

  return (
    <div id="tracking-page-root" className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E8279] font-medium block mb-1">
            Blue Dart Luxury Express Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A]">
            Track Your Consignment
          </h1>
          <p className="text-xs sm:text-sm text-[#7B726B] mt-2">
            Real-time atelier progress, dispatch telemetry, and doorstep courier status.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-10 bg-white border border-[#EDE7DF] p-3 shadow-xs flex items-center">
          <Package className="w-5 h-5 text-[#8E8279] ml-2 mr-3 shrink-0" />
          <input
            type="text"
            value={searchOrderId}
            onChange={e => setSearchOrderId(e.target.value)}
            placeholder="Enter Order Number (e.g. MA-91823)"
            className="w-full text-xs font-medium text-[#1C1B1A] placeholder:text-[#9A9086] focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#333130] transition-colors shrink-0"
          >
            Track Order
          </button>
        </form>

        {currentOrder ? (
          <div className="space-y-8">
            {/* Status Header Card */}
            <div className="bg-white border border-[#EDE7DF] p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EDE7DF] gap-3">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="font-serif text-2xl text-[#1C1B1A]">Order #{currentOrder.orderNumber}</span>
                    <span className="px-2.5 py-0.5 bg-[#ecfdf5] text-[#15803d] text-[10px] uppercase tracking-wider font-semibold rounded-xs">
                      {currentOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#8E8279] mt-1">
                    Carrier: Blue Dart Luxury Air • Airway Bill: <strong className="text-[#1C1B1A]">{currentOrder.trackingNumber || 'BD-91820491IN'}</strong>
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCopyTracking(currentOrder.trackingNumber || 'BD-91820491IN')}
                    className="px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD5C9] text-xs text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-white transition-colors flex items-center space-x-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy AWB</span>
                  </button>
                  <button
                    onClick={() => navigateTo('returns')}
                    className="px-3.5 py-2 bg-[#FAF8F5] border border-[#DDD5C9] text-xs text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-white transition-colors flex items-center space-x-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Return / Exchange</span>
                  </button>
                </div>
              </div>

              {/* Visual 4-Stage Timeline */}
              <div className="py-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                  {steps.map((step, idx) => (
                    <div key={idx} className="relative flex sm:flex-col items-start space-x-3 sm:space-x-0">
                      <div className="flex items-center mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                          step.completed 
                            ? 'bg-[#1C1B1A] text-[#DFCFBE]' 
                            : 'bg-[#EDE7DF] text-[#8E8279]'
                        }`}>
                          {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                      </div>

                      <div>
                        <h4 className={`font-serif text-sm ${step.completed ? 'text-[#1C1B1A]' : 'text-[#8E8279]'}`}>
                          {step.label}
                        </h4>
                        <span className="text-[11px] text-[#8E8279] mt-0.5 block">{step.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address & Payment Info Grid */}
              <div className="pt-6 border-t border-[#EDE7DF] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#524B46]">
                <div>
                  <span className="text-[#8E8279] uppercase tracking-wider text-[10px] block mb-1">Destination Address</span>
                  <p className="font-semibold text-[#1C1B1A]">{currentOrder.shippingAddress.firstName} {currentOrder.shippingAddress.lastName}</p>
                  <p>{currentOrder.shippingAddress.street}, {currentOrder.shippingAddress.apartment}</p>
                  <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} — {currentOrder.shippingAddress.postalCode}</p>
                  <p className="text-[#8E8279] mt-1">Phone: {currentOrder.shippingAddress.phone}</p>
                </div>

                <div>
                  <span className="text-[#8E8279] uppercase tracking-wider text-[10px] block mb-1">Payment & Assurance</span>
                  <p>Method: <strong className="text-[#1C1B1A]">{currentOrder.paymentMethod}</strong></p>
                  <p>Total Charged: <strong className="text-[#1C1B1A]">{formatPrice(currentOrder.total)}</strong></p>
                  <p className="mt-2 text-[11px] text-[#15803d] flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    Insured against transit loss or fabric damage
                  </p>
                </div>
              </div>
            </div>

            {/* Consignment Contents */}
            <div className="bg-white border border-[#EDE7DF] p-6">
              <h3 className="font-serif text-lg text-[#1C1B1A] mb-4">Garments in this Consignment</h3>
              <div className="divide-y divide-[#EDE7DF]">
                {currentOrder.items.map(it => (
                  <div key={it.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={it.product.images[0]} alt="" className="w-14 h-18 object-cover bg-[#F3EFEA]" />
                      <div>
                        <h4 
                          onClick={() => navigateTo('product-detail', { productId: it.productId })}
                          className="font-serif text-sm text-[#1C1B1A] hover:underline cursor-pointer"
                        >
                          {it.product.name}
                        </h4>
                        <span className="text-xs text-[#8E8279]">
                          Size: {it.selectedSize} • Color: {it.selectedColor.name} • Qty: {it.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#1C1B1A]">
                      {formatPrice((it.product.salePrice ?? it.product.price) * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-[#EDE7DF] p-8">
            <Package className="w-8 h-8 text-[#8E8279] mx-auto mb-2" />
            <p className="font-serif text-xl text-[#1C1B1A]">Please enter an Order ID to begin tracking</p>
          </div>
        )}

      </div>
    </div>
  );
};
