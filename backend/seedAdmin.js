require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash('admin123', 10);
  const existing = await Admin.findOne({ email: 'admin@gmail.com' });

  if (existing) {
    await Admin.updateOne({ email: 'admin@gmail.com' }, { password: hashedPassword });
    console.log('✅ Admin password updated');
  } else {
    await Admin.create({ email: 'admin@gmail.com', password: hashedPassword });
    console.log('✅ Admin created');
  }

  process.exit();
};

seedAdmin();
