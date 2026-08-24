import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const VALID_PROMOS = {
  'NEXUS10': 0.10,
  'SAVE20': 0.20,
  'WELCOME': 15.00
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Persist cart & wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('nexus_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nexus_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart Operations
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIdx].quantity + quantity;
        updated[existingIdx].quantity = Math.min(newQty, product.stock || 99);
        return updated;
      }
      return [...prevCart, { ...product, quantity: Math.min(quantity, product.stock || 99) }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscount(0);
    setPromoSuccess('');
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };

  // Coupon Code Handler
  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return;

    if (VALID_PROMOS[cleanCode]) {
      const val = VALID_PROMOS[cleanCode];
      setPromoCode(cleanCode);
      setPromoError('');
      if (val < 1) {
        setPromoSuccess(`${val * 100}% Discount Applied!`);
      } else {
        setPromoSuccess(`$${val} Discount Applied!`);
      }
    } else {
      setPromoError('Invalid Promo Code (Try NEXUS10 or SAVE20)');
      setPromoSuccess('');
    }
  };

  // Financial Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let calculatedDiscount = 0;
  if (promoCode && VALID_PROMOS[promoCode]) {
    const val = VALID_PROMOS[promoCode];
    if (val < 1) {
      calculatedDiscount = subtotal * val;
    } else {
      calculatedDiscount = Math.min(val, subtotal);
    }
  }

  const shipping = subtotal > 100 || cart.length === 0 ? 0 : 12.50;
  const tax = (subtotal - calculatedDiscount) * 0.08;
  const grandTotal = Math.max(0, subtotal - calculatedDiscount + shipping + tax);
  const totalItems = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      isCartOpen,
      setIsCartOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      toggleWishlist,
      promoCode,
      applyPromoCode,
      promoError,
      promoSuccess,
      subtotal,
      discount: calculatedDiscount,
      shipping,
      tax,
      grandTotal,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
