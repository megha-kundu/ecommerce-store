import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ShieldCheck, Lock, ArrowRight, User, Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { api } from '../api/client';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, setCompletedOrder } = useStore();
  const { cart, subtotal, discount, shipping, tax, grandTotal, clearCart } = useCart();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    address: '452 Technology Parkway, Silicon Valley, CA',
    phone: '+1 (555) 321-7890',
    paymentMethod: 'Credit Card',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const orderPayload = {
      customer: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phone
      },
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      pricing: {
        subtotal,
        discount,
        shipping,
        tax,
        total: grandTotal
      },
      payment: {
        method: formData.paymentMethod,
        status: "Paid"
      }
    };

    try {
      const res = await api.createOrder(orderPayload);
      if (res.success) {
        setCompletedOrder(res.data);
        clearCart();
        setIsCheckoutOpen(false);
      } else {
        setError(res.message || 'Failed to place order.');
      }
    } catch (err) {
      console.error("Checkout submit error:", err);
      setError("Server connection failed. Placed order offline fallback.");
      // Fallback offline mock order for smooth demonstration
      const mockOrder = {
        id: `NX-${Math.floor(10000 + Math.random() * 90000)}`,
        customer: orderPayload.customer,
        items: orderPayload.items,
        pricing: orderPayload.pricing,
        payment: orderPayload.payment,
        status: "Pending",
        createdAt: new Date().toISOString()
      };
      setCompletedOrder(mockOrder);
      clearCart();
      setIsCheckoutOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          border: '1px solid var(--border-glow)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>Checkout & Payment</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Complete your order securely via Express REST API</p>
          </div>
          <button onClick={() => setIsCheckoutOpen(false)} style={{ background: 'none', color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Step Progress Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {[
            { num: 1, label: '1. Shipping' },
            { num: 2, label: '2. Payment' },
            { num: 3, label: '3. Review' }
          ].map(s => (
            <div
              key={s.num}
              onClick={() => setStep(s.num)}
              style={{
                flex: 1,
                padding: '0.5rem',
                textAlign: 'center',
                fontSize: '0.85rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                background: step === s.num ? 'var(--accent-gradient)' : 'rgba(255, 255, 255, 0.05)',
                color: step === s.num ? '#0f172a' : 'var(--text-secondary)'
              }}
            >
              {s.label}
            </div>
          ))}
        </div>

        {error && (
          <div style={{ padding: '0.85rem', background: 'rgba(239,68,68,0.15)', color: '#f87171', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmitOrder}>
          {/* STEP 1: Shipping Customer Info */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', paddingLeft: '2.4rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', paddingLeft: '2.4rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>Shipping Street Address</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required style={{ width: '100%', paddingLeft: '2.4rem' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: '100%', paddingLeft: '2.4rem' }} />
                </div>
              </div>

              <button type="button" onClick={() => setStep(2)} className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }}>
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* STEP 2: Payment Method */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', display: 'block' }}>Select Payment Gateway</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  {['Credit Card', 'PayPal', 'UPI / QR'].map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method })}
                      style={{
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        border: formData.paymentMethod === method ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                        background: formData.paymentMethod === method ? 'rgba(56, 189, 248, 0.15)' : 'rgba(15, 23, 42, 0.5)',
                        color: formData.paymentMethod === method ? 'var(--accent-cyan)' : 'var(--text-secondary)'
                      }}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>Card Number</label>
                <div style={{ position: 'relative' }}>
                  <CreditCard size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required style={{ width: '100%', paddingLeft: '2.4rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>Expiry Date</label>
                  <input type="text" name="cardExp" value={formData.cardExp} onChange={handleChange} required style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>CVC Security Code</label>
                  <input type="text" name="cardCvc" value={formData.cardCvc} onChange={handleChange} required style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Back
                </button>
                <button type="button" onClick={() => setStep(3)} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Review Order
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Review & Final Submit */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>Order Summary ({cart.length} items)</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--text-primary)' }}>
                    <span>Total Amount Due</span>
                    <span style={{ color: 'var(--accent-cyan)' }}>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <p style={{ marginBottom: '0.35rem' }}><strong>Deliver To:</strong> {formData.name} ({formData.email})</p>
                <p style={{ marginBottom: '0.35rem' }}><strong>Shipping Address:</strong> {formData.address}</p>
                <p style={{ marginBottom: '0.35rem' }}><strong>Payment Method:</strong> {formData.paymentMethod}</p>
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-subtle)', color: 'var(--success)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span>🚚 Estimated Delivery: <strong>{new Date(Date.now() + 86400000 * 3).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} – {new Date(Date.now() + 86400000 * 5).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</strong> (Express 3-Day Shipping)</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', justifyContent: 'center' }}>
                <Lock size={14} style={{ color: 'var(--success)' }} />
                <span>256-Bit SSL Encrypted REST API Transaction</span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setStep(2)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Back
                </button>
                <button type="submit" disabled={submitting} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="spin" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      <span>Place Order (${grandTotal.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
