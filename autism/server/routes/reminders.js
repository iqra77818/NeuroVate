const express = require('express');
const Reminder = require('../models/Reminder');
const router = express.Router();

// 🚫 Remove auth middleware

// ✅ Create reminder (public)
router.post('/', async (req, res) => {
  try {
    const { medication, time } = req.body;
    const r = await Reminder.create({ medication, time: new Date(time) });
    res.json(r);
  } catch (e) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ List reminders (public)
router.get('/', async (req, res) => {
  try {
    const list = await Reminder.find().sort({ time: 1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ Mark reminder as taken (public)
router.patch('/:id/taken', async (req, res) => {
  try {
    const r = await Reminder.findOneAndUpdate(
      { _id: req.params.id },
      { taken: true },
      { new: true }
    );
    if (!r) return res.status(404).json({ msg: 'Reminder not found' });
    res.json(r);
  } catch (e) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

