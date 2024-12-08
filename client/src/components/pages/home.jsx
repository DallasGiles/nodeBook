import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication tokens or data
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="homepage">
      <h1>Welcome to NodeBook!</h1>
      <p>This is your dashboard. Start exploring the app now!</p>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Homepage;