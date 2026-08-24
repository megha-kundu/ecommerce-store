import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  AlertTriangle, 
  Package, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  RefreshCw,
  Clock,
  Truck,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { api } from '../api/client';
import { useStore } from '../context/StoreContext';

export default function AdminDashboard() {
  const { products, refreshProducts } = useStore();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'

  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    category: 'audio',
    price: '',
    originalPrice: '',
    stock: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    featured: false
  });
  const [adding, setAdding] = useState(false);
  const [formMsg, setFormMsg] = useState('');

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes] = await Promise.all([
        api.getAdminStats(),
        api.getOrders()
      ]);
      if (statsRes.success) setStats(statsRes.data);
      if (ordersRes.success) setOrders(ordersRes.data);
    } catch (err) {
      console.error("Admin data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;
    setAdding(true);
    setFormMsg('');

    try {
      const res = await api.createProduct(newProd);
      if (res.success) {
        setFormMsg('Product created successfully!');
        setNewProd({
          name: '',
          category: 'audio',
          price: '',
          originalPrice: '',
          stock: '',
          description: '',
          image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
          featured: false
        });
        refreshProducts();
        loadAdminData();
      }
    } catch (err) {
      setFormMsg('Failed to create product via API.');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.deleteProduct(id);
      refreshProducts();
      loadAdminData();
    } catch (err) {
      alert("Delete failed.");
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await api.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        loadAdminData();
      }
    } catch (err) {
      alert("Status update failed.");
    }
  };

  return (
    <div style={{ marginBottom: '3rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{
        padding: '1.75rem 2rem',
        marginBottom: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        borderColor: 'var(--border-glow)'
      }}>
        <div>
          <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>Store Operations</div>
          <h2 style={{ fontSize: '1.6rem' }}>Admin Management Dashboard</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage live product inventory, monitor sales revenue, and update customer order pipelines.</p>
        </div>

        <button onClick={loadAdminData} className="btn-secondary" style={{ padding: '0.65rem 1rem' }}>
          <RefreshCw size={16} className={loading ? "spin" : ""} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-cyan)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Revenue</span>
            <DollarSign size={20} />
          </div>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-cyan)' }}>
            ${stats ? stats.totalRevenue.toFixed(2) : '0.00'}
          </h3>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-violet)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Orders</span>
            <ShoppingBag size={20} />
          </div>
          <h3 style={{ fontSize: '1.8rem' }}>{stats ? stats.totalOrders : 0}</h3>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Catalog Items</span>
            <Package size={20} />
          </div>
          <h3 style={{ fontSize: '1.8rem' }}>{stats ? stats.totalProducts : products.length}</h3>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--warning)', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Low Stock Alerts</span>
            <AlertTriangle size={20} />
          </div>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--warning)' }}>{stats ? stats.lowStockCount : 0}</h3>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setActiveTab('products')}
          style={{
            background: 'none',
            color: activeTab === 'products' ? 'var(--accent-cyan)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: activeTab === 'products' ? '2px solid var(--accent-cyan)' : 'none'
          }}
        >
          Product Inventory ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          style={{
            background: 'none',
            color: activeTab === 'orders' ? 'var(--accent-cyan)' : 'var(--text-muted)',
            fontWeight: 700,
            fontSize: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: activeTab === 'orders' ? '2px solid var(--accent-cyan)' : 'none'
          }}
        >
          Customer Orders Pipeline ({orders.length})
        </button>
      </div>

      {/* TAB 1: PRODUCT INVENTORY & ADD FORM */}
      {activeTab === 'products' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Add Product Form */}
          <div className="glass-card" style={{ padding: '1.5rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={18} style={{ color: 'var(--accent-cyan)' }} />
              Add New Product to API
            </h3>

            {formMsg && (
              <div style={{ padding: '0.65rem', background: 'rgba(16,185,129,0.15)', color: 'var(--success)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontSize: '0.85rem' }}>
                {formMsg}
              </div>
            )}

            <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. SonicBlaster Pro Speaker"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  required
                  style={{ width: '100%', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="149.99"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    required
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Stock Units</label>
                  <input
                    type="number"
                    placeholder="15"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                    required
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Category</label>
                <select
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  style={{ width: '100%', fontSize: '0.85rem' }}
                >
                  <option value="audio">Audio & Sound</option>
                  <option value="laptops">Laptops & Computers</option>
                  <option value="wearables">Smartwatches & Wearables</option>
                  <option value="gaming">Gaming Gear</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Description</label>
                <textarea
                  rows="3"
                  placeholder="Enter product features and specs..."
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  style={{ width: '100%', fontSize: '0.85rem' }}
                />
              </div>

              <button type="submit" disabled={adding} className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                <span>{adding ? 'Saving Product...' : 'Add Product'}</span>
              </button>
            </form>
          </div>

          {/* Product Inventory Table */}
          <div className="glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Active Products Inventory</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Product</th>
                  <th style={{ padding: '0.75rem' }}>Price</th>
                  <th style={{ padding: '0.75rem' }}>Stock</th>
                  <th style={{ padding: '0.75rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <img src={p.image} alt={p.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                      <span style={{ fontWeight: 600 }}>{p.name}</span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                      ${p.price.toFixed(2)}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.15rem 0.5rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        background: p.stock <= 5 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                        color: p.stock <= 5 ? 'var(--warning)' : 'var(--success)'
                      }}>
                        {p.stock} units
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        style={{ background: 'none', color: 'var(--danger)', display: 'flex', padding: '0.2rem' }}
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOMER ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Live Customer Orders</h3>
          {orders.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No customer orders placed yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Order ID</th>
                  <th style={{ padding: '0.75rem' }}>Customer</th>
                  <th style={{ padding: '0.75rem' }}>Items</th>
                  <th style={{ padding: '0.75rem' }}>Total</th>
                  <th style={{ padding: '0.75rem' }}>Status Pipeline</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      #{o.id}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div>{o.customer?.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{o.customer?.email}</div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {o.items?.map((item, i) => (
                        <div key={i} style={{ fontSize: '0.8rem' }}>{item.quantity}x {item.name}</div>
                      ))}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: 700 }}>
                      ${o.pricing?.total?.toFixed(2)}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                        style={{
                          fontSize: '0.8rem',
                          padding: '0.35rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(15, 23, 42, 0.8)',
                          borderColor: o.status === 'Delivered' ? 'var(--success)' : 'var(--warning)'
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
