const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  icon: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
