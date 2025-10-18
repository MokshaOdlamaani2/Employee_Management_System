const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const Employee = require('../models/Employee'); // ✅ don't forget this import

const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

router.get('/', protect, getEmployees);
router.post('/', protect, createEmployee);
router.put('/:id', protect, updateEmployee);
router.delete('/:id', protect, deleteEmployee);


// ✅ This route should also use `protect`
router.post('/bulk', protect, async (req, res) => {
  try {
    const inserted = await Employee.insertMany(req.body);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ message: 'Bulk insert failed', error: err.message });
  }
});


module.exports = router;
