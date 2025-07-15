import React from 'react';

const Sidebar = () => (
  <aside className="sidebar">
    <h2 className="logo">
      <span className="logo-dot" /> FINANCETRACKER
    </h2>
    <ul className="nav-links">
      <li className="activo">🏠 INICIO</li>
      <li>💳 MOVIMIENTO</li>
      <li>📊 PRESUPUESTO</li>
      <li>📈 REPORTES</li>
      <li>❓ AYUDA</li>
    </ul>
  </aside>
);

export default Sidebar;
