import React from "react";
import "../styles/components/reportes.css";

const Reportes = () => {
  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo"></div>
        <div className="app-title">FINANCETRACKER</div>

        <nav>
          <a href="#" className="nav-item inicio">INICIO</a>
          <a href="#" className="nav-item movimiento">MOVIMIENTO</a>
          <a href="#" className="nav-item presupuesto">PRESUPUESTO</a>
          <a href="#" className="nav-item reportes active">REPORTES</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div>
            <h1 className="welcome">HOLA, JHAIR</h1>
            <p className="header-subtitle">REPORTES Y ANÁLISIS</p>
          </div>
          <div className="header-actions">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">⚙️</button>
            <button className="icon-btn">👤</button>
          </div>
        </div>

        {/* Grid de Reportes */}
        <div className="reports-grid">
          {/* Categoría por gastos */}
          <div className="report-card">
            <div className="report-header">
              <h2 className="report-title">CATEGORÍA POR GASTOS</h2>
            </div>
            <div className="categories-list">
              <div className="category-item">
                <div className="category-info">
                  <div className="category-icon alimentacion"></div>
                  <span className="category-name">🍽️ Alimentación</span>
                </div>
                <span className="category-amount">S/ 600</span>
              </div>
              <div className="category-item">
                <div className="category-info">
                  <div className="category-icon transporte"></div>
                  <span className="category-name">🚗 Transporte</span>
                </div>
                <span className="category-amount">S/ 200</span>
              </div>
              <div className="category-item">
                <div className="category-info">
                  <div className="category-icon entretenimiento"></div>
                  <span className="category-name">🎮 Entretenimiento</span>
                </div>
                <span className="category-amount">S/ 100</span>
              </div>
            </div>
          </div>

          {/* Resumen del mes */}
          <div className="summary-card">
            <div className="summary-header">
              <h2 className="report-title">RESUMEN EL MES</h2>
            </div>
            <div className="summary-list">
              <div className="summary-item movements">
                <span className="summary-label">TOTAL DE MOVIMIENTOS</span>
                <span className="summary-value movements">156</span>
              </div>
              <div className="summary-item income">
                <span className="summary-label">INGRESOS TOTALES</span>
                <span className="summary-value income">S/ 10,000</span>
              </div>
              <div className="summary-item expense">
                <span className="summary-label">GASTOS TOTALES</span>
                <span className="summary-value expense">-S/ 500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Exportación */}
        <div className="export-section">
          <div className="export-title">EXPORTAR DATOS</div>
          <div className="export-subtitle">Descarga tus movimientos</div>
          <button className="export-btn excel">Exportar Excel</button>
          <button className="export-btn pdf">Exportar PDF</button>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
