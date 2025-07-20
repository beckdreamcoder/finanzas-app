import React from 'react';
import '../styles/Sidebar.scss';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const esActivo = (ruta) => location.pathname === ruta ? 'activo' : '';

  return (
    <aside className="sidebar">
      <h2 className="logo">
        <span className="logo-dot" /> FINANCETRACKER
      </h2>

      <div className="nav-superior">
        <ul className="nav-links">
          <li className={esActivo('/bienvenido')} onClick={() => navigate('/bienvenido')}>
            🏠 INICIO
          </li>
          <li className={esActivo('/movimientos')} onClick={() => navigate('/movimientos')}>
            💳 MOVIMIENTOS
          </li>
          <li className={esActivo('/presupuestos')} onClick={() => navigate('/presupuestos')}>
            📊 PRESUPUESTOS
          </li>
          <li className={esActivo('/metas')} onClick={() => navigate('/metas')}>
            💰 METAS DE AHORRO
          </li>
          <li className={esActivo('/reportes')} onClick={() => navigate('/reportes')}>
            📈 REPORTES
          </li>
        </ul>
      </div>

      <div className="nav-inferior">
        <ul className="nav-links ayuda">
          <li>❓ AYUDA</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
