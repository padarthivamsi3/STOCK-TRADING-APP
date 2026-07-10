import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sbstocks');
  const existing = await User.findOne({ email: 'demo@sbstocks.com' });
  if (!existing) {
    const password = await bcrypt.hash('demo1234', 10);
    await User.create({ name: 'Demo Trader', email: 'demo@sbstocks.com', password, virtualBalance: 100000 });
  }
  console.log('Seed complete');
  process.exit();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
