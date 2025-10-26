require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// ✅ Allowed origins: local dev + production
const allowedOrigins = [
  'http://localhost:5173', // local frontend dev
  process.env.FRONTEND_URL  // production frontend from .env
].filter(Boolean); // remove undefined if FRONTEND_URL is missing

// ✅ CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      // Allow requests like curl, Postman, mobile apps
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn(`❌ CORS blocked for origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));

// ✅ Connect DB & start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ DB connection failed:', err));
