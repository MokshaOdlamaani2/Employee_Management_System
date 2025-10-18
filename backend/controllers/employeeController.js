const Employee = require('../models/Employee');

// GET all employees
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};
// controllers/employeeController.js
exports.createEmployee = async (req, res) => {
  const { name, email, position, department, phone, address } = req.body;

  if (!name || !email || !position || !department) {
    return res.status(400).json({ message: 'All required fields are missing' });
  }

  const existing = await Employee.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already exists' });

  try {
    const newEmp = await Employee.create({ name, email, position, department, phone, address });
    res.status(201).json(newEmp);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// DELETE employee
exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
};

