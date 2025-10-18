const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // ✅ Include role in response
    res.json({ token, role: admin.role });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};