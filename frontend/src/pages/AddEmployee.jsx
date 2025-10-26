// src/pages/AddEmployee.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import EmployeeForm from '../components/EmployeeForm';
import { useNavigate } from 'react-router-dom';
import '../styles/employeeForm.css';

const AddEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/employees');
      setEmployees(res.data);
      setSelectedEmployee(null);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role === 'HR') {
      navigate('/dashboard'); // 🚫 Prevent access for HR
    } else {
      fetchEmployees();
    }
  }, []);

  return (
    <div className="page-content">
      <h1>Add Employee</h1>
      <EmployeeForm
        refresh={fetchEmployees}
        selectedEmployee={selectedEmployee}
        clearEdit={() => setSelectedEmployee(null)}
      />
    </div>
  );
};

export default AddEmployee;
