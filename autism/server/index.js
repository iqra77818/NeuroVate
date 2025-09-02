require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const caregiverRoutes = require('./routes/caregivers');
const reminderRoutes = require('./routes/reminders');
const Reminder = require('./models/Reminder');

const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, { cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173' } });

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

// connect DB
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/dementia-demo');

// routes
app.use('/api/auth', authRoutes);
app.use('/api/caregivers', caregiverRoutes);
app.use('/api/reminders', reminderRoutes);

// public demo endpoint
app.get('/api/public/demo-patients', async (req,res)=>{
  const User = require('./models/User');
  const p = await User.find({ role: 'patient' }).limit(10).select('name email createdAt');
  res.json(p);
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  // option to join patient room
  socket.on('join_patient', (patientId) => {
    socket.join(`patient_${patientId}`);
  });

  // emotion events from client
  socket.on('emotionAlert', (data) => {
    // data: { patientId, expression }
    io.emit('caregiver_notification', { type: 'emotion', ...data });
  });

  socket.on('familyAlert', (data) => {
    io.emit('caregiver_notification', { type: 'unknown_face', ...data });
  });

  socket.on('sosAlert', (data) => {
    io.emit('caregiver_notification', { type: 'sos', ...data });
  });

  socket.on('reminderMissed', (data) => {
    io.emit('caregiver_notification', { type: 'reminder_missed', ...data });
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, ()=> console.log(`Server running on ${PORT}`));

// background job: check missed reminders every 30s (demo)
setInterval(async ()=>{
  const now = new Date();
  const missed = await Reminder.find({ taken: false, time: { $lte: now }});
  for (const r of missed) {
    // notify caregivers
    io.emit('caregiver_notification', { type: 'reminder_missed', reminder: r });
    // optional: mark as taken true to avoid repeated alerts or leave for repeated alerts depending on desired behavior
    // await Reminder.findByIdAndUpdate(r._id, { taken: true });
  }
}, 30 * 1000);
