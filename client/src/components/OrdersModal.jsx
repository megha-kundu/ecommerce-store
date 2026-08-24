import React, { useState, useEffect } from 'react';
import { X, Package, Clock, Truck, CheckCircle, ChevronRight, RefreshCw, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { api } from '../api/client';

export default function OrdersModal() {
  const { isOrdersOpen, setIsOrdersOpen, setCompletedOrder } = useStore();
  const [customerOrders, setCustomerOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomerOrders = async () => {
    setLoading(true);
    try {
      const res = await api.getOrders();
      if (res.success) {
        setCustomerOrders(res.data);
      }
    } catch (err) {
      console.error("Failed to load orders history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOrdersOpen) {
      fetchCustomerOrders();
    }
  }, [isOrdersOpen]);

  if (!isOrdersOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOrdersOpen(false)}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: '2rem',
          position: 'relative',
          border: '1px solid var(--border-glow)',
          animation: 'slideUp 0.25s ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ padding: '0.5rem', background: 'rgba(56, 189, 248, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-cyan)' }}>
              <Package size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem' }}>My Order History</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Track packages and view order receipts</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={fetchCustomerOrders}
              className="btn-secondary"
              style={{ padding: '0.45rem', borderRadius: '50%' }}
              title="Refresh Orders"
            >
              <RefreshCw size={16} className={loading ? "spin" : ""} />
            </button>
            <button onClick={() => setIsOrdersOpen(false)} style={{ background: 'none', color: 'var(--text-muted)' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <RefreshCw size={32} className="spin" style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem' }} />
            <p>Fetching your order records...</p>
          </div>
        ) : customerOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>No orders found</h3>
            <p style={{ fontSize: '0.85rem' }}>Place your first purchase from the catalog to see tracking updates here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {customerOrders.map(order => {
              const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              });

              return (
                <div 
                  key={order.id}
                  onClick={() => {
                    setCompletedOrder(order);
                    setIsOrdersOpen(false);
                  }}
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(15, 23, 42, 0.6)',
                    borderColor: 'var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease, transform 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block' }}>Tracking Number</span>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-cyan)' }}>#{order.id}</span>
                    </div>

                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      background: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: order.status === 'Delivered' ? 'var(--success)' : 'var(--warning)',
                      border: order.status === 'Delivered' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
                    }}>
                      {order.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    {order.items?.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0' }}>
                        <span>{item.quantity}x {item.name}</span>
                        <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    paddingTop: '0.75rem',
                    borderTop: '1px dashed var(--border-subtle)',
                    fontSize: '0.85rem'
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>Ordered on {orderDate}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                        Total: ${(order.pricing?.total || 0).toFixed(2)}
                      </span>
                      <ChevronRight size={18} style={{ color: 'var(--accent-cyan)' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
