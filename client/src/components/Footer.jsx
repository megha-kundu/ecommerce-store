import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Check, ShieldCheck, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Footer() {
  const { setRole, role } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="glass-card" style={{
      borderRadius: 0,
      borderBottom: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      marginTop: 'auto',
      padding: '4rem 1.5rem 2rem',
      background: 'rgba(9, 13, 22, 0.98)',
      borderTop: '1px solid var(--border-subtle)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Newsletter Banner */}
        <div className="glass-card" style={{
          padding: '2.5rem 2rem',
          marginBottom: '3.5rem',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
          borderColor: 'var(--border-glow)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>EXCLUSIVE OFFER</span>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>Unlock 10% Off Your First Purchase</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Subscribe to the NEXUS newsletter for secret discount codes, product drops, and tech news.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 600, fontSize: '0.95rem' }}>
                <Check size={20} />
                <span>Thank you! Your 10% promo code is: NEXUS10</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ flex: 1, fontSize: '0.88rem' }}
                />
                <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                  <span>Subscribe</span>
                  <ArrowRight size={16} />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                background: 'var(--accent-gradient)',
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f172a'
              }}>
                <ShoppingBag size={18} />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800 }}>NEXUS</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Designing premium audio equipment, high-performance computing, smart wearables, and next-generation gaming accessories.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Customer Care</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Track Your Order</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Shipping & Global Delivery</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Returns & 30-Day Policy</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Warranty Registration</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Help Center & FAQ</a></li>
            </ul>
          </div>

          {/* About Company */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>About NEXUS</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Our Story & Craft</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Press & Media Kit</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Retail Stores & Stockists</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Sustainability & Recycling</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Careers at NEXUS</a></li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Legal & Security</h4>
            <ul style={{ listStyle: 'none', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Cookie Preferences</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit', textDecoration: 'none' }}>Security Disclosures</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.25rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} NEXUS Consumer Electronics Inc. All rights reserved.{' '}
            <span
              onClick={() => setRole(role === 'shopper' ? 'admin' : 'shopper')}
              style={{ cursor: 'pointer', color: 'var(--text-muted)', textDecoration: 'underline', marginLeft: '0.5rem' }}
              title="Staff Inventory Portal Switcher"
            >
              {role === 'shopper' ? 'Staff Portal' : 'Customer View'}
            </span>
          </div>

          {/* Payment Provider Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', fontWeight: 600 }}>
            <span style={{ padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>VISA</span>
            <span style={{ padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>Mastercard</span>
            <span style={{ padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>Apple Pay</span>
            <span style={{ padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
