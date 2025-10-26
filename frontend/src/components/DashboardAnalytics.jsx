import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF66C4'];

const DashboardAnalytics = ({ employees }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!employees || employees.length === 0) return <p>No data available for analytics.</p>;

  // Count employees per department
  const departmentCount = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  // Count employees per position
  const positionCount = employees.reduce((acc, emp) => {
    acc[emp.position] = (acc[emp.position] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(departmentCount).map(([name, value]) => ({ name, value }));
  const barDataPositions = Object.entries(positionCount).map(([name, value]) => ({ name, value }));

  return (
    <div className="analytics-container">
      {/* Pie Chart */}
      <div className="chart-box">
        <h3>Employee Distribution by Department</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={isDesktop} // labels only visible on desktop
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip /> {/* shows values on hover */}
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="chart-box">
        <h3>Employees per Position</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barDataPositions} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={false} />  {/* hides all x-axis labels */}
            <YAxis allowDecimals={false} />
            <Tooltip /> {/* shows values on hover */}
            <Bar dataKey="value" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
