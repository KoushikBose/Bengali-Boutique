import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  X, 
  ChevronDown, 
  SlidersHorizontal, 
  Grid3X3, 
  Grid2X2, 
  LayoutGrid, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    filterCategory, 
    filterCollection, 
    filterTag, 
    navigateTo, 
    formatPrice,
    setFilterCategory,
    setFilterCollection,
    setFilterTag
  } = useShop();

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(filterCategory || 'All');
  const [selectedCluster, setSelectedCluster] = useState<string>('All');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 45000]);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlySale, setOnlySale] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [gridColumns, setGridColumns] = useState<3 | 4 | 2>(4);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync global filters with local state
  useEffect(() => {
    if (filterCategory) setSelectedCategory(filterCategory);
  }, [filterCategory]);

  const categories = [
    'All',
    'Sarees',
    'Clothing',
    'Dresses',
    'Tops',
    'Shirts & Blouses',
    'Trousers',
    'Skirts',
    'Co-ords',
    'Outerwear',
    'Handbags',
    'Shoes',
    'Jewellery',
    'Accessories'
  ];

  const craftClusters = [
    { label: 'All Bengal Guilds', value: 'All', ben: 'সকল তাঁত' },
    { label: 'Dhakai Jamdani', value: 'Dhakai Jamdani', ben: 'ঢাকা' },
    { label: 'Murshidabad Silk', value: 'Murshidabad', ben: 'মুর্শিদাবাদ' },
    { label: 'Shantiniketan Kantha', value: 'Shantiniketan', ben: 'শান্তিনিকেতন' },
    { label: 'Bishnupur Baluchari', value: 'Baluchari', ben: 'বিষ্ণুপুর' },
    { label: 'Dhaniakhali Muslin', value: 'Dhaniakhali', ben: 'ধনেখালি' },
    { label: 'Bankura Dokra Brass', value: 'Dokra', ben: 'বাঁকুড়া' }
  ];

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', '36', '37', '38', '39', '40', 'One Size'];

  const allColors = [
    { name: 'Ivory', hex: '#FAF7F2' },
    { name: 'Alta Crimson', hex: '#9E2A2B' },
    { name: 'Tussar Gold', hex: '#C5A880' },
    { name: 'Charcoal', hex: '#262423' },
    { name: 'Muted Taupe', hex: '#9E8E81' },
    { name: 'Olive', hex: '#585C4B' },
    { name: 'Terracotta', hex: '#B85E42' },
    { name: 'Navy', hex: '#1C2833' },
    { name: 'Champagne', hex: '#DFCFBE' },
    { name: 'Burgundy', hex: '#5A1B28' },
    { name: 'Kora Cream', hex: '#F4ECE1' }
  ];

  const allMaterials = [
    'Dhakai Muslin Cotton',
    'Murshidabad Mulberry Silk',
    'Tussar Silk',
    'Pure Kantha Silk',
    'Mulberry Silk',
    'Belgian Linen',
    'Lost-Wax Cast Dokra Brass',
    'Shantiniketan Embossed Leather',
    'Pure Cashmere',
    '18k Gold Vermeil',
    'Cotton Poplin'
  ];

  const toggleSize = (sz: string) => {
    setSelectedSizes(prev => 
      prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz]
    );
  };

  const toggleColor = (col: string) => {
    setSelectedColors(prev =>
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials(prev =>
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedCluster('All');
    setFilterCategory(null);
    setFilterCollection(null);
    setFilterTag(null);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedMaterials([]);
    setPriceRange([0, 45000]);
    setOnlyInStock(false);
    setOnlySale(false);
  };

  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) +
    (selectedCluster !== 'All' ? 1 : 0) +
    (filterCollection ? 1 : 0) +
    (filterTag ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    selectedMaterials.length +
    (priceRange[1] < 45000 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlySale ? 1 : 0);

  // Filtering and Sorting Pipeline
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Clothing') {
          if (!['Dresses', 'Tops', 'Shirts & Blouses', 'Trousers', 'Skirts', 'Co-ords', 'Outerwear'].includes(p.category)) {
            return false;
          }
        } else if (selectedCategory === 'Sarees') {
          const isSaree = p.category === 'Sarees' || 
            p.tags.some(t => ['Saree', 'Saris', 'Drapes', 'Jamdani', 'Garad', 'Baluchari'].includes(t)) ||
            p.name.toLowerCase().includes('saree') ||
            (p.bengaliName && (p.bengaliName.includes('শাড়ি') || p.bengaliName.includes('সিল্ক')));
          if (!isSaree) return false;
        } else if (p.category !== selectedCategory) {
          return false;
        }
      }

      // Bengal Craft Cluster
      if (selectedCluster !== 'All') {
        const clusterMatch = p.craftCluster && p.craftCluster.toLowerCase().includes(selectedCluster.toLowerCase());
        const tagMatch = p.tags.some(t => t.toLowerCase().includes(selectedCluster.toLowerCase()));
        const nameMatch = p.name.toLowerCase().includes(selectedCluster.toLowerCase());
        if (!clusterMatch && !tagMatch && !nameMatch) {
          return false;
        }
      }

      // Collection
      if (filterCollection && p.collection !== filterCollection) {
        return false;
      }

      // Tag
      if (filterTag) {
        const lowerTag = filterTag.toLowerCase();
        const matchesTag = p.tags.some(t => t.toLowerCase().includes(lowerTag)) ||
          p.name.toLowerCase().includes(lowerTag) ||
          (p.bengaliName && p.bengaliName.toLowerCase().includes(lowerTag)) ||
          (p.craftCluster && p.craftCluster.toLowerCase().includes(lowerTag)) ||
          p.materials.toLowerCase().includes(lowerTag) ||
          p.category.toLowerCase().includes(lowerTag);
        if (!matchesTag) return false;
      }

      // Sizes
      if (selectedSizes.length > 0) {
        const hasSize = p.sizes.some(s => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Colors
      if (selectedColors.length > 0) {
        const hasColor = p.colors.some(c => 
          selectedColors.some(sc => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      // Materials
      if (selectedMaterials.length > 0) {
        const hasMaterial = selectedMaterials.some(m =>
          p.materials.toLowerCase().includes(m.toLowerCase())
        );
        if (!hasMaterial) return false;
      }

      // Price Range
      const effectivePrice = p.salePrice ?? p.price;
      if (effectivePrice < priceRange[0] || effectivePrice > priceRange[1]) {
        return false;
      }

      // Stock
      if (onlyInStock && !p.inStock) {
        return false;
      }

      // Sale
      if (onlySale && !p.salePrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.price;
      const priceB = b.salePrice ?? b.price;

      switch (sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        case 'bestseller':
          return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
        case 'featured':
        default:
          return 0;
      }
    });
  }, [
    products, 
    selectedCategory, 
    selectedCluster,
    filterCollection, 
    filterTag, 
    selectedSizes, 
    selectedColors, 
    selectedMaterials, 
    priceRange, 
    onlyInStock, 
    onlySale, 
    sortBy
  ]);

  return (
    <div id="shop-page-root" className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* 1. COLLECTION HEADER BANNER (Section 18) */}
      <div className="bg-[#F3EFEA] border-b border-[#E8DFC8] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-[11px] uppercase tracking-[0.3em] text-[#9E2A2B] mb-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="font-bengali text-xs">বাংলার ঐতিহ্যবাহী তাঁত ও কারুশিল্প</span>
            <span>•</span>
            <span>
              {filterCollection || (filterTag ? `Search: ${filterTag}` : 'The Bengal Handloom Atelier')}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1C1B1A] uppercase tracking-tight">
            {selectedCategory === 'All' ? (filterCollection || 'All Bengal Masterpieces') : selectedCategory}
          </h1>

          <p className="text-xs sm:text-sm text-[#7B726B] max-w-xl mx-auto mt-3 font-light leading-relaxed">
            Directly from master weavers in Murshidabad, Nadia, Bishnupur, and Shantiniketan. Each drape and garment honors centuries of living textile heritage with contemporary boutique refinement.
          </p>

          <span className="inline-block mt-4 text-xs uppercase tracking-widest text-[#8E8279] font-medium">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Garment' : 'Garments Available'}
          </span>
        </div>
      </div>

      {/* 2. CONTROLS BAR (Sort, View Mode, Filter Toggle) */}
      <div className="sticky top-[69px] z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EDE7DF] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Mobile Filter trigger & active count */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden px-3 py-1.5 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium flex items-center space-x-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            <span className="hidden lg:inline text-xs uppercase tracking-widest text-[#8E8279]">
              Showing <strong className="text-[#1C1B1A]">{filteredProducts.length}</strong> creations
            </span>
          </div>

          {/* Right: Sort and Grid Layout */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Sort select */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="hidden sm:inline text-[#8E8279] uppercase tracking-wider text-[11px]">Sort By:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="bg-white border border-[#DDD5C9] text-xs py-1.5 px-3 text-[#1C1B1A] focus:outline-none focus:border-[#1C1B1A] cursor-pointer"
              >
                <option value="featured">Featured Edit</option>
                <option value="newest">Newest Drops</option>
                <option value="bestseller">Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Desktop Grid Switcher */}
            <div className="hidden lg:flex items-center space-x-1 border border-[#DDD5C9] bg-white p-0.5 rounded-xs">
              <button
                onClick={() => setGridColumns(2)}
                className={`p-1.5 ${gridColumns === 2 ? 'bg-[#1C1B1A] text-white' : 'text-[#8E8279] hover:text-[#1C1B1A]'}`}
                title="2 Columns (Editorial Big)"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(3)}
                className={`p-1.5 ${gridColumns === 3 ? 'bg-[#1C1B1A] text-white' : 'text-[#8E8279] hover:text-[#1C1B1A]'}`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`p-1.5 ${gridColumns === 4 ? 'bg-[#1C1B1A] text-white' : 'text-[#8E8279] hover:text-[#1C1B1A]'}`}
                title="4 Columns (Compact)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="max-w-7xl mx-auto pt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] uppercase tracking-wider text-[#8E8279]">Active Filters:</span>
            {selectedCategory !== 'All' && (
              <span className="inline-flex items-center px-2.5 py-1 bg-[#F3EFEA] border border-[#DDD5C9] text-[#1C1B1A]">
                Category: {selectedCategory}
                <X className="w-3 h-3 ml-1.5 cursor-pointer hover:text-black" onClick={() => setSelectedCategory('All')} />
              </span>
            )}
            {selectedCluster !== 'All' && (
              <span className="inline-flex items-center px-2.5 py-1 bg-[#F3EFEA] border border-[#DDD5C9] text-[#9E2A2B] font-medium">
                Guild: {selectedCluster}
                <X className="w-3 h-3 ml-1.5 cursor-pointer hover:text-black" onClick={() => setSelectedCluster('All')} />
              </span>
            )}
            {filterCollection && (
              <span className="inline-flex items-center px-2.5 py-1 bg-[#F3EFEA] border border-[#DDD5C9] text-[#1C1B1A]">
                Collection: {filterCollection}
                <X className="w-3 h-3 ml-1.5 cursor-pointer hover:text-black" onClick={() => setFilterCollection(null)} />
              </span>
            )}
            {filterTag && (
              <span className="inline-flex items-center px-2.5 py-1 bg-[#F3EFEA] border border-[#DDD5C9] text-[#1C1B1A]">
                Tag: {filterTag}
                <X className="w-3 h-3 ml-1.5 cursor-pointer hover:text-black" onClick={() => setFilterTag(null)} />
              </span>
            )}
            {selectedSizes.map(sz => (
              <span key={sz} className="inline-flex items-center px-2.5 py-1 bg-[#F3EFEA] border border-[#DDD5C9] text-[#1C1B1A]">
                Size: {sz}
                <X className="w-3 h-3 ml-1.5 cursor-pointer" onClick={() => toggleSize(sz)} />
              </span>
            ))}
            {selectedColors.map(col => (
              <span key={col} className="inline-flex items-center px-2.5 py-1 bg-[#F3EFEA] border border-[#DDD5C9] text-[#1C1B1A]">
                Color: {col}
                <X className="w-3 h-3 ml-1.5 cursor-pointer" onClick={() => toggleColor(col)} />
              </span>
            ))}
            {selectedMaterials.map(mat => (
              <span key={mat} className="inline-flex items-center px-2.5 py-1 bg-[#F3EFEA] border border-[#DDD5C9] text-[#1C1B1A]">
                Material: {mat}
                <X className="w-3 h-3 ml-1.5 cursor-pointer" onClick={() => toggleMaterial(mat)} />
              </span>
            ))}
            {onlyInStock && (
              <span className="inline-flex items-center px-2.5 py-1 bg-[#F3EFEA] border border-[#DDD5C9] text-[#1C1B1A]">
                In Stock Only
                <X className="w-3 h-3 ml-1.5 cursor-pointer" onClick={() => setOnlyInStock(false)} />
              </span>
            )}
            {onlySale && (
              <span className="inline-flex items-center px-2.5 py-1 bg-[#F3EFEA] border border-[#DDD5C9] text-[#1C1B1A]">
                On Sale
                <X className="w-3 h-3 ml-1.5 cursor-pointer" onClick={() => setOnlySale(false)} />
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-[#9A3412] hover:underline uppercase text-[11px] font-semibold tracking-wider ml-2 flex items-center"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* 3. MAIN CATALOG LAYOUT (Sidebar + Products Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Left Sidebar Filters (Section 20) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4">
            
            {/* Bengal Craft Guild Filter */}
            <div className="bg-[#F8F5F0] p-4 border border-[#E8DFC8] rounded-xs">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9E2A2B] mb-2 flex items-center justify-between">
                <span>Bengal Craft Guild</span>
                <span className="font-bengali text-[11px] text-[#7B726B]">তাঁত শিল্প</span>
              </h4>
              <ul className="space-y-1 text-xs text-[#524B46]">
                {craftClusters.map(cluster => (
                  <li key={cluster.value}>
                    <button
                      onClick={() => setSelectedCluster(cluster.value)}
                      className={`w-full text-left py-1 flex items-center justify-between transition-colors ${
                        selectedCluster === cluster.value ? 'font-semibold text-[#9E2A2B]' : 'hover:text-[#1C1B1A]'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5">
                        <span>{cluster.label}</span>
                        <span className="font-bengali text-[10px] text-[#8E8279]">({cluster.ben})</span>
                      </div>
                      {selectedCluster === cluster.value && <span className="w-1.5 h-1.5 rounded-full bg-[#9E2A2B]" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1B1A] mb-3 pb-2 border-b border-[#EDE7DF]">
                Category
              </h4>
              <ul className="space-y-1.5 text-xs text-[#524B46]">
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left py-1 flex items-center justify-between transition-colors ${
                        selectedCategory === cat ? 'font-semibold text-[#1C1B1A]' : 'hover:text-[#1C1B1A]'
                      }`}
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#1C1B1A]" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Filter */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1B1A] mb-3 pb-2 border-b border-[#EDE7DF]">
                Size
              </h4>
              <div className="grid grid-cols-4 gap-1.5">
                {allSizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => toggleSize(sz)}
                    className={`py-1.5 text-xs font-medium border transition-colors ${
                      selectedSizes.includes(sz)
                        ? 'bg-[#1C1B1A] text-[#FAF8F5] border-[#1C1B1A]'
                        : 'bg-white text-[#524B46] border-[#DDD5C9] hover:border-[#1C1B1A]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches Filter */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1B1A] mb-3 pb-2 border-b border-[#EDE7DF]">
                Color
              </h4>
              <div className="flex flex-wrap gap-2">
                {allColors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => toggleColor(c.name)}
                    title={c.name}
                    className={`w-6 h-6 rounded-full border transition-all ${
                      selectedColors.includes(c.name)
                        ? 'ring-2 ring-[#1C1B1A] ring-offset-2 scale-110'
                        : 'border-[#DDD5C9] opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Materials Filter */}
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1B1A] mb-3 pb-2 border-b border-[#EDE7DF]">
                Fabric & Material
              </h4>
              <ul className="space-y-1.5 text-xs text-[#524B46]">
                {allMaterials.map(mat => (
                  <li key={mat}>
                    <label className="flex items-center space-x-2 cursor-pointer hover:text-[#1C1B1A]">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(mat)}
                        onChange={() => toggleMaterial(mat)}
                        className="rounded-xs border-[#DDD5C9] text-[#1C1B1A] focus:ring-0"
                      />
                      <span>{mat}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#EDE7DF]">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#1C1B1A]">
                  Max Price
                </h4>
                <span className="text-xs font-semibold text-[#1C1B1A]">
                  {formatPrice(priceRange[1])}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="45000"
                step="1000"
                value={priceRange[1]}
                onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-[#1C1B1A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8E8279] mt-1">
                <span>{formatPrice(2000)}</span>
                <span>{formatPrice(45000)}</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center space-x-2 text-xs text-[#1C1B1A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={e => setOnlyInStock(e.target.checked)}
                  className="rounded-xs border-[#DDD5C9] text-[#1C1B1A] focus:ring-0"
                />
                <span>In Stock items only</span>
              </label>

              <label className="flex items-center space-x-2 text-xs text-[#1C1B1A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={e => setOnlySale(e.target.checked)}
                  className="rounded-xs border-[#DDD5C9] text-[#1C1B1A] focus:ring-0"
                />
                <span className="text-[#9A3412] font-medium">On Sale items only</span>
              </label>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-[#F3EFEA] border border-[#E8DFC8] p-8">
                <Sparkles className="w-8 h-8 text-[#8E8279] mx-auto mb-3" />
                <h3 className="font-serif text-2xl text-[#1C1B1A]">No garments match your filters</h3>
                <p className="text-xs text-[#7B726B] mt-2 max-w-sm mx-auto">
                  Try adjusting or clearing your size, color, or fabric preferences to view the atelier catalog.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-6 py-3 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-medium hover:bg-[#322F2D]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12 ${
                gridColumns === 2 
                  ? 'grid-cols-1 sm:grid-cols-2' 
                  : gridColumns === 3 
                    ? 'grid-cols-2 md:grid-cols-3' 
                    : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 4. MOBILE FILTERS DRAWER */}
      {isMobileFiltersOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-sm bg-[#FAF8F5] h-full flex flex-col justify-between p-6 shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EDE7DF]">
                <h3 className="font-serif text-xl text-[#1C1B1A]">Refine Selection</h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-1 text-[#1C1B1A]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Bengal Craft Guild (Mobile) */}
              <div className="py-4 border-b border-[#EDE7DF] bg-[#F8F5F0] -mx-6 px-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#9E2A2B] font-semibold">Bengal Craft Guild</h4>
                  <span className="font-bengali text-[11px] text-[#7B726B]">তাঁত শিল্প</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {craftClusters.map(cluster => (
                    <button
                      key={cluster.value}
                      onClick={() => setSelectedCluster(cluster.value)}
                      className={`text-xs px-2.5 py-1 border transition-colors ${
                        selectedCluster === cluster.value
                          ? 'bg-[#9E2A2B] text-white border-[#9E2A2B]'
                          : 'bg-white text-[#1C1B1A] border-[#DDD5C9]'
                      }`}
                    >
                      <span>{cluster.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="py-4 border-b border-[#EDE7DF]">
                <h4 className="text-xs uppercase tracking-widest text-[#8E8279] mb-2 font-semibold">Category</h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-2.5 py-1 border ${
                        selectedCategory === cat
                          ? 'bg-[#1C1B1A] text-white border-[#1C1B1A]'
                          : 'bg-white text-[#1C1B1A] border-[#DDD5C9]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="py-4 border-b border-[#EDE7DF]">
                <h4 className="text-xs uppercase tracking-widest text-[#8E8279] mb-2 font-semibold">Size</h4>
                <div className="flex flex-wrap gap-1.5">
                  {allSizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => toggleSize(sz)}
                      className={`text-xs min-w-[36px] py-1 border ${
                        selectedSizes.includes(sz)
                          ? 'bg-[#1C1B1A] text-white border-[#1C1B1A]'
                          : 'bg-white text-[#1C1B1A] border-[#DDD5C9]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="py-4 border-b border-[#EDE7DF]">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#8E8279] uppercase tracking-wider">Max Price</span>
                  <span className="font-semibold">{formatPrice(priceRange[1])}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="45000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-[#1C1B1A]"
                />
              </div>

              {/* In Stock & Sale */}
              <div className="py-4 space-y-2 text-xs">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={e => setOnlyInStock(e.target.checked)}
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={onlySale}
                    onChange={e => setOnlySale(e.target.checked)}
                  />
                  <span>On Sale Only</span>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDE7DF] space-y-2">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-[#1C1B1A] text-[#FAF8F5] text-xs uppercase tracking-widest font-semibold"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={clearAllFilters}
                className="w-full py-2 bg-transparent text-xs text-[#8E8279] uppercase tracking-wider underline"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
