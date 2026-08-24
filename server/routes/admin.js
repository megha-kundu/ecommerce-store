const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await db.getCategories();
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/admin/stats (Dashboard analytics summary)
router.get('/stats', async (req, res) => {
  try {
    const stats = await db.getAdminStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
