require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/dementia-demo';

async function run(){
  await mongoose.connect(MONGO);
  await User.deleteMany({});
  const pass = await bcrypt.hash('password', 10);
  const users = [
    { name: 'Patient One', email: 'patient1@example.com', passwordHash: pass, role: 'patient' },
    { name: 'Patient Two', email: 'patient2@example.com', passwordHash: pass, role: 'patient' },
    { name: 'Caregiver Demo', email: 'caregiver@example.com', passwordHash: pass, role: 'caregiver' }
  ];
  await User.insertMany(users);
  console.log('Seeded users: patient1@example.com / password');
  process.exit(0);
}
run();
