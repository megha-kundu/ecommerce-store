import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // User Auth & Modals
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [role, setRole] = useState('shopper');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  // Fetch Products & Categories
  const loadStoreData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.getProducts({
          category: selectedCategory,
          search: searchQuery,
          sort: sortBy
        }),
        api.getCategories()
      ]);

      if (prodRes.success) setProducts(prodRes.data);
      if (catRes.success) setCategories(catRes.data);
      setError(null);
    } catch (err) {
      console.error("Failed to load store data:", err);
      setError("Unable to connect to the store API backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStoreData();
  }, [selectedCategory, searchQuery, sortBy]);

  const refreshProducts = () => loadStoreData();

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      loading,
      error,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      sortBy,
      setSortBy,
      selectedProduct,
      setSelectedProduct,
      user,
      setUser,
      isAuthOpen,
      setIsAuthOpen,
      isVideoOpen,
      setIsVideoOpen,
      isOrdersOpen,
      setIsOrdersOpen,
      role,
      setRole,
      isCheckoutOpen,
      setIsCheckoutOpen,
      completedOrder,
      setCompletedOrder,
      refreshProducts
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
