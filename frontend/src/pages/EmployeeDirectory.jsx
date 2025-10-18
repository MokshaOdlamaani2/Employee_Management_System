// src/pages/EmployeeDirectory.jsx
import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import '../styles/app.css';
const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/employees');
      setEmployees(res.data);
      setSelectedEmployee(null); // Reset form after update
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="page-content">
      <h1>Employee Directory</h1>
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
        👥 Total Employees: {employees.length}
      </p>

      {}
      {selectedEmployee && (
        <>
          <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Edit Employee</h3>
          <EmployeeForm
            refresh={fetchEmployees}
            selectedEmployee={selectedEmployee}
            clearEdit={() => setSelectedEmployee(null)}
          />
        </>
      )}


      <EmployeeList
        employees={employees}
        refresh={fetchEmployees}
        setSelectedEmployee={setSelectedEmployee} 
        isEditable={true} 
      />
    </div>
  );
};

export default EmployeeDirectory;
