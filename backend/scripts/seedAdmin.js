require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ DB connected');

    const existing = await Admin.findOne({ email: 'admin@gmail.com' });

    if (existing) {
      console.log('ℹ️ Admin already exists.');
    } else {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({ email: 'admin@gmail.com', password: hashedPassword });
      console.log('✅ Admin seeded: admin@gmail.com / admin123');
    }

    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedAdmin();
