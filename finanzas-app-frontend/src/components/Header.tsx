import React from 'react';
import '../styles/components/header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="user-info">
        <span className="user-name">👤 Usuario</span>
      </div>
    </header>
  );
};

export default Header;
