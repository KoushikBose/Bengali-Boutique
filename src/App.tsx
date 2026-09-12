import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';

// Layout Components
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { FloatingConcierge } from './components/layout/FloatingConcierge';
import { CookieBanner } from './components/layout/CookieBanner';

// Common Modals & Overlays
import { QuickViewModal } from './components/common/QuickViewModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { SearchOverlay } from './components/common/SearchOverlay';
import { CartDrawer } from './components/common/CartDrawer';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ReturnsPage } from './pages/ReturnsPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { LookbookPage } from './pages/LookbookPage';
import { StoreLocatorPage } from './pages/StoreLocatorPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { SalePage } from './pages/SalePage';
import { WishlistPage } from './pages/WishlistPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { currentPage } = useShop();

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const isCheckout = currentPage === 'checkout';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1B1A] font-sans selection:bg-[#E8DFC8] selection:text-[#1C1B1A] relative">
      
      {/* Toast Notifications */}
      <ToastContainer />

      {/* Global Modals & Drawers */}
      <SearchOverlay />
      <CartDrawer />
      <QuickViewModal />
      <SizeGuideModal />

      {/* Top Bars (Hidden during focused Checkout) */}
      {!isCheckout && (
        <>
          <AnnouncementBar />
          <Header />
        </>
      )}

      {/* Main Page Router */}
      <main className="flex-grow">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
        {currentPage === 'account' && <AccountPage />}
        {currentPage === 'tracking' && <OrderTrackingPage />}
        {currentPage === 'returns' && <ReturnsPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'journal' && <JournalPage />}
        {currentPage === 'lookbook' && <LookbookPage />}
        {currentPage === 'stores' && <StoreLocatorPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'faq' && <FAQPage />}
        {currentPage === 'sale' && <SalePage />}
        {currentPage === 'wishlist' && <WishlistPage />}
        {currentPage === 'admin' && <AdminDashboardPage />}
      </main>

      {/* Global Footer & Mobile Navigation (Hidden during Checkout) */}
      {!isCheckout && (
        <>
          <Footer />
          <MobileNav />
          <FloatingConcierge />
          <CookieBanner />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
