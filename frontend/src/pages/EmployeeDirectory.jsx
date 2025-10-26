import React, { useEffect, useState, useRef } from 'react';
import axios from '../utils/axiosInstance';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import '../styles/app.css';

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const editRef = useRef(null); // Reference to the edit form container

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/employees');
      setEmployees(res.data);
      setSelectedEmployee(null);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  // Scroll to edit form whenever selectedEmployee changes
  useEffect(() => {
    if (selectedEmployee && editRef.current) {
      editRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedEmployee]);

  return (
    <div className="page-content">
      <h1>Employee Directory</h1>
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
        👥 Total Employees: {employees.length}
      </p>

      {selectedEmployee && (
        <div ref={editRef} className="update-container">
          <div className="update-header">
            <h3>Edit Employee</h3>
            <button
              className="close-btn"
              onClick={() => setSelectedEmployee(null)}
              aria-label="Close Edit Form"
            >
              ✖
            </button>
          </div>
          <EmployeeForm
            refresh={fetchEmployees}
            selectedEmployee={selectedEmployee}
            clearEdit={() => setSelectedEmployee(null)}
          />
        </div>
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
