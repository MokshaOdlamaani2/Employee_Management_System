// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import { CSVLink } from 'react-csv';
import DashboardAnalytics from '../components/DashboardAnalytics';
import '../styles/app.css';

const Dashboard = ({ employees, fetchEmployees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const filteredEmployees = employees.filter((emp) => {
    const matchesName = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter ? emp.department === departmentFilter : true;
    return matchesName && matchesDept;
  });

  const departmentIcons = {
    HR: '🧑‍💼',
    IT: '💻',
    Sales: '📈',
    Marketing: '📣',
    Finance: '💰',
    Admin: '📋',
    Others: '🏢',
  };

  const uniqueDepartments = [...new Set(employees.map((emp) => emp.department))];

  return (
    <div className="page-content">
      <h1>Dashboard</h1>

      <div className="dashboard-metrics">
        <div className="metric-card">👥 Total: {employees.length}</div>
        <div className="metric-card">Departments: {uniqueDepartments.length}</div>
        <div className="metric-card">Filtered: {departmentFilter || 'All'}</div>
      </div>

      {/* Dashboard Analytics Pie Chart */}
      <DashboardAnalytics employees={employees} />

      <div className="filter-bar">
        <div className="search-group" style={{ flex: '3' }}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          style={{ flex: '1' }}
        >
          <option value="">🏢 All</option>
          {uniqueDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {departmentIcons[dept] || '🏢'} {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="export-bar">
        <CSVLink
          data={filteredEmployees}
          filename="employees.csv"
          className="export-btn"
        >
          📥 Export CSV
        </CSVLink>
      </div>

      <EmployeeList
        employees={filteredEmployees}
        refresh={fetchEmployees}
        setSelectedEmployee={setSelectedEmployee}
        isEditable={false}
      />
    </div>
  );
};

export default Dashboard;
