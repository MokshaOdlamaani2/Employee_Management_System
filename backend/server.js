const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOriginPattern = /^https:\/\/employee-management-system-azure-eight\.vercel\.app(\/.*)?$/;

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      // Allow non-browser clients like Postman or curl
      return callback(null, true);
    }

    if (allowedOriginPattern.test(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
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
