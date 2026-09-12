import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  Settings, 
  Download, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';

export const AccountPage: React.FC = () => {
  const { user, orders, wishlist, navigateTo, formatPrice } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'preferences'>('orders');

  return (
    <div id="account-page-root" className="min-h-screen bg-[#FAF8F5] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header Card */}
        <div className="bg-[#F3EFEA] border border-[#E8DFC8] p-6 sm:p-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-full bg-[#1C1B1A] text-[#DFCFBE] flex items-center justify-center font-serif text-2xl font-normal shadow-sm">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A] font-normal">
                  {user.name}
                </h1>
                <span className="px-2 py-0.5 bg-[#DFCFBE] text-[#1C1B1A] text-[10px] uppercase tracking-widest font-semibold">
                  Privilege Tier
                </span>
              </div>
              <p className="text-xs text-[#7B726B] mt-0.5">{user.email} • {user.phone}</p>
              <p className="text-[11px] text-[#8E8279] mt-1">
                Atelier Client Member since October 2023
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="text-right">
              <span className="text-[#8E8279] block text-[10px] uppercase tracking-wider">Atelier Points</span>
              <span className="font-serif text-xl text-[#1C1B1A]">2,450 pts</span>
            </div>
            <button
              onClick={() => navigateTo('stores')}
              className="px-4 py-2.5 bg-[#1C1B1A] text-[#FAF8F5] uppercase tracking-wider text-[11px] font-medium hover:bg-[#333130]"
            >
              Book Salon Appointment
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#EDE7DF] mb-8 overflow-x-auto">
          {[
            { key: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { key: 'wishlist', label: `Saved Edits (${wishlist.length})`, icon: Heart },
            { key: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { key: 'preferences', label: 'Bespoke Preferences', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 py-3 px-5 text-xs uppercase tracking-wider font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-[#1C1B1A] text-[#1C1B1A]'
                    : 'border-transparent text-[#8E8279] hover:text-[#1C1B1A]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div>
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="text-center py-16 bg-white border border-[#EDE7DF]">
                  <Package className="w-8 h-8 text-[#8E8279] mx-auto mb-2" />
                  <h3 className="font-serif text-xl text-[#1C1B1A]">No prior orders recorded</h3>
                  <p className="text-xs text-[#7B726B] mt-1 mb-4">Your atelier purchases will appear here.</p>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="px-6 py-2.5 bg-[#1C1B1A] text-white text-xs uppercase tracking-widest"
                  >
                    Explore Creations
                  </button>
                </div>
              ) : (
                orders.map(ord => (
                  <div key={ord.id} className="bg-white border border-[#EDE7DF] p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EDE7DF] gap-3">
                      <div>
                        <div className="flex items-center space-x-3">
                          <span className="font-serif text-base font-semibold text-[#1C1B1A]">
                            Order #{ord.orderNumber}
                          </span>
                          <span className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-xs ${
                            ord.status === 'Delivered' 
                              ? 'bg-[#ecfdf5] text-[#15803d]' 
                              : 'bg-[#fffbeb] text-[#b45309]'
                          }`}>
                            {ord.status}
                          </span>
                        </div>
                        <span className="text-xs text-[#8E8279] mt-0.5 block">
                          Placed on {ord.createdAt} • Shipped via Blue Dart Air
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => navigateTo('tracking', { orderId: ord.id })}
                          className="px-3.5 py-1.5 bg-[#FAF8F5] border border-[#DDD5C9] text-xs text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-white transition-colors"
                        >
                          Track Package
                        </button>
                        <button
                          onClick={() => alert(`Downloading official VAT invoice for Order #${ord.orderNumber}`)}
                          className="p-1.5 text-[#8E8279] hover:text-[#1C1B1A]"
                          title="Download Invoice"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="divide-y divide-[#EDE7DF]">
                      {ord.items.map(it => (
                        <div key={it.id} className="py-3 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <img
                              src={it.product.images[0]}
                              alt=""
                              className="w-14 h-18 object-cover bg-[#F3EFEA]"
                            />
                            <div>
                              <h4 
                                onClick={() => navigateTo('product-detail', { productId: it.productId })}
                                className="font-serif text-sm text-[#1C1B1A] hover:underline cursor-pointer"
                              >
                                {it.product.name}
                              </h4>
                              <span className="text-xs text-[#7B726B]">
                                Qty: {it.quantity} • Size: {it.selectedSize} • Color: {it.selectedColor.name}
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-semibold text-[#1C1B1A]">
                            {formatPrice((it.product.salePrice ?? it.product.price) * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Total Footer */}
                    <div className="pt-3 border-t border-[#EDE7DF] flex items-center justify-between text-xs text-[#524B46]">
                      <span>Destination: {ord.shippingAddress.city}, {ord.shippingAddress.state}</span>
                      <div className="text-right">
                        <span>Total Paid: </span>
                        <strong className="text-sm font-semibold text-[#1C1B1A] ml-1">
                          {formatPrice(ord.total)}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlist.length === 0 ? (
                <div className="text-center py-16 bg-white border border-[#EDE7DF]">
                  <Heart className="w-8 h-8 text-[#8E8279] mx-auto mb-2" />
                  <h3 className="font-serif text-xl text-[#1C1B1A]">Your wishlist is waiting</h3>
                  <p className="text-xs text-[#7B726B] mt-1 mb-4">
                    Save your favorite silhouettes while curating your seasonal wardrobe.
                  </p>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="px-6 py-2.5 bg-[#1C1B1A] text-white text-xs uppercase tracking-widest"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {wishlist.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ADDRESSES TAB */}
          {activeTab === 'addresses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#1C1B1A] relative shadow-xs">
                <span className="absolute top-4 right-4 px-2 py-0.5 bg-[#1C1B1A] text-[#FAF8F5] text-[10px] uppercase tracking-wider font-semibold">
                  Default Address
                </span>
                <h4 className="font-serif text-base text-[#1C1B1A] mb-2">Ananya Sharma</h4>
                <div className="text-xs text-[#524B46] space-y-1 leading-relaxed">
                  <p>72 Maker Chambers VI, Nariman Point</p>
                  <p>Apt 14B, Sea View Tower</p>
                  <p>Mumbai, Maharashtra — 400021</p>
                  <p>India</p>
                  <p className="pt-2 text-[#8E8279]">Phone: +91 98200 12345</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EDE7DF] flex space-x-3 text-xs">
                  <button className="text-[#1C1B1A] hover:underline font-medium">Edit</button>
                </div>
              </div>

              <div className="p-6 border-2 border-dashed border-[#DDD5C9] bg-white flex flex-col items-center justify-center text-center">
                <MapPin className="w-8 h-8 text-[#8E8279] mb-2" />
                <h4 className="font-serif text-base text-[#1C1B1A]">Add New Atelier Address</h4>
                <p className="text-xs text-[#8E8279] mt-1 mb-4">Save addresses for effortless express checkout.</p>
                <button className="px-4 py-2 bg-[#FAF8F5] border border-[#DDD5C9] text-xs uppercase tracking-wider font-medium text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-white transition-colors">
                  Add Address
                </button>
              </div>
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <div className="max-w-2xl bg-white border border-[#EDE7DF] p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-xl text-[#1C1B1A] pb-3 border-b border-[#EDE7DF]">
                Bespoke Tailoring Sizing Profile
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-[#8E8279] uppercase tracking-wider text-[11px] mb-1">Standard Top Size</label>
                  <select className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]">
                    <option>S (Small)</option>
                    <option>XS</option>
                    <option>M</option>
                    <option>L</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#8E8279] uppercase tracking-wider text-[11px] mb-1">Trouser Size</label>
                  <select className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]">
                    <option>27 / UK 8</option>
                    <option>26 / UK 6</option>
                    <option>28 / UK 10</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#8E8279] uppercase tracking-wider text-[11px] mb-1">Shoe Size (EU)</label>
                  <select className="w-full p-2.5 bg-[#FAF8F5] border border-[#DDD5C9]">
                    <option>EU 38</option>
                    <option>EU 37</option>
                    <option>EU 39</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EDE7DF] space-y-3 text-xs">
                <h4 className="font-serif text-base text-[#1C1B1A]">Client Communications</h4>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded-xs text-[#1C1B1A]" />
                  <span>Receive seasonal lookbook hardcopy to registered address</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded-xs text-[#1C1B1A]" />
                  <span>Private preview alerts for upcoming drops 24 hours in advance</span>
                </label>
              </div>

              <button className="px-6 py-3 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#333130]">
                Save Atelier Preferences
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
