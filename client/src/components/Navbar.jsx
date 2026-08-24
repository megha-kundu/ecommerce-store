import React from 'react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  Search, 
  User, 
  Heart, 
  Package,
  X,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory,
    setSelectedCategory,
    user,
    setIsAuthOpen,
    setIsOrdersOpen
  } = useStore();

  const { totalItems, setIsCartOpen, wishlist, setIsWishlistOpen } = useCart();

  const navLinks = [
    { label: 'Shop All', slug: 'all' },
    { label: 'Audio & Sound', slug: 'audio' },
    { label: 'Laptops', slug: 'laptops' },
    { label: 'Smartwatches', slug: 'wearables' },
    { label: 'Gaming', slug: 'gaming' },
    { label: 'Accessories', slug: 'accessories' }
  ];

  return (
    <>
      {/* Top Promotional Announcement Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #0284c7 0%, #6366f1 100%)',
        color: '#ffffff',
        padding: '0.45rem 1rem',
        fontSize: '0.78rem',
        fontWeight: 600,
        textAlign: 'center',
        letterSpacing: '0.02em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem'
      }}>
        <span>⚡ SUMMER SALE: Up to 30% OFF Flagship Gear | Free Shipping on Orders Over $100 | Use Code: <strong>NEXUS10</strong></span>
      </div>

      {/* Main Header */}
      <header className="glass-card" style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderRadius: 0,
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        padding: '0.9rem 1.5rem',
        background: 'rgba(9, 13, 22, 0.9)'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          {/* Logo & Commercial Brand Name */}
          <div 
            onClick={() => setSelectedCategory('all')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}
          >
            <div style={{
              background: 'var(--accent-gradient)',
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0f172a',
              fontWeight: 800
            }}>
              <ShoppingBag size={20} />
            </div>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '1.5rem', 
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              NEXUS
            </span>
          </div>

          {/* Navigation Links */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            fontSize: '0.88rem',
            fontWeight: 500
          }}>
            {navLinks.map(link => {
              const isActive = selectedCategory === link.slug;
              return (
                <button
                  key={link.slug}
                  onClick={() => setSelectedCategory(link.slug)}
                  style={{
                    background: 'none',
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 500,
                    padding: '0.25rem 0',
                    borderBottom: isActive ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Search & Utility Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', width: '220px' }}>
              <Search size={16} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '2.3rem',
                  paddingRight: searchQuery ? '2rem' : '0.75rem',
                  paddingTop: '0.45rem',
                  paddingBottom: '0.45rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  background: 'rgba(15, 23, 42, 0.7)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    color: 'var(--text-muted)'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* User Profile / Auth Trigger */}
            <button
              onClick={() => setIsAuthOpen(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)'
              }}
              title={user ? `Logged in as ${user.name}` : "Sign In / Register"}
            >
              {user ? (
                <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <User size={18} />
              )}
            </button>

            {/* My Orders Button */}
            <button
              onClick={() => setIsOrdersOpen(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
              title="My Orders & Track Packages"
            >
              <Package size={18} />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: wishlist.length > 0 ? '#ef4444' : 'var(--text-primary)',
                position: 'relative',
                cursor: 'pointer'
              }}
              title="Saved Wishlist"
            >
              <Heart size={18} fill={wishlist.length > 0 ? '#ef4444' : 'none'} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ef4444',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-primary"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '0.5rem 1.1rem',
                fontSize: '0.85rem'
              }}
            >
              <ShoppingBag size={18} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.1rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  marginLeft: '0.2rem'
                }}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
