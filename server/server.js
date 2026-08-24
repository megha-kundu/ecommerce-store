const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Log API requests
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api', adminRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Nexus E-Commerce API',
    version: '1.0.0'
  });
});

// Root endpoint redirect / summary
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Nexus E-Commerce API</title></head>
      <body style="font-family: system-ui, sans-serif; padding: 2rem; background: #0f172a; color: #f8fafc;">
        <h1>⚡ Nexus E-Commerce REST API Server</h1>
        <p>Server is running smoothly on port <code>${PORT}</code>.</p>
        <h2>Available API Endpoints:</h2>
        <ul>
          <li><a href="/api/products" style="color:#38bdf8;">GET /api/products</a> - Store Catalog & Search</li>
          <li><a href="/api/orders" style="color:#38bdf8;">GET /api/orders</a> - Customer Orders</li>
          <li><a href="/api/categories" style="color:#38bdf8;">GET /api/categories</a> - Product Categories</li>
          <li><a href="/api/admin/stats" style="color:#38bdf8;">GET /api/admin/stats</a> - Admin Analytics</li>
          <li><a href="/api/health" style="color:#38bdf8;">GET /api/health</a> - API Health Status</li>
        </ul>
      </body>
    </html>
  `);
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Nexus E-Commerce Server running on http://localhost:${PORT}`);
  console.log(`📊 REST API endpoints available at http://localhost:${PORT}/api/products`);
  console.log(`==================================================\n`);
});
