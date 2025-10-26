const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  // your login logic
  res.json({ message: 'Login successful' });
});

module.exports = router;
