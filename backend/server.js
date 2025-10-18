// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Secure CORS config
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json());

// Connect DB and start server
connectDB()
  .then(() => {
    app.use('/api/employees', require('./routes/employeeRoutes'));
    app.use('/api/auth', require('./routes/authRoutes'));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to database:', err);
  });
