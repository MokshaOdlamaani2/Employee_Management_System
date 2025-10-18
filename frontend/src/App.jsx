import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddEmployee from './pages/AddEmployee';
import EmployeeDirectory from './pages/EmployeeDirectory';
import Navbar from './components/Navbar';
import axios from './utils/axiosInstance';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); // Flag for loading employees

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
    if (token) {
      fetchEmployees();
    } else {
      setLoading(false); // no need to fetch if not logged in
    }
  }, []);

  return (
    <Router>
      {/* Navbar only if logged in and loading finished */}
      {loggedIn && !loading && <Navbar data={employees} />}

      <div className="page-content">
        <Routes>
          <Route
            path="/login"
            element={
              loggedIn ? <Navigate to="/dashboard" /> : <Login setLoggedIn={setLoggedIn} />
            }
          />
          <Route
            path="/dashboard"
            element={
              loggedIn ? (
                <Dashboard employees={employees} fetchEmployees={fetchEmployees} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add"
            element={
              loggedIn ? <AddEmployee fetchEmployees={fetchEmployees} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/employees"
            element={loggedIn ? <EmployeeDirectory /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to={loggedIn ? '/dashboard' : '/login'} />} />
        </Routes>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
