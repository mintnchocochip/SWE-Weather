import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'HOME', icon: '🏠' },
    { path: '/map', label: 'MAP', icon: '🗺️' },
    { path: '/favorites', label: 'FAVS', icon: '💖' },
    { path: '/settings', label: 'OPTIONS', icon: '⚙️' }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`nav-button ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <div style={{ fontSize: '14px', marginBottom: '2px' }}>{item.icon}</div>
          <div style={{ fontSize: '8px' }}>{item.label}</div>
        </button>
      ))}
    </div>
  );
};

export default BottomNavigation;
