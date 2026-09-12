import React, { useState } from 'react';
import { 
  TrendingUp, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  Plus, 
  Edit3, 
  DollarSign, 
  ArrowUpRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { products, orders, formatPrice, addToast } = useShop();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'coupons'>('analytics');
  
  // Local admin states for interactive editing
  const [productList, setProductList] = useState<Product[]>(products);
  const [orderList, setOrderList] = useState(orders);
  const [coupons] = useState([
    { code: 'AURA10', discount: 10, usageCount: 142, status: 'Active' },
    { code: 'ATELIER15', discount: 15, usageCount: 89, status: 'Active' },
    { code: 'WELCOME20', discount: 20, usageCount: 310, status: 'Active' }
  ]);

  // New product modal
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<'Dresses' | 'Tops' | 'Trousers' | 'Outerwear' | 'Handbags' | 'Shoes'>('Dresses');
  const [newProductPrice, setNewProductPrice] = useState(18500);

  const totalRevenue = orderList.reduce((acc, ord) => acc + ord.total, 458000);

  const handleUpdateOrderStatus = (orderId: string, newStatus: any) => {
    setOrderList(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    addToast('Status Synchronized', `Order status updated to ${newStatus}.`, 'success');
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName) return;
    const newProd: Product = {
      id: `prod-custom-${Date.now()}`,
      sku: `MA-NEW-${Date.now().toString().slice(-4)}`,
      name: newProductName,
      slug: newProductName.toLowerCase().replace(/\s+/g, '-'),
      category: newProductCategory,
      collection: 'Signature Collection',
      currency: 'INR',
      price: Number(newProductPrice),
      description: 'Hand-tailored luxury garment crafted from noble fibers with meticulous French seam finish.',
      materials: '100% Pure Mulberry Silk',
      composition: '100% Mulberry Silk',
      careInstructions: 'Dry clean only',
      fit: 'Relaxed tailored fit',
      modelInfo: 'Model is 5’9” wearing size S',
      images: [
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop'
      ],
      colors: [{ name: 'Ivory', hex: '#FAF8F5' }, { name: 'Noir', hex: '#1C1B1A' }],
      sizes: ['XS', 'S', 'M', 'L'],
      rating: 5.0,
      reviewCount: 1,
      inventory: 12,
      inStock: true,
      isNewArrival: true,
      tags: ['New', 'Atelier']
    };

    setProductList([newProd, ...productList]);
    setShowNewProductModal(false);
    setNewProductName('');
    addToast('Product Added', `${newProd.name} added to boutique inventory.`, 'success');
  };

  return (
    <div id="admin-dashboard-root" className="min-h-screen bg-[#FAF8F5] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EDE7DF] mb-8 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block mb-1">
              Atelier Management Console
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1B1A]">
              Maison Aura Boutique Administration
            </h1>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setShowNewProductModal(true)}
              className="px-4 py-2 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#333130] flex items-center space-x-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Garment</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex space-x-2 border-b border-[#EDE7DF] mb-8 overflow-x-auto pb-1">
          {[
            { key: 'analytics', label: 'Overview & Sales', icon: TrendingUp },
            { key: 'products', label: `Inventory & Catalog (${productList.length})`, icon: Package },
            { key: 'orders', label: `Order Dispatch (${orderList.length})`, icon: ShoppingBag },
            { key: 'coupons', label: 'Privilege Vouchers', icon: Tag }
          ].map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key as any)}
                className={`flex items-center space-x-2 py-3 px-5 text-xs uppercase tracking-wider font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === t.key
                    ? 'border-[#1C1B1A] text-[#1C1B1A]'
                    : 'border-transparent text-[#8E8279] hover:text-[#1C1B1A]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white border border-[#EDE7DF] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8E8279]">
                  <span className="uppercase tracking-wider">Gross Salon Revenue</span>
                  <DollarSign className="w-4 h-4 text-[#C5A880]" />
                </div>
                <span className="font-serif text-2xl text-[#1C1B1A] block">
                  {formatPrice(totalRevenue)}
                </span>
                <span className="text-[11px] text-[#15803d] flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  +18.4% vs last month
                </span>
              </div>

              <div className="p-6 bg-white border border-[#EDE7DF] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8E8279]">
                  <span className="uppercase tracking-wider">Atelier Orders</span>
                  <ShoppingBag className="w-4 h-4 text-[#C5A880]" />
                </div>
                <span className="font-serif text-2xl text-[#1C1B1A] block">
                  {orderList.length + 38}
                </span>
                <span className="text-[11px] text-[#15803d] flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  98.2% on-time courier delivery
                </span>
              </div>

              <div className="p-6 bg-white border border-[#EDE7DF] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8E8279]">
                  <span className="uppercase tracking-wider">Average Order Value (AOV)</span>
                  <TrendingUp className="w-4 h-4 text-[#C5A880]" />
                </div>
                <span className="font-serif text-2xl text-[#1C1B1A] block">
                  {formatPrice(23400)}
                </span>
                <span className="text-[11px] text-[#15803d] flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  Elevated cart conversion
                </span>
              </div>

              <div className="p-6 bg-white border border-[#EDE7DF] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8E8279]">
                  <span className="uppercase tracking-wider">Private Salon Members</span>
                  <Users className="w-4 h-4 text-[#C5A880]" />
                </div>
                <span className="font-serif text-2xl text-[#1C1B1A] block">
                  1,840
                </span>
                <span className="text-[11px] text-[#15803d]">
                  Active clients in Mumbai, Delhi & BLR
                </span>
              </div>
            </div>

            {/* Top performing garments */}
            <div className="bg-white border border-[#EDE7DF] p-6 space-y-4">
              <h3 className="font-serif text-lg text-[#1C1B1A]">Best Selling Atelier Silhouettes</h3>
              <div className="divide-y divide-[#EDE7DF]">
                {productList.slice(0, 4).map((p, idx) => (
                  <div key={p.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="font-serif text-sm font-semibold text-[#8E8279] w-5">
                        0{idx + 1}
                      </span>
                      <img src={p.images[0]} alt="" className="w-10 h-14 object-cover bg-[#F3EFEA]" />
                      <div>
                        <h4 className="font-serif text-xs text-[#1C1B1A]">{p.name}</h4>
                        <span className="text-[10px] text-[#8E8279]">{p.category} • {p.collection}</span>
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <span className="font-semibold text-[#1C1B1A] block">{formatPrice(p.price)}</span>
                      <span className="text-[#15803d] text-[10px]">Stock: {p.inventory} units</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & CATALOG */}
        {activeTab === 'products' && (
          <div className="bg-white border border-[#EDE7DF] overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs divide-y divide-[#EDE7DF]">
              <thead className="bg-[#FAF8F5] text-[#8E8279] uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Garment</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Rating</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE7DF]">
                {productList.map(p => (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img src={p.images[0]} alt="" className="w-10 h-14 object-cover bg-[#F3EFEA]" />
                      <div>
                        <span className="font-serif font-medium text-[#1C1B1A] block">{p.name}</span>
                        <span className="text-[10px] text-[#8E8279]">{p.materials}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#524B46]">{p.category}</td>
                    <td className="py-3 px-4 font-semibold text-[#1C1B1A]">{formatPrice(p.salePrice ?? p.price)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-xs font-medium text-[10px] ${
                        p.inventory > 5 ? 'bg-[#ecfdf5] text-[#15803d]' : 'bg-[#fff1f2] text-[#be123c]'
                      }`}>
                        {p.inventory} units
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#524B46]">★ {p.rating} ({p.reviewCount})</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => addToast('Editing Mode', `Opened editor for ${p.name}`, 'info')}
                        className="p-1 text-[#8E8279] hover:text-[#1C1B1A]"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: ORDERS DISPATCH */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orderList.map(ord => (
              <div key={ord.id} className="bg-white border border-[#EDE7DF] p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EDE7DF] gap-2">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="font-serif text-base font-semibold text-[#1C1B1A]">
                        Order #{ord.orderNumber}
                      </span>
                      <span className="text-xs text-[#8E8279]">Placed: {ord.date}</span>
                    </div>
                    <p className="text-xs text-[#524B46] mt-0.5">
                      Client: {ord.shippingAddress.fullName} ({ord.shippingAddress.city}, {ord.shippingAddress.postalCode})
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-[#8E8279]">Update Status:</span>
                    <select
                      value={ord.status}
                      onChange={e => handleUpdateOrderStatus(ord.id, e.target.value)}
                      className="p-1.5 text-xs bg-[#FAF8F5] border border-[#DDD5C9]"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#524B46]">
                  <div>
                    <span>Items ({ord.items.length}): </span>
                    <span className="font-medium text-[#1C1B1A]">
                      {ord.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                    </span>
                  </div>
                  <div className="text-right font-semibold text-[#1C1B1A]">
                    Total: {formatPrice(ord.total)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="bg-white border border-[#EDE7DF] p-6 space-y-6">
            <h3 className="font-serif text-lg text-[#1C1B1A]">Privilege Vouchers & Promotional Codes</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {coupons.map((c, i) => (
                <div key={i} className="p-5 bg-[#FAF8F5] border border-[#EDE7DF] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-base font-bold text-[#1C1B1A]">{c.code}</span>
                    <span className="px-2 py-0.5 bg-[#ecfdf5] text-[#15803d] text-[10px] uppercase font-semibold">
                      {c.status}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[#1C1B1A] block">{c.discount}% Discount</span>
                  <p className="text-xs text-[#8E8279]">Redeemed {c.usageCount} times across private salons.</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Add Garment */}
        {showNewProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-[#FAF8F5] border border-[#E8DFC8] max-w-md w-full p-6 sm:p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#1C1B1A]">Add Garment to Catalog</h3>
              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#8E8279] uppercase tracking-wider text-[11px] mb-1">Garment Title</label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={e => setNewProductName(e.target.value)}
                    placeholder="e.g. Ivory Charmeuse Slip Gown"
                    className="w-full p-2.5 bg-white border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#8E8279] uppercase tracking-wider text-[11px] mb-1">Category</label>
                    <select
                      value={newProductCategory}
                      onChange={e => setNewProductCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-white border border-[#DDD5C9]"
                    >
                      <option value="Dresses">Dresses</option>
                      <option value="Tops">Tops</option>
                      <option value="Trousers">Trousers</option>
                      <option value="Outerwear">Outerwear</option>
                      <option value="Handbags">Handbags</option>
                      <option value="Shoes">Shoes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#8E8279] uppercase tracking-wider text-[11px] mb-1">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={newProductPrice}
                      onChange={e => setNewProductPrice(Number(e.target.value))}
                      className="w-full p-2.5 bg-white border border-[#DDD5C9]"
                    />
                  </div>
                </div>

                <div className="pt-2 flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewProductModal(false)}
                    className="flex-1 py-3 border border-[#DDD5C9] text-xs uppercase tracking-wider font-medium text-[#7B726B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#1C1B1A] text-white text-xs uppercase tracking-wider font-medium"
                  >
                    Save Garment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
