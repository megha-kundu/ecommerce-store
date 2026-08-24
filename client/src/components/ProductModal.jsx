import React, { useState } from 'react';
import { X, Star, ShoppingBag, CheckCircle, ShieldCheck, Truck, AlertTriangle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct } = useStore();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isOutOfStock = selectedProduct.stock <= 0;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 0,
          position: 'relative',
          border: '1px solid var(--border-glow)',
          animation: 'slideUp 0.25s ease-out'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        }}>
          {/* Image Left Panel */}
          <div style={{
            background: '#0b1329',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '340px'
          }}>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80";
              }}
              style={{
                maxWidth: '100%',
                maxHeight: '340px',
                objectFit: 'contain',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-card)'
              }}
            />
          </div>

          {/* Details Right Panel */}
          <div style={{ padding: '2rem' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              {selectedProduct.category}
            </div>

            <h2 style={{ fontSize: '1.5rem', lineHeight: 1.25, marginBottom: '0.75rem' }}>
              {selectedProduct.name}
            </h2>

            {/* Rating & Stock */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#f59e0b' }}>
                <Star size={16} fill="#f59e0b" />
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedProduct.rating}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({selectedProduct.reviewsCount} reviews)</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span style={{ fontSize: '0.85rem' }}>
                {isOutOfStock ? (
                  <span style={{ color: 'var(--danger)' }}>Out of Stock</span>
                ) : (
                  <span style={{ color: 'var(--success)' }}>{selectedProduct.stock} units available</span>
                )}
              </span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                ${selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice > selectedProduct.price && (
                <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ${selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {selectedProduct.description}
            </p>

            {/* Specs Tags */}
            {selectedProduct.tags && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {selectedProduct.tags.map((tag, idx) => (
                  <span key={idx} className="badge badge-cyan">{tag}</span>
                ))}
              </div>
            )}

            {/* Quantity Selector & Add Button */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(15, 23, 42, 0.6)'
              }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '0.6rem 0.9rem', background: 'none', color: 'var(--text-primary)', fontSize: '1.1rem' }}
                >
                  -
                </button>
                <span style={{ padding: '0 0.8rem', fontWeight: 600 }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedProduct.stock || 1, quantity + 1))}
                  style={{ padding: '0.6rem 0.9rem', background: 'none', color: 'var(--text-primary)', fontSize: '1.1rem' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', opacity: isOutOfStock ? 0.5 : 1 }}
              >
                <ShoppingBag size={18} />
                <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>
            </div>

            {/* Guarantee Trust Badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Truck size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>Express Shipping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={16} style={{ color: 'var(--accent-violet)' }} />
                <span>Authenticity Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
