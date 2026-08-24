const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/orders (Admin / Customer order history)
router.get('/', async (req, res) => {
  try {
    const orders = await db.getOrders();
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/orders/:id (Get order by tracking ID)
router.get('/:id', async (req, res) => {
  try {
    const order = await db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/orders (Place new order)
router.post('/', async (req, res) => {
  try {
    const { customer, items, pricing } = req.body;
    if (!customer || !items || !items.length || !pricing) {
      return res.status(400).json({ success: false, message: 'Invalid order payload' });
    }

    const newOrder = await db.createOrder(req.body);
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH /api/orders/:id/status (Admin - update status)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status field is required' });
    }

    const updated = await db.updateOrderStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
