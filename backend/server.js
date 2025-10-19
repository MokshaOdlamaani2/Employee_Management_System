const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOriginPattern = /^https:\/\/employee-management-system-azure-eight\.vercel\.app(\/.*)?$/;

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOriginPattern.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ✅ API routes mounted under /api
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
  console.error('❌ Failed to connect to database:', err);
});
