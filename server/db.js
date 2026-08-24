const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { initialCategories, initialProducts, initialOrders } = require('./seedData');

const Product = require('./models/Product');
const Order = require('./models/Order');
const Category = require('./models/Category');

const DB_FILE = path.join(__dirname, 'db.json');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nexus_store';

let isMongoConnected = false;

// Connect to MongoDB with graceful fallback to db.json
async function connectMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000 // 3 sec timeout for quick fallback
    });
    isMongoConnected = true;
    console.log(`[MongoDB] Connected successfully to MongoDB at ${MONGODB_URI}`);
    await seedMongoDB();
  } catch (err) {
    isMongoConnected = false;
    console.log(`[MongoDB] Local MongoDB server not active (${err.message}). Using persistent JSON database fallback (server/db.json).`);
  }
}

// Auto-seed MongoDB collections if empty
async function seedMongoDB() {
  try {
    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      await Product.insertMany(initialProducts);
      console.log('[MongoDB] Seeded initial products collection.');
    }

    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      await Category.insertMany(initialCategories);
      console.log('[MongoDB] Seeded initial categories collection.');
    }

    const orderCount = await Order.countDocuments();
    if (orderCount === 0) {
      await Order.insertMany(initialOrders);
      console.log('[MongoDB] Seeded initial orders collection.');
    }
  } catch (err) {
    console.error('[MongoDB Seed Error]:', err.message);
  }
}

// File DB Fallback Helpers
function initFileDb() {
  if (!fs.existsSync(DB_FILE)) {
    const data = {
      categories: initialCategories,
      products: initialProducts,
      orders: initialOrders
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }
}

function readFileDb() {
  try {
    initFileDb();
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return { categories: [], products: [], orders: [] };
  }
}

function writeFileDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    return false;
  }
}

// Initialize Mongo connection async
connectMongoDB();

// Export Database API Interface
const db = {
  isMongoConnected: () => isMongoConnected,

  getCategories: async () => {
    if (isMongoConnected) {
      const cats = await Category.find().lean();
      return cats.length > 0 ? cats : initialCategories;
    }
    return readFileDb().categories || initialCategories;
  },

  getProducts: async () => {
    if (isMongoConnected) {
      const prods = await Product.find().lean();
      return prods.length > 0 ? prods : readFileDb().products;
    }
    return readFileDb().products || [];
  },

  getProductById: async (id) => {
    if (isMongoConnected) {
      const prod = await Product.findOne({ id }).lean();
      if (prod) return prod;
    }
    const products = readFileDb().products || [];
    return products.find(p => p.id === id);
  },

  addProduct: async (newProduct) => {
    const productData = {
      id: newProduct.id || `prod-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category || "accessories",
      price: parseFloat(newProduct.price) || 0,
      originalPrice: parseFloat(newProduct.originalPrice) || parseFloat(newProduct.price) || 0,
      description: newProduct.description || "",
      image: newProduct.image || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      stock: parseInt(newProduct.stock, 10) || 0,
      rating: parseFloat(newProduct.rating) || 5.0,
      reviewsCount: parseInt(newProduct.reviewsCount, 10) || 1,
      featured: Boolean(newProduct.featured),
      tags: newProduct.tags || []
    };

    if (isMongoConnected) {
      const created = await Product.create(productData);
      return created.toObject();
    }

    const data = readFileDb();
    data.products.unshift(productData);
    writeFileDb(data);
    return productData;
  },

  updateProduct: async (id, updates) => {
    if (isMongoConnected) {
      const updated = await Product.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
      if (updated) return updated;
    }

    const data = readFileDb();
    const idx = data.products.findIndex(p => p.id === id);
    if (idx === -1) return null;

    data.products[idx] = {
      ...data.products[idx],
      ...updates
    };
    writeFileDb(data);
    return data.products[idx];
  },

  deleteProduct: async (id) => {
    if (isMongoConnected) {
      const deleted = await Product.findOneAndDelete({ id });
      if (deleted) return true;
    }

    const data = readFileDb();
    const initialLen = data.products.length;
    data.products = data.products.filter(p => p.id !== id);
    if (data.products.length < initialLen) {
      writeFileDb(data);
      return true;
    }
    return false;
  },

  getOrders: async () => {
    if (isMongoConnected) {
      const orders = await Order.find().sort({ createdAt: -1 }).lean();
      return orders;
    }
    return readFileDb().orders || [];
  },

  getOrderById: async (id) => {
    if (isMongoConnected) {
      const order = await Order.findOne({ id }).lean();
      if (order) return order;
    }
    const orders = readFileDb().orders || [];
    return orders.find(o => o.id === id);
  },

  createOrder: async (orderData) => {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const orderId = `NX-${randomCode}`;

    const newOrder = {
      id: orderId,
      customer: orderData.customer,
      items: orderData.items,
      pricing: orderData.pricing,
      payment: orderData.payment || { method: "Credit Card", status: "Paid" },
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected) {
      const created = await Order.create(newOrder);
      // Deduct stock in MongoDB
      for (const item of orderData.items) {
        await Product.findOneAndUpdate({ id: item.id }, { $inc: { stock: -item.quantity } });
      }
      return created.toObject();
    }

    const data = readFileDb();
    orderData.items.forEach(item => {
      const prod = data.products.find(p => p.id === item.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });

    data.orders.unshift(newOrder);
    writeFileDb(data);
    return newOrder;
  },

  updateOrderStatus: async (id, status) => {
    if (isMongoConnected) {
      const updated = await Order.findOneAndUpdate({ id }, { status }, { new: true }).lean();
      if (updated) return updated;
    }

    const data = readFileDb();
    const order = data.orders.find(o => o.id === id);
    if (!order) return null;

    order.status = status;
    writeFileDb(data);
    return order;
  },

  getAdminStats: async () => {
    if (isMongoConnected) {
      const totalOrders = await Order.countDocuments();
      const orders = await Order.find().lean();
      const totalRevenue = orders.reduce((sum, o) => sum + (o.pricing?.total || 0), 0);
      const lowStockCount = await Product.countDocuments({ stock: { $lte: 5 } });
      const totalProducts = await Product.countDocuments();

      return {
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalOrders,
        lowStockCount,
        totalProducts,
        avgOrderValue: totalOrders > 0 ? parseFloat((totalRevenue / totalOrders).toFixed(2)) : 0,
        database: 'MongoDB'
      };
    }

    const data = readFileDb();
    const totalOrders = data.orders.length;
    const totalRevenue = data.orders.reduce((sum, o) => sum + (o.pricing?.total || 0), 0);
    const lowStockCount = data.products.filter(p => p.stock <= 5).length;
    const totalProducts = data.products.length;

    return {
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalOrders,
      lowStockCount,
      totalProducts,
      avgOrderValue: totalOrders > 0 ? parseFloat((totalRevenue / totalOrders).toFixed(2)) : 0,
      database: 'JSON File (db.json)'
    };
  }
};

module.exports = db;
