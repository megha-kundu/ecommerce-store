import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, user, setUser } = useStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setUser({
        name: isSignUp ? (formData.name || 'Alex Morgan') : (formData.email.split('@')[0] || 'Alex Morgan'),
        email: formData.email || 'alex.morgan@example.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      });
      setLoading(false);
      setIsAuthOpen(false);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthOpen(false)}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '2.5rem 2rem',
          position: 'relative',
          border: '1px solid var(--border-glow)',
          animation: 'slideUp 0.25s ease-out'
        }}
      >
        <button
          onClick={() => setIsAuthOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            color: 'var(--text-muted)'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.35rem' }}>
            {isSignUp ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {isSignUp ? 'Join Nexus Rewards & track your orders' : 'Sign in to access your wishlist & order history'}
          </p>
        </div>

        {/* Social Login Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => {
              setUser({ name: 'Alex Morgan', email: 'alex@google.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' });
              setIsAuthOpen(false);
            }}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#ea4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"/><path fill="#4285f4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/><path fill="#fbbc05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/><path fill="#34a853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/></svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
          <span>or sign in with email</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {isSignUp && (
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', paddingLeft: '2.4rem', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                placeholder="alex@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{ width: '100%', paddingLeft: '2.4rem', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.35rem', display: 'block' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                style={{ width: '100%', paddingLeft: '2.4rem', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          {!isSignUp && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent-cyan)' }} />
                <span>Remember me</span>
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to your email!"); }} style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>
                Forgot Password?
              </a>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
            <span>{loading ? 'Authenticating...' : isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ background: 'none', color: 'var(--accent-cyan)', fontWeight: 600 }}
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}
