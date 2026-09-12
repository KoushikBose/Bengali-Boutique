export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  userImage?: string;
  fitRating?: 'Runs small' | 'True to size' | 'Runs large';
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  bengaliName?: string;
  slug: string;
  tagline?: string;
  description: string;
  category: 'Dresses' | 'Tops' | 'Shirts & Blouses' | 'Trousers' | 'Skirts' | 'Co-ords' | 'Outerwear' | 'Handbags' | 'Shoes' | 'Jewellery' | 'Accessories' | 'Sarees & Drapes' | 'Kurtas & Tunics' | 'Heritage Layers';
  collection: 'Spring Edit' | 'Evening Edit' | 'Everyday Essentials' | 'Vacation Collection' | 'Festive Collection' | 'Signature Collection' | 'Sharodutsav Edit' | 'Jamdani Atelier' | 'Shantiniketan Edit' | 'Bonedi Bari Couture';
  price: number;
  salePrice?: number;
  currency: string;
  craftCluster?: string;
  images: string[];
  hoverImage?: string;
  videoUrl?: string;
  colors: ProductColor[];
  sizes: string[];
  inventory: number;
  materials: string;
  composition: string;
  careInstructions: string;
  fit: string;
  modelInfo: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  isEditorsPick?: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string; // unique item id based on product id + size + color
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Order Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Fashion' | 'Styling' | 'Trends' | 'Lifestyle' | 'Behind the Brand' | 'Guides';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  heroImage: string;
  content: string[];
  quote?: {
    text: string;
    author: string;
  };
  relatedProductIds: string[];
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  hours: string;
  image: string;
  features: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  season: string;
  image: string;
  taggedProductIds: string[];
  hotspots?: {
    x: number; // percentage from left
    y: number; // percentage from top
    productId: string;
  }[];
}

export interface FilterState {
  category: string[];
  size: string[];
  color: string[];
  priceRange: string[];
  collection: string[];
  availability: string[];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  searchQuery?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}
