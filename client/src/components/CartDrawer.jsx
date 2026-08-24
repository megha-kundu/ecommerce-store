import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    tax,
    grandTotal,
    applyPromoCode,
    promoError,
    promoSuccess
  } = useCart();

  const { setIsCheckoutOpen } = useStore();
  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    applyPromoCode(inputCode);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '440px',
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
            <ShoppingBag size={20} style={{ color: 'var(--accent-cyan)' }} />
            <h3 style={{ fontSize: '1.2rem' }}>Your Shopping Cart</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{ background: 'none', color: 'var(--text-muted)', display: 'flex' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem'
        }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Your cart is empty</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Add some products from the catalog to get started!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <h4 style={{ fontSize: '0.9rem', lineHeight: 1.3 }}>{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: 'none', color: 'var(--text-muted)', display: 'flex' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ padding: '0.2rem 0.6rem', background: 'none', color: 'var(--text-primary)' }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0 0.5rem' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ padding: '0.2rem 0.6rem', background: 'none', color: 'var(--text-primary)' }}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Promo Code & Order Summary Footer */}
        {cart.length > 0 && (
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(15, 23, 42, 0.9)'
          }}>
            {/* Promo Form */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Tag size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Promo Code (NEXUS10)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  style={{ width: '100%', paddingLeft: '2.2rem', padding: '0.5rem 0.5rem 0.5rem 2.2rem', fontSize: '0.85rem' }}
                />
              </div>
              <button type="submit" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                Apply
              </button>
            </form>

            {promoError && (
              <div style={{ fontSize: '0.8rem', color: 'var(--danger)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <AlertCircle size={14} /> {promoError}
              </div>
            )}

            {promoSuccess && (
              <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={14} /> {promoSuccess}
              </div>
            )}

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Estimated Shipping</span>
                <span>{shipping === 0 ? <strong style={{ color: 'var(--success)' }}>FREE</strong> : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-subtle)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--accent-cyan)' }}>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
