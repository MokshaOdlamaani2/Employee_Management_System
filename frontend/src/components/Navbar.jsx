// src/components/Navbar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { FiHome, FiUserPlus, FiDownload, FiLogOut, FiUsers } from 'react-icons/fi';
import '../styles/navbar.css';

const Navbar = ({ data }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role') || 'Admin';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const csvHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Position', key: 'position' },
    { label: 'Department', key: 'department' },
    { label: 'Phone', key: 'phone' },
    { label: 'Address', key: 'address' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-logo">EMS</div>

      <ul className="navbar-links">
        <li>
          <NavLink to="/dashboard" className="nav-link">
            <FiHome className="nav-icon" /> Dashboard
          </NavLink>
        </li>

        {role !== 'HR' && (
          <li>
            <NavLink to="/add" className="nav-link">
              <FiUserPlus className="nav-icon" /> Add Employee
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/employees" className="nav-link">
            <FiUsers className="nav-icon" /> Employee List
          </NavLink>
        </li>

        <li>
          <CSVLink
            data={data || []}
            headers={csvHeaders}
            filename="employees.csv"
            className="nav-link"
          >
            <FiDownload className="nav-icon" /> Download Data
          </CSVLink>
        </li>

        <li>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut className="nav-icon" /> Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
