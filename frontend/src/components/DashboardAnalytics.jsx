// src/components/DashboardAnalytics.jsx
import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF66C4'];

const DashboardAnalytics = ({ employees }) => {
  // Employees per department (for Pie & Bar)
  const departmentCount = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  // Employees per position (for Bar)
  const positionCount = employees.reduce((acc, emp) => {
    acc[emp.position] = (acc[emp.position] || 0) + 1;
    return acc;
  }, {});

  // Example: Average phone availability (dummy for Line Chart)
  // Just to demo, % of employees with phone number per dept over "time"
  // (replace with real time series if you have)


  // Prepare data for Pie Chart
  const pieData = Object.entries(departmentCount).map(([name, value]) => ({ name, value }));

  // Prepare data for Bar Chart (positions)
  const barDataPositions = Object.entries(positionCount).map(([name, value]) => ({ name, value }));

  if (employees.length === 0) return <p>No data available for analytics.</p>;

  return (
    <div className="analytics-container">

      <div className="chart-box">
        <h3>Employee Distribution by Department</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Employees per Position</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barDataPositions} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    

      {/* Add more charts here as needed */}

    </div>
  );
};

export default DashboardAnalytics;
