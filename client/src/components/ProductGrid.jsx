import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { SlidersHorizontal, PackageSearch, RefreshCw } from 'lucide-react';

export default function ProductGrid() {
  const {
    products,
    categories,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchQuery,
    refreshProducts
  } = useStore();

  return (
    <section id="catalog" style={{ marginBottom: '3rem' }}>
      {/* Category Pills & Controls Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          maxWidth: '100%'
        }}>
          {categories.map(cat => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                style={{
                  padding: '0.55rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  background: isActive ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#0f172a' : 'var(--text-secondary)',
                  border: isActive ? 'none' : '1px solid var(--border-subtle)',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Sort Selector & Refresh */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                fontSize: '0.85rem',
                padding: '0.55rem 0.85rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <button
            onClick={refreshProducts}
            className="btn-secondary"
            style={{ padding: '0.55rem', borderRadius: 'var(--radius-full)' }}
            title="Refresh Catalog Data from API"
          >
            <RefreshCw size={16} className={loading ? "spin" : ""} />
          </button>
        </div>
      </div>

      {/* Error Message Alert */}
      {error && (
        <div className="glass-card" style={{
          padding: '1.25rem',
          borderColor: 'rgba(239, 68, 68, 0.4)',
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#f87171',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ fontWeight: 600 }}>{error}</p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Make sure the Express backend server (`npm run server`) is running on port 5000.</p>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '1.5rem'
        }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="glass-card" style={{ height: '380px', opacity: 0.6 }}>
              <div style={{ height: '200px', background: '#1e293b' }} />
              <div style={{ padding: '1rem' }}>
                <div style={{ height: '18px', background: '#334155', borderRadius: '4px', marginBottom: '8px' }} />
                <div style={{ height: '14px', background: '#334155', borderRadius: '4px', width: '60%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        /* Empty Search / Filter State */
        <div className="glass-card" style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          color: 'var(--text-muted)'
        }}>
          <PackageSearch size={48} style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No products found</h3>
          <p style={{ fontSize: '0.9rem' }}>Try adjusting your search keyword or selected category tab.</p>
        </div>
      ) : (
        /* Products Grid */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '1.5rem'
        }}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
