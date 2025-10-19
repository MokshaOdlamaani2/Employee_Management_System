const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Employee = require('../models/Employee');

const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

// 🔐 All routes protected by `authMiddleware`
router.get('/', protect, getEmployees);            // GET all employees
router.post('/', protect, createEmployee);         // POST single employee
router.put('/:id', protect, updateEmployee);       // PUT (update) employee
router.delete('/:id', protect, deleteEmployee);    // DELETE employee

// ✅ BULK INSERT route
router.post('/bulk', protect, async (req, res) => {
  try {
    const inserted = await Employee.insertMany(req.body);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ message: 'Bulk insert failed', error: err.message });
  }
});

module.exports = router;
