import React from 'react';
import { Star, ShoppingBag, Eye, Heart, CheckCircle, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { setSelectedProduct } = useStore();

  const isWishlisted = wishlist.some(item => item.id === product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      border: '1px solid var(--border-subtle)'
    }}>
      {/* Featured Badge / Discount Badge */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        {product.featured && (
          <span className="badge badge-cyan">Featured</span>
        )}
        {product.originalPrice > product.price && (
          <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Prominent Wishlist Heart Button */}
      <button
        onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 15,
          background: isWishlisted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(15, 23, 42, 0.85)',
          border: isWishlisted ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
          borderRadius: '50%',
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isWishlisted ? '#ef4444' : 'var(--text-primary)',
          backdropFilter: 'blur(8px)',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
      >
        <Heart size={18} fill={isWishlisted ? '#ef4444' : 'none'} style={{ color: isWishlisted ? '#ef4444' : 'var(--text-primary)' }} />
      </button>

      {/* Product Image Container */}
      <div 
        onClick={() => setSelectedProduct(product)}
        style={{
          height: '210px',
          width: '100%',
          background: '#0f172a',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80";
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>

      {/* Product Info */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        {/* Category & Rating */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b' }}>
            <Star size={14} fill="#f59e0b" />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{product.rating}</span>
            <span>({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => setSelectedProduct(product)}
          style={{
            fontSize: '1rem',
            lineHeight: 1.35,
            marginBottom: '0.5rem',
            cursor: 'pointer',
            height: '2.7em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.name}
        </h3>

        {/* Stock Status Badge */}
        <div style={{ marginBottom: '1rem', fontSize: '0.75rem' }}>
          {isOutOfStock ? (
            <span style={{ color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <AlertTriangle size={13} /> Out of Stock
            </span>
          ) : isLowStock ? (
            <span style={{ color: 'var(--warning)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <AlertTriangle size={13} /> Only {product.stock} left in stock!
            </span>
          ) : (
            <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={13} /> In Stock ({product.stock} available)
            </span>
          )}
        </div>

        <div style={{ marginTop: 'auto' }}>
          {/* Price Row */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  textDecoration: 'line-through',
                  marginLeft: '0.5rem'
                }}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 42px', gap: '0.5rem' }}>
            <button
              onClick={() => addToCart(product)}
              disabled={isOutOfStock}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                fontSize: '0.85rem',
                padding: '0.65rem 0.75rem',
                opacity: isOutOfStock ? 0.5 : 1,
                cursor: isOutOfStock ? 'not-allowed' : 'pointer'
              }}
            >
              <ShoppingBag size={16} />
              <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>

            <button
              onClick={() => setSelectedProduct(product)}
              className="btn-secondary"
              style={{
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)'
              }}
              title="Quick Product Details"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
