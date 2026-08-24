import React, { useState } from 'react';
import { X, Code2, Database, Terminal, Check, Copy } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function ApiDocsModal() {
  const { isApiDocsOpen, setIsApiDocsOpen } = useStore();
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!isApiDocsOpen) return null;

  const endpoints = [
    {
      method: 'GET',
      path: '/api/products',
      desc: 'Fetch product catalog with query filters (?category=audio&search=headphones&sort=price-low)',
      curl: 'curl -X GET "http://localhost:5000/api/products?category=audio"'
    },
    {
      method: 'POST',
      path: '/api/products',
      desc: 'Create a new product item (Admin role)',
      curl: `curl -X POST "http://localhost:5000/api/products" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Pro Headphones","price":199.99,"category":"audio","stock":15}'`
    },
    {
      method: 'POST',
      path: '/api/orders',
      desc: 'Submit customer order & automatically update product inventory stock',
      curl: `curl -X POST "http://localhost:5000/api/orders" \\
  -H "Content-Type: application/json" \\
  -d '{"customer":{"name":"Alice"},"items":[{"id":"prod-1","quantity":1}],"pricing":{"total":249.99}}'`
    },
    {
      method: 'GET',
      path: '/api/admin/stats',
      desc: 'Fetch admin store metrics (Total Revenue, Low Stock Alerts, Total Orders)',
      curl: 'curl -X GET "http://localhost:5000/api/admin/stats"'
    }
  ];

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsApiDocsOpen(false)}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          border: '1px solid var(--border-glow)'
        }}
      >
        <button
          onClick={() => setIsApiDocsOpen(false)}
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(56, 189, 248, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-cyan)' }}>
            <Code2 size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem' }}>REST API Documentation</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Interactive API specification for portfolio & technical resume showcase</p>
          </div>
        </div>

        {/* Endpoints List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {endpoints.map((ep, idx) => (
            <div key={idx} style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  background: ep.method === 'GET' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                  color: ep.method === 'GET' ? 'var(--accent-cyan)' : 'var(--success)'
                }}>
                  {ep.method}
                </span>
                <code style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600 }}>{ep.path}</code>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>{ep.desc}</p>

              <div style={{ position: 'relative' }}>
                <pre style={{
                  background: '#0b0f19',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  color: '#e2e8f0',
                  overflowX: 'auto',
                  fontFamily: 'monospace'
                }}>
                  {ep.curl}
                </pre>
                <button
                  onClick={() => handleCopy(ep.curl, idx)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.3rem 0.5rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedIndex === idx ? <Check size={14} style={{ color: 'var(--success)' }} /> : <Copy size={14} />}
                  <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
