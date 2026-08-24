const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  description: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
