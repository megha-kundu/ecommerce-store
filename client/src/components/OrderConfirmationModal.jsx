import React from 'react';
import { CheckCircle, Printer, ShoppingBag, X, Package, Truck, Calendar, MapPin, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function OrderConfirmationModal() {
  const { completedOrder, setCompletedOrder } = useStore();

  if (!completedOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  // Calculate estimated delivery date (3 days from order date)
  const orderDate = completedOrder.createdAt ? new Date(completedOrder.createdAt) : new Date();
  const deliveryDateMin = new Date(orderDate);
  deliveryDateMin.setDate(deliveryDateMin.getDate() + 2);

  const deliveryDateMax = new Date(orderDate);
  deliveryDateMax.setDate(deliveryDateMax.getDate() + 4);

  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  const formattedMin = deliveryDateMin.toLocaleDateString('en-US', options);
  const formattedMax = deliveryDateMax.toLocaleDateString('en-US', options);

  return (
    <div className="modal-overlay" onClick={() => setCompletedOrder(null)}>
      <div 
        className="glass-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2.5rem 2rem',
          position: 'relative',
          border: '1px solid var(--success)',
          animation: 'slideUp 0.25s ease-out'
        }}
      >
        <button
          onClick={() => setCompletedOrder(null)}
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

        {/* Confirmation Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '2px solid var(--success)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--success)',
            marginBottom: '0.85rem'
          }}>
            <CheckCircle size={36} />
          </div>

          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>Order Confirmed & Placed!</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Order Tracking Number: <strong style={{ color: 'var(--accent-cyan)' }}>#{completedOrder.id}</strong>
          </p>
        </div>

        {/* Highlighted Delivery Date Card */}
        <div className="glass-card" style={{
          padding: '1.25rem',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(56, 189, 248, 0.1) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(16, 185, 129, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--success)',
            flexShrink: 0
          }}>
            <Truck size={26} />
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Estimated Delivery Window
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.15rem' }}>
              {formattedMin} – {formattedMax}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--success)', marginTop: '0.2rem' }}>
              ⚡ Express 3-Day Tracked Courier Shipping
            </div>
          </div>
        </div>

        {/* Visual Delivery Status Progress Bar */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            Live Shipment Tracker Pipeline
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center', position: 'relative' }}>
            <div>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--success)', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.4rem', fontWeight: 800, fontSize: '0.75rem' }}>✓</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>Placed</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Confirmed</div>
            </div>

            <div>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-cyan)', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.4rem', fontWeight: 800, fontSize: '0.75rem' }}>2</div>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>Processing</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>In Warehouse</div>
            </div>

            <div>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.4rem', fontWeight: 600, fontSize: '0.75rem' }}>3</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dispatched</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>In Transit</div>
            </div>

            <div>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.4rem', fontWeight: 600, fontSize: '0.75rem' }}>4</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Delivered</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>At Doorstep</div>
            </div>
          </div>
        </div>

        {/* Order Details Breakdown */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Recipient Details</span>
              <strong>{completedOrder.customer?.name}</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{completedOrder.customer?.email}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.78rem' }}>Shipping Destination</span>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>{completedOrder.customer?.address}</div>
            </div>
          </div>

          {/* Itemized Table */}
          <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Ordered Items</h4>
            {completedOrder.items?.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', padding: '0.35rem 0' }}>
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800 }}>
            <span>Total Amount Paid</span>
            <span style={{ color: 'var(--accent-cyan)' }}>${completedOrder.pricing?.total?.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handlePrint} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
            <Printer size={18} />
            <span>Print Invoice</span>
          </button>

          <button onClick={() => setCompletedOrder(null)} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            <ShoppingBag size={18} />
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
}
