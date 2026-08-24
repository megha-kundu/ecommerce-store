// API Client wrapper for Node.js REST API
const BASE_URL = '/api';

async function fetchJson(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `API Request Failed (${res.status})`);
    }
    return data;
  } catch (err) {
    console.error(`[API Client Error] ${endpoint}:`, err.message);
    throw err;
  }
}

export const api = {
  // Products API
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/products${query ? `?${query}` : ''}`);
  },

  getProductById: (id) => fetchJson(`/products/${id}`),

  createProduct: (productData) => fetchJson('/products', {
    method: 'POST',
    body: JSON.stringify(productData)
  }),

  updateProduct: (id, updates) => fetchJson(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates)
  }),

  deleteProduct: (id) => fetchJson(`/products/${id}`, {
    method: 'DELETE'
  }),

  // Categories API
  getCategories: () => fetchJson('/categories'),

  // Orders API
  createOrder: (orderPayload) => fetchJson('/orders', {
    method: 'POST',
    body: JSON.stringify(orderPayload)
  }),

  getOrders: () => fetchJson('/orders'),

  updateOrderStatus: (id, status) => fetchJson(`/orders/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),

  // Admin Stats
  getAdminStats: () => fetchJson('/admin/stats')
};
