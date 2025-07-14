import React from 'react';
import '../styles/components/sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="logo-area">$</div>
      <nav className="nav">
        <a href="/dashboard">🏠 Dashboard</a>
        <a href="/movimiento">📈 Movimientos</a>
        <a href="/presupuesto">📊 Presupuesto</a>
        <a href="/reportes">📋 Reportes</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
