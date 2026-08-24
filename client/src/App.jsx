import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import WishlistDrawer from './components/WishlistDrawer';
import VideoModal from './components/VideoModal';
import OrdersModal from './components/OrdersModal';
import Footer from './components/Footer';

function MainApp() {
  const { role } = useStore();

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {role === 'shopper' ? (
          <>
            <HeroBanner />
            <ProductGrid />
          </>
        ) : (
          <AdminDashboard />
        )}
      </main>

      {/* Global Modals & Overlays */}
      <ProductModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <AuthModal />
      <VideoModal />
      <OrdersModal />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </StoreProvider>
  );
}
