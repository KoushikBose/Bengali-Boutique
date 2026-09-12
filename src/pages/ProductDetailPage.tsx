import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Ruler, 
  ChevronDown, 
  Plus, 
  Minus, 
  Sparkles, 
  Check, 
  MapPin, 
  ArrowRight,
  ZoomIn
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { ProductColor } from '../types';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatPrice, 
    setIsSizeGuideOpen, 
    addToast,
    navigateTo 
  } = useShop();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#000' });
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'S');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Accordion tabs
  const [openAccordion, setOpenAccordion] = useState<'description' | 'materials' | 'fit' | 'shipping'>('description');

  // Customer Review Modal / State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImageIndex(0);
    if (product) {
      setSelectedColor(product.colors[0] || { name: 'Default', hex: '#000' });
      setSelectedSize(product.sizes[0] || 'S');
      setQuantity(1);
    }
  }, [product?.id]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigateTo('checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setPincodeStatus('Please enter a valid 6-digit postal pincode.');
      return;
    }
    if (pincode.startsWith('700') || pincode.startsWith('711') || pincode.startsWith('712')) {
      setPincodeStatus(`✨ Same-Day or Next-Day Luxury Concierge Delivery in Kolkata (${pincode}) via Maison Aura Ballygunge Atelier.`);
    } else if (pincode.startsWith('731') || pincode.startsWith('742') || pincode.startsWith('713')) {
      setPincodeStatus(`Complimentary 24-hr Bengal Handloom Express to ${pincode} from our Bolpur/Murshidabad ateliers.`);
    } else {
      const days = pincode.startsWith('400') || pincode.startsWith('110') || pincode.startsWith('560') ? '2–3 days' : '3–5 days';
      setPincodeStatus(`Complimentary express delivery available to ${pincode} in ${days} via Blue Dart Luxury.`);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Link Copied', 'Product link copied to your clipboard.', 'info');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;
    addToast('Review Submitted', 'Thank you for your review. It is pending atelier verification.', 'success');
    setShowReviewForm(false);
    setReviewName('');
    setReviewComment('');
  };

  // Recommendations
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  // Styled With
  const styledWithProducts = products
    .filter(p => p.id !== product.id && ['Handbags', 'Shoes', 'Jewellery'].includes(p.category))
    .slice(0, 3);

  return (
    <div id="product-detail-root" className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Breadcrumbs */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-[#8E8279] flex items-center space-x-2">
        <button onClick={() => navigateTo('home')} className="hover:text-[#1C1B1A]">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('shop', { category: product.category })} className="hover:text-[#1C1B1A]">
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#1C1B1A] font-medium line-clamp-1">{product.name}</span>
      </nav>

      {/* Main PDP Grid (Gallery + Details) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* LEFT: GALLERY (Section 21: Thumbnails + Main View) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            
            {/* Thumbnails (Vertical on desktop) */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-24 shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[3/4] w-18 sm:w-full overflow-hidden bg-[#F3EFEA] border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-[#1C1B1A]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-[3/4] bg-[#F3EFEA] overflow-hidden group shadow-xs">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                {product.isNewArrival && (
                  <span className="px-3 py-1 bg-[#1C1B1A] text-[#FAF8F5] text-[10px] uppercase tracking-widest font-medium">
                    New Arrival
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-3 py-1 bg-[#DFCFBE] text-[#1C1B1A] text-[10px] uppercase tracking-widest font-semibold">
                    Atelier Bestseller
                  </span>
                )}
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-[#FAF8F5]/80 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase tracking-widest text-[#1C1B1A] flex items-center space-x-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Hover to Zoom</span>
              </div>
            </div>
          </div>

          {/* RIGHT: PRODUCT CONTROLS */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            
            {/* Header / Brand */}
            <div className="border-b border-[#EDE7DF] pb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#8E8279] font-medium">
                    {product.collection}
                  </span>
                  {product.craftCluster && (
                    <>
                      <span className="text-[#C5A880] text-xs">•</span>
                      <span className="text-[11px] text-[#9E2A2B] font-medium bg-[#9E2A2B]/10 px-2 py-0.5 rounded font-serif">
                        {product.craftCluster}
                      </span>
                    </>
                  )}
                </div>
                <button
                  onClick={handleShare}
                  className="text-[#8E8279] hover:text-[#1C1B1A] p-1 flex items-center text-xs space-x-1"
                  title="Share Garment"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-[11px]">Share</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mt-1.5 mb-2">
                <h1 className="font-serif text-2xl sm:text-4xl text-[#1C1B1A] font-normal leading-tight">
                  {product.name}
                </h1>
                {product.bengaliName && (
                  <span className="text-xl sm:text-2xl text-[#9E2A2B] font-bengali font-normal shrink-0 tracking-normal">
                    {product.bengaliName}
                  </span>
                )}
              </div>

              {/* Star Rating & Reviews */}
              <div className="flex items-center space-x-3 text-xs text-[#7B726B]">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#C5A880] text-[#C5A880]'
                          : 'text-[#DDD5C9]'
                      }`}
                    />
                  ))}
                  <span className="font-medium text-[#1C1B1A] ml-1">{product.rating}</span>
                </div>
                <span>•</span>
                <a href="#reviews-section" className="hover:text-[#1C1B1A] underline underline-offset-2">
                  {product.reviewCount} client reviews
                </a>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline space-x-3">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-medium text-[#9A3412]">
                      {formatPrice(product.salePrice)}
                    </span>
                    <span className="text-base text-[#8E8279] line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs uppercase tracking-wider text-[#9A3412] font-semibold bg-[#ffedd5] px-2 py-0.5 rounded">
                      Save {formatPrice(product.price - product.salePrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl sm:text-3xl font-medium text-[#1C1B1A]">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#8E8279] mt-1">
                Price inclusive of all taxes, duties, and signature bespoke box.
              </p>
            </div>

            {/* Selectors: Color, Size, Quantity */}
            <div className="py-6 border-b border-[#EDE7DF] space-y-6">
              
              {/* Colors */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-[#8E8279] uppercase tracking-wider text-[11px]">
                    Color: <strong className="text-[#1C1B1A] font-semibold">{selectedColor.name}</strong>
                  </span>
                </div>
                <div className="flex space-x-3">
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col)}
                      className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center ${
                        selectedColor.name === col.name
                          ? 'ring-2 ring-[#1C1B1A] ring-offset-2 scale-110'
                          : 'border-[#DDD5C9] opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-[#8E8279] uppercase tracking-wider text-[11px]">
                    Select Size: <strong className="text-[#1C1B1A] font-semibold">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-[#1C1B1A] hover:text-[#8E8279] underline underline-offset-2 flex items-center space-x-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[48px] h-11 px-3 text-xs uppercase tracking-wider font-medium border transition-colors ${
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

              {/* Quantity Stepper */}
              <div>
                <span className="text-[#8E8279] uppercase tracking-wider text-[11px] block mb-2">Quantity</span>
                <div className="flex items-center border border-[#DDD5C9] bg-white w-32 justify-between">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#1C1B1A] hover:bg-[#F3EFEA]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-semibold text-[#1C1B1A]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#1C1B1A] hover:bg-[#F3EFEA]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#333130] transition-colors shadow-sm"
                  >
                    Add To Bag
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    className={`p-4 border transition-colors ${
                      inWishlist 
                        ? 'border-[#1C1B1A] bg-[#1C1B1A] text-[#DFCFBE]' 
                        : 'border-[#DDD5C9] bg-white text-[#1C1B1A] hover:border-[#1C1B1A]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#DFCFBE]' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-[#DFCFBE] text-[#1C1B1A] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white border border-[#DFCFBE] transition-colors"
                >
                  Buy Now With 1-Click
                </button>
              </div>

              {/* Pincode delivery estimation */}
              <div className="pt-2">
                <form onSubmit={handleCheckPincode} className="flex space-x-2">
                  <div className="relative flex-1">
                    <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8E8279]" />
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter Delivery Pincode (e.g. 400001)"
                      className="w-full pl-8 pr-3 py-2 bg-white border border-[#DDD5C9] text-xs text-[#1C1B1A] focus:outline-none focus:border-[#1C1B1A]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#EDE7DF] text-[#1C1B1A] text-xs uppercase tracking-wider font-semibold hover:bg-[#DFCFBE]"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className="text-xs text-[#15803d] mt-2 font-medium">
                    {pincodeStatus}
                  </p>
                )}
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="divide-y divide-[#EDE7DF]">
              {/* Bengal Craft Cluster Tab if present */}
              {product.craftCluster && (
                <div>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'craft' ? ('' as any) : 'craft')}
                    className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1B1A]"
                  >
                    <span className="flex items-center space-x-2">
                      <span>Bengal Handloom Provenance & Guild</span>
                      <span className="text-[11px] text-[#9E2A2B] font-bengali font-normal tracking-normal lowercase">তাঁত ঐতিহ্য</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'craft' ? 'rotate-180' : ''}`} />
                  </button>
                  {openAccordion === 'craft' && (
                    <div className="pb-4 text-xs text-[#524B46] leading-relaxed space-y-2 bg-[#F3EFEA] p-3 rounded border border-[#E8DFC8]/60">
                      <p><strong>Artisan Cluster:</strong> {product.craftCluster}, Bengal Heritage Geographic Origin</p>
                      <p>
                        Woven or embroidered on traditional wooden pit-looms or frame-stretched embroidery addas. Each piece represents between 15 and 90 days of continuous master artisan labour with hand-spun yarns and natural dyes.
                      </p>
                      <p className="text-[11px] text-[#7B726B]">
                        ✓ Includes Maison Aura Authentic Bengal Handloom Certificate of Provenance with weaver guild registration.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 1: Product Description */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'description' ? ('' as any) : 'description')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1B1A]"
                >
                  <span>Garment Description & Details</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'description' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'description' && (
                  <div className="pb-4 text-xs text-[#524B46] leading-relaxed space-y-2">
                    <p>{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-[#7B726B]">
                      <li>Cut with precise French seams and hand-finished hems</li>
                      <li>Tailored to fluid contemporary proportions</li>
                      <li>Includes matching signature dustbag and cedar protective sachet</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Tab 2: Material & Fabric Care */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'materials' ? ('' as any) : 'materials')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1B1A]"
                >
                  <span>Material & Fabric Care</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'materials' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'materials' && (
                  <div className="pb-4 text-xs text-[#524B46] leading-relaxed space-y-2">
                    <p><strong>Primary Composition:</strong> {product.materials}</p>
                    <p><strong>Care Instructions:</strong> {product.careInstructions}</p>
                    <p className="text-[11px] text-[#8E8279]">
                      We recommend professional eco-friendly dry cleaning or gentle cool steam to protect fabric luster and natural weave structure.
                    </p>
                  </div>
                )}
              </div>

              {/* Tab 3: Fit & Model Specifications */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'fit' ? ('' as any) : 'fit')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1B1A]"
                >
                  <span>Fit & Model Measurements</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'fit' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'fit' && (
                  <div className="pb-4 text-xs text-[#524B46] leading-relaxed space-y-1.5">
                    <p><strong>Model Profile:</strong> {product.modelInfo}</p>
                    <p><strong>Fit Suggestion:</strong> Designed for an effortlessly draped fit. If in between sizes or desiring a structured silhouette, order one size down.</p>
                  </div>
                )}
              </div>

              {/* Tab 4: Shipping & Returns */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? ('' as any) : 'shipping')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-wider font-semibold text-[#1C1B1A]"
                >
                  <span>Complimentary Shipping & Returns</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pb-4 text-xs text-[#524B46] leading-relaxed space-y-2">
                    <p>Complimentary express shipping across India on orders above ₹2,999.</p>
                    <p>14-day boutique exchange policy. Return courier pickup is scheduled directly from your doorstep in original tags and packaging.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 2: COMPLETE THE LOOK / STYLED WITH */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#EDE7DF] mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E8279] font-medium">
            Stylist Atelier Pairing
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-normal mt-1">
            COMPLETE THE LOOK
          </h2>
          <p className="text-xs sm:text-sm text-[#7B726B] mt-1.5">
            Hand-curated accessories designed to harmonize with this silhouette.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {styledWithProducts.map(item => (
            <div key={item.id} className="bg-[#F3EFEA] p-4 flex flex-col justify-between border border-[#E8DFC8]">
              <div className="aspect-[4/5] bg-white overflow-hidden mb-3">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8E8279]">{item.category}</span>
                <h4 
                  onClick={() => navigateTo('product-detail', { productId: item.id })}
                  className="font-serif text-base text-[#1C1B1A] hover:text-[#8E8279] cursor-pointer"
                >
                  {item.name}
                </h4>
                <span className="text-sm font-semibold text-[#1C1B1A] mt-1 block">
                  {formatPrice(item.salePrice ?? item.price)}
                </span>
              </div>
              <button
                onClick={() => addToCart(item, item.sizes[0], item.colors[0], 1)}
                className="mt-4 w-full py-2.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#333130] transition-colors"
              >
                Add To Bag
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: REVIEWS & RATINGS */}
      <section id="reviews-section" className="py-20 bg-[#F9F7F4] border-t border-[#EDE7DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#EDE7DF] mb-10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8E8279] font-medium block mb-1">
                Verified Feedback
              </span>
              <h3 className="font-serif text-3xl text-[#1C1B1A]">
                Client Reviews ({product.reviewCount})
              </h3>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex text-[#C5A880]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#1C1B1A]">{product.rating} out of 5 stars</span>
              </div>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="mt-4 md:mt-0 px-6 py-3 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#333130]"
            >
              Write An Atelier Review
            </button>
          </div>

          {/* Review Submission Form */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="mb-12 p-6 bg-[#FAF8F5] border border-[#E8DFC8] max-w-xl mx-auto space-y-4">
              <h4 className="font-serif text-lg text-[#1C1B1A]">Write a Review for {product.name}</h4>
              <div>
                <label className="text-xs uppercase tracking-wider text-[#8E8279] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={reviewName}
                  onChange={e => setReviewName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-[#8E8279] block mb-1">Rating</label>
                <select
                  value={reviewRating}
                  onChange={e => setReviewRating(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-white border border-[#DDD5C9]"
                >
                  <option value={5}>5 Stars — Flawless Quality</option>
                  <option value={4}>4 Stars — Very Pleased</option>
                  <option value={3}>3 Stars — Average</option>
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-[#8E8279] block mb-1">Your Thoughts & Fit Comments</label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  placeholder="Describe the fabric feel, drape, and overall quality..."
                  className="w-full text-xs p-2.5 bg-white border border-[#DDD5C9] focus:outline-none focus:border-[#1C1B1A]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium"
              >
                Submit Review
              </button>
            </form>
          )}

          {/* Reviews list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Ananya S.',
                city: 'Mumbai',
                date: '2 weeks ago',
                rating: 5,
                title: 'The silk drape is sensational',
                comment: 'The weight of this silk exceeded all expectations. It falls effortlessly and does not wrinkle as easily as typical mulberry silk. Wore it to an evening gallery opening in Colaba and received countless compliments.'
              },
              {
                name: 'Devika M.',
                city: 'Delhi',
                date: '1 month ago',
                rating: 5,
                title: 'Impeccable tailoring and finish',
                comment: 'The French seam finishing inside is something usually only found in European haute couture houses. True to size with a comfortable modern ease.'
              },
              {
                name: 'Kavita R.',
                city: 'Bengaluru',
                date: 'Last month',
                rating: 5,
                title: 'The bespoke box and presentation!',
                comment: 'Arrived within 48 hours in the signature scented ivory box with personalized note card. A sublime luxury shopping experience.'
              }
            ].map((rev, i) => (
              <div key={i} className="p-6 bg-[#FAF8F5] border border-[#EDE7DF] space-y-3">
                <div className="flex items-center space-x-1 text-[#C5A880]">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <h5 className="font-serif text-base text-[#1C1B1A] font-medium">{rev.title}</h5>
                <p className="text-xs text-[#524B46] leading-relaxed">{rev.comment}</p>
                <div className="pt-2 text-[11px] text-[#8E8279] flex items-center justify-between border-t border-[#EDE7DF]">
                  <span>{rev.name} ({rev.city})</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: YOU MAY ALSO LOVE (Recommendations) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#EDE7DF]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#8E8279] font-medium">
            Curated Recommendations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1B1A] font-normal mt-1">
            YOU MAY ALSO ADORE
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
};
