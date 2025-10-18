import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/employeeForm.css'; // ✅ Separated scoped styles

const departmentIcons = {
  HR: '🧑‍💼',
  IT: '💻',
  Sales: '📈',
  Marketing: '📣',
  Finance: '💰',
  Admin: '📋',
  Others: '🏢',
};

const departmentOptions = Object.keys(departmentIcons);

const EmployeeForm = ({ refresh, selectedEmployee, clearEdit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (selectedEmployee) setForm(selectedEmployee);
  }, [selectedEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, position, department } = form;
    if (!name || !email || !position || !department) {
      toast.warning('⚠️ Please fill in all required fields.');
      return;
    }

    try {
      if (selectedEmployee) {
        await axios.put(`/employees/${selectedEmployee._id}`, form);
        toast.success(' Employee updated successfully!');
        clearEdit();
      } else {
        await axios.post('/employees', form);
        toast.success('Employee added successfully!');
      }

      setForm({
        name: '',
        email: '',
        position: '',
        department: '',
        phone: '',
        address: '',
      });
      refresh();
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error('🚫 Email already exists.');
      } else if (err.response?.status === 400) {
        toast.error(' Invalid input. Please check all fields.');
      } else {
        toast.error('⚠️ Something went wrong.');
      }
      console.error('Error saving employee:', err);
    }
  };

  return (
    <div className="employee-form-wrapper">
      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="employee-form-group">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="👤 Enter name"
            required
          />
        </div>

        <div className="employee-form-group">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder=" Enter email"
            required
          />
        </div>

        <div className="employee-form-group">
          <label>Position</label>
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder=" Enter position"
            required
          />
        </div>

        <div className="employee-form-group">
          <label>Department</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value=""> Select Department</option>
            {departmentOptions.map((dept) => (
              <option key={dept} value={dept}>
                {departmentIcons[dept]} {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="employee-form-group">
          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder=" Enter phone"
          />
        </div>

        <div className="employee-form-group">
          <label>Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder=" Enter address"
          />
        </div>

        <button type="submit" className="employee-submit-btn">
          {selectedEmployee ? ' Update Employee' : ' Add Employee'}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
