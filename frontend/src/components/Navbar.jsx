// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import { FiHome, FiUserPlus, FiDownload, FiLogOut, FiUsers, FiMenu, FiX } from 'react-icons/fi';
import '../styles/navbar.css';

const Navbar = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem('role') || 'Admin';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

      {/* Hamburger Menu Button */}
      <button className="menu-btn" onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Navbar Links */}
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
            <FiHome className="nav-icon" /> Dashboard
          </NavLink>
        </li>

        {role !== 'HR' && (
          <li>
            <NavLink to="/add" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FiUserPlus className="nav-icon" /> Add Employee
            </NavLink>
          </li>
        )}

        <li>
          <NavLink to="/employees" className="nav-link" onClick={() => setMenuOpen(false)}>
            <FiUsers className="nav-icon" /> Employee List
          </NavLink>
        </li>

        <li>
          <CSVLink
            data={data || []}
            headers={csvHeaders}
            filename="employees.csv"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
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
