import React from 'react';
import '../styles/app.css';
const Header = ({ setLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <div style={{ padding: '10px', textAlign: 'right' }}>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
