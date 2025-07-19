import React from 'react';
import '../styles/Sidebar.scss';

const Sidebar = () => (
  <aside className="sidebar">
    <h2 className="logo">
      <span className="logo-dot" /> FINANCETRACKER
    </h2>

    {/* Envolvemos la parte superior */}
    <div className="nav-superior">
      <ul className="nav-links">
        <li className="activo">🏠 INICIO</li>
        <li>💳 MOVIMIENTOS</li>
        <li>📊 PRESUPUESTOS</li>
        <li>💰 METAS DE AHORRO</li>
        <li>📈 REPORTES</li>
      </ul>
    </div>

    {/* Parte inferior */}
    <div className="nav-inferior">
      <ul className="nav-links ayuda">
        <li>❓ AYUDA</li>
      </ul>
    </div>
  </aside>
);


export default Sidebar;


