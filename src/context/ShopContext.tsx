import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, WishlistItem, Order, ToastMessage, ProductColor } from '../types';
import { PRODUCTS } from '../data/products';

export type PageType = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-success' 
  | 'wishlist' 
  | 'account' 
  | 'tracking' 
  | 'returns' 
  | 'about' 
  | 'journal' 
  | 'article-detail' 
  | 'lookbook' 
  | 'stores' 
  | 'contact' 
  | 'faq' 
  | 'sale' 
  | 'admin';

interface NavigationParams {
  category?: string;
  collection?: string;
  tag?: string;
  productId?: string;
  articleId?: string;
  orderNumber?: string;
}

interface ShopContextType {
  currentPage: PageType;
  navParams: NavigationParams;
  navigateTo: (page: PageType, params?: NavigationParams) => void;
  
  // Products
  products: Product[];
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  freeShippingThreshold: number;
  isFreeShipping: boolean;
  amountToFreeShipping: number;
  
  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Recently Viewed
  recentlyViewed: Product[];
  
  // UI Overlays
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  sizeGuideCategory: string;
  setSizeGuideCategory: (category: string) => void;
  
  // Discounts & Promo
  promoCode: string;
  discountPercentage: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  discountAmount: number;
  cartTotal: number;
  
  // Orders
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>) => Order;
  trackOrderNumber: string;
  setTrackOrderNumber: (num: string) => void;
  
  // Toast notifications
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Utilities
  formatPrice: (amount: number) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 2999;

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [navParams, setNavParams] = useState<NavigationParams>({});
  const [products] = useState<Product[]>(PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  
  // Overlays
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [sizeGuideCategory, setSizeGuideCategory] = useState<string>('Dresses');
  
  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Promo code
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_aura_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 'prod-1-Warm-Ivory-S',
          productId: 'prod-1',
          product: PRODUCTS[0],
          selectedColor: PRODUCTS[0].colors[0],
          selectedSize: 'S',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_aura_wishlist');
      return saved ? JSON.parse(saved) : [
        {
          productId: 'prod-4',
          product: PRODUCTS[3],
          addedAt: new Date().toISOString()
        },
        {
          productId: 'prod-2',
          product: PRODUCTS[1],
          addedAt: new Date().toISOString()
        }
      ];
    } catch {
      return [];
    }
  });

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    return [PRODUCTS[0], PRODUCTS[1], PRODUCTS[3], PRODUCTS[4]];
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    return [
      {
        id: 'ord-1092',
        orderNumber: 'MA-928471',
        date: '2026-08-28',
        status: 'Delivered',
        items: [
          {
            productId: 'prod-1',
            name: 'Silk Draped Midi Dress',
            price: 12500,
            quantity: 1,
            size: 'S',
            color: 'Warm Ivory',
            image: PRODUCTS[0].images[0]
          }
        ],
        subtotal: 12500,
        shipping: 0,
        discount: 1250,
        total: 11250,
        shippingAddress: {
          fullName: 'Aanya Sen',
          email: 'aanya.sen@example.com',
          phone: '+91 98200 12345',
          address: '42 Marine Drive, Sea Face Apartments',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400020',
          country: 'India'
        },
        paymentMethod: 'UPI (GPay)',
        trackingNumber: 'BLUEDART-88291039',
        carrier: 'Blue Dart Express',
        estimatedDelivery: 'August 31, 2026'
      },
      {
        id: 'ord-1093',
        orderNumber: 'MA-931048',
        date: '2026-09-08',
        status: 'Shipped',
        items: [
          {
            productId: 'prod-4',
            name: 'Structured Leather Handbag',
            price: 18900,
            quantity: 1,
            size: 'One Size',
            color: 'Muted Espresso',
            image: PRODUCTS[3].images[0]
          },
          {
            productId: 'prod-5',
            name: 'Minimal Gold Hoops',
            price: 4200,
            quantity: 1,
            size: 'One Size',
            color: '18k Yellow Gold',
            image: PRODUCTS[4].images[0]
          }
        ],
        subtotal: 23100,
        shipping: 0,
        discount: 0,
        total: 23100,
        shippingAddress: {
          fullName: 'Aanya Sen',
          email: 'aanya.sen@example.com',
          phone: '+91 98200 12345',
          address: '42 Marine Drive, Sea Face Apartments',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400020',
          country: 'India'
        },
        paymentMethod: 'Credit Card (HDFC Regalia)',
        trackingNumber: 'DELHIVERY-99482103',
        carrier: 'Delhivery Surface Premium',
        estimatedDelivery: 'September 13, 2026'
      }
    ];
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [trackOrderNumber, setTrackOrderNumber] = useState<string>('MA-931048');

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maison_aura_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('maison_aura_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (page: PageType, params?: NavigationParams) => {
    setCurrentPage(page);
    if (params) {
      setNavParams(params);
      if (params.productId) {
        const found = products.find(p => p.id === params.productId);
        if (found) {
          setSelectedProduct(found);
          // add to recently viewed
          setRecentlyViewed(prev => {
            const filtered = prev.filter(p => p.id !== found.id);
            return [found, ...filtered].slice(0, 8);
          });
        }
      }
      if (params.articleId) {
        setSelectedArticleId(params.articleId);
      }
      if (params.orderNumber) {
        setTrackOrderNumber(params.orderNumber);
      }
    } else {
      setNavParams({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, size: string, color: ProductColor, quantity = 1) => {
    const itemId = `${product.id}-${color.name.replace(/\s+/g, '-')}-${size}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity
        }
      ];
    });
    addToast(
      'Added to Bag',
      `${product.name} (${size}, ${color.name}) has been added to your shopping bag.`,
      'success'
    );
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    addToast('Item Removed', 'The selection was removed from your bag.', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some(item => item.productId === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.productId !== product.id));
      addToast('Removed from Wishlist', `${product.name} removed from your saved items.`, 'info');
    } else {
      setWishlist(prev => [
        ...prev,
        {
          productId: product.id,
          product,
          addedAt: new Date().toISOString()
        }
      ]);
      addToast('Added to Wishlist', `${product.name} saved to your wishlist.`, 'success');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.productId === productId);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cart.reduce((total, item) => {
    const itemPrice = item.product.salePrice ?? item.product.price;
    return total + itemPrice * item.quantity;
  }, 0);

  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AURA10') {
      setPromoCode('AURA10');
      setDiscountPercentage(10);
      addToast('Code Applied', '10% privilege discount applied to your order.', 'success');
      return { success: true, message: '10% privilege discount applied!' };
    }
    if (clean === 'WELCOME20') {
      setPromoCode('WELCOME20');
      setDiscountPercentage(20);
      addToast('Welcome Offer Applied', '20% boutique premiere discount applied.', 'success');
      return { success: true, message: '20% premiere discount applied!' };
    }
    if (clean === 'INNERCIRCLE') {
      setPromoCode('INNERCIRCLE');
      setDiscountPercentage(15);
      addToast('Inner Circle Privilege', '15% private member discount applied.', 'success');
      return { success: true, message: '15% inner circle discount applied!' };
    }
    return { success: false, message: 'Invalid or expired promotional code.' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercentage(0);
    addToast('Code Removed', 'Promotional code has been cleared.', 'info');
  };

  const discountAmount = Math.round((cartSubtotal * discountPercentage) / 100);
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date' | 'status'>): Order => {
    const orderNumber = `MA-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toISOString().split('T')[0],
      status: 'Order Placed',
      carrier: 'Blue Dart Luxury Express',
      trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    setTrackOrderNumber(orderNumber);
    clearCart();
    return newOrder;
  };

  const formatPrice = (amount: number): string => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        navParams,
        navigateTo,
        products,
        selectedProduct,
        setSelectedProduct,
        selectedArticleId,
        setSelectedArticleId,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        isFreeShipping,
        amountToFreeShipping,
        wishlist,
        toggleWishlist,
        isInWishlist,
        recentlyViewed,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        sizeGuideCategory,
        setSizeGuideCategory,
        promoCode,
        discountPercentage,
        applyPromoCode,
        removePromoCode,
        discountAmount,
        cartTotal,
        orders,
        currentOrder,
        placeOrder,
        trackOrderNumber,
        setTrackOrderNumber,
        toasts,
        addToast,
        removeToast,
        formatPrice
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
