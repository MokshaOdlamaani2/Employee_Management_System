require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ Allowed origins: local dev + production frontend from .env
const allowedOrigins = [
  'http://localhost:5173',        // local dev
  process.env.FRONTEND_URL         // production frontend URL
].filter(Boolean);                // remove undefined if FRONTEND_URL missing

// ✅ CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    // allow requests like Postman, curl (no origin)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`❌ CORS blocked for origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// ✅ Handle preflight requests
app.options('*', cors());

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));

// ✅ Serve frontend (optional for Render)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist'))); // adjust if your frontend is built differently

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

// ✅ Connect to MongoDB & start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
  })
  .catch(err => console.error('❌ DB connection failed:', err));
