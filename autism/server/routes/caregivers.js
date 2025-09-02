const express = require('express');
const jwt = require('jsonwebtoken');
const Caregiver = require('../models/Caregiver');
const User = require('../models/User');
const router = express.Router();

function auth(req,res,next){
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) { res.status(401).json({ msg: 'Invalid token' }); }
}

// add caregiver (patient only)
router.post('/', auth, async (req,res)=>{
  try {
    if (req.user.role !== 'patient') return res.status(403).json({ msg: 'Only patient can add caregiver' });
    const { name, email, phone } = req.body;
    const cg = await Caregiver.create({ name, email, phone, patient: req.user.id });
    res.json(cg);
  } catch(e){ res.status(500).json({ msg: 'Server error' }); }
});

router.get('/', auth, async (req,res)=>{
  try {
    if (req.user.role !== 'patient') return res.status(403).json({ msg: 'Only patient can view caregivers' });
    const list = await Caregiver.find({ patient: req.user.id });
    res.json(list);
  } catch(e){ res.status(500).json({ msg: 'Server error' }); }
});

module.exports = router;
