const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  medication: String,
  time: Date,
  taken: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Reminder', ReminderSchema);
