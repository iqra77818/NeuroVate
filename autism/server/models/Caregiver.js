const mongoose = require('mongoose');

const CaregiverSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // which patient added this caregiver
}, { timestamps: true });

module.exports = mongoose.model('Caregiver', CaregiverSchema);
