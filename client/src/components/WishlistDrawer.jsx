import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export default function WishlistDrawer() {
  const { wishlist, toggleWishlist, addToCart, isWishlistOpen, setIsWishlistOpen } = useCart();
  const { setSelectedProduct } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsWishlistOpen(false)}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '420px',
          borderRadius: 0,
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid var(--border-glow)',
          animation: 'slideLeft 0.25s ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={20} fill="#ef4444" style={{ color: '#ef4444' }} />
            <h3 style={{ fontSize: '1.2rem' }}>Saved Wishlist ({wishlist.length})</h3>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            style={{ background: 'none', color: 'var(--text-muted)', display: 'flex' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <Heart size={48} style={{ opacity: 0.3, marginBottom: '1rem', color: '#ef4444' }} />
              <p style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Your wishlist is empty</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                Click the heart icon on any product to save it to your wishlist.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {wishlist.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  alignItems: 'center'
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '65px', height: '65px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                    onClick={() => { setSelectedProduct(item); setIsWishlistOpen(false); }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 
                      onClick={() => { setSelectedProduct(item); setIsWishlistOpen(false); }}
                      style={{ fontSize: '0.88rem', lineHeight: 1.3, cursor: 'pointer', marginBottom: '0.35rem' }}
                    >
                      {item.name}
                    </h4>
                    <span style={{ fontWeight: 700, color: 'var(--accent-cyan)', fontSize: '0.95rem' }}>
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <button
                      onClick={() => { addToCart(item); toggleWishlist(item); }}
                      className="btn-primary"
                      style={{ padding: '0.4rem 0.65rem', fontSize: '0.78rem' }}
                      title="Move to Cart"
                    >
                      <ShoppingBag size={14} />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      style={{ background: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
