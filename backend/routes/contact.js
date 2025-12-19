// backend/routes/contact.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // model ঠিক path

// GET => সব message দেখবে (Frontend dev/testing)
router.get('/', async (req, res) => {
  try {
    const list = await Message.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error('GET /api/contact error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST => contact form submit করলে message save করবে
router.post('/', async (req, res) => {
  // 👇 নতুন debug লাইন
  console.log('CONTACT ROUTE HIT. BODY =', req.body);

  try {
    const { name, email, message } = req.body;

    // simple validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const msg = new Message({ name, email, message });
    const saved = await msg.save();

    console.log('MESSAGE SAVED:', saved._id);
    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error('POST /api/contact error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;