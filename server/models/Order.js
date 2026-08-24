const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customer: {
    name: String,
    email: String,
    address: String,
    phone: String
  },
  items: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  pricing: {
    subtotal: Number,
    discount: Number,
    shipping: Number,
    tax: Number,
    total: Number
  },
  payment: {
    method: { type: String, default: "Credit Card" },
    status: { type: String, default: "Paid" }
  },
  status: { type: String, default: "Pending" },
  createdAt: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
