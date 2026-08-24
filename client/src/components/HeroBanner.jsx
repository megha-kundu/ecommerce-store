import React from 'react';
import { Sparkles, ShieldCheck, Truck, RefreshCw, Lock, ArrowRight, Play } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function HeroBanner() {
  const { setSelectedProduct, products, setIsVideoOpen } = useStore();

  const flagshipProduct = products.find(p => p.id === 'prod-1') || products[0];

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Luxury Flagship Hero Section */}
      <div className="glass-card" style={{
        padding: '3.5rem 2.5rem',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border-glow)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.85) 100%)',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Background Radial Glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center',
          width: '100%'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }} className="badge badge-cyan">
              <Sparkles size={13} />
              <span>NEW FLAGSHIP RELEASE</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              lineHeight: 1.1,
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'var(--font-heading)'
            }}>
              Pure Audio Unbound. SoundPro X Ultra.
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '520px', lineHeight: 1.6 }}>
              Engineered with active noise cancellation, custom 40mm titanium drivers, spatial audio tracking, and up to 40 hours of continuous playback.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {flagshipProduct && (
                <button
                  onClick={() => setSelectedProduct(flagshipProduct)}
                  className="btn-primary"
                  style={{ padding: '0.85rem 1.8rem', fontSize: '0.95rem' }}
                >
                  <span>Shop SoundPro X ($249.99)</span>
                  <ArrowRight size={18} />
                </button>
              )}

              <button
                onClick={() => setIsVideoOpen(true)}
                className="btn-secondary"
                style={{ padding: '0.85rem 1.4rem', fontSize: '0.95rem' }}
              >
                <Play size={16} fill="currentColor" />
                <span>Watch Film</span>
              </button>
            </div>
          </div>

          {/* Hero Heroine Image Display */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '380px',
              height: '320px',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
              border: '1px solid var(--border-subtle)',
              position: 'relative'
            }}>
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                alt="SoundPro X Ultra Headphones"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(12px)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>SoundPro X Ultra</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>Space Black Edition</div>
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>$249.99</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commercial Trust Badges Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem'
      }}>
        <div className="glass-card" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
            <Truck size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.15rem' }}>Free Worldwide Shipping</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>On all orders over $100</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(129, 140, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-violet)' }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.15rem' }}>2-Year Official Warranty</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Full hardware coverage</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
            <RefreshCw size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.15rem' }}>30-Day Money-Back</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Hassle-free return policy</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)' }}>
            <Lock size={22} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.15rem' }}>256-Bit SSL Security</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Encrypted payment checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
