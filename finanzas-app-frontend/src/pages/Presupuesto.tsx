import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import '../styles/components/presupuesto.css';

const presupuestosEjemplo = [
  {
    id: 1,
    categoria: "Alimentación",
    gastado: 600,
    presupuesto: 1200,
    disponible: 600,
    porcentaje: 50,
    estado: "En límite",
    icono: "food"
  },
  {
    id: 2,
    categoria: "Transporte",
    gastado: 100,
    presupuesto: 200,
    disponible: 100,
    porcentaje: 50,
    estado: "En límite",
    icono: "transport"
  },
  {
    id: 3,
    categoria: "Entretenimiento",
    gastado: 250,
    presupuesto: 500,
    disponible: 250,
    porcentaje: 50,
    estado: "En límite",
    icono: "entertainment"
  },
  {
    id: 4,
    categoria: "Salud",
    gastado: 600,
    presupuesto: 800,
    disponible: 200,
    porcentaje: 75,
    estado: "Excedido",
    icono: "health"
  }
];

const Presupuesto = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="presupuesto-page">
      <Sidebar />
      <main className="presupuesto-main">
        <div className="presupuesto-header">
          <div>
            <div className="presupuesto-title">HOLA, USUARIO</div>
            <div className="presupuesto-subtitle">PRESUPUESTO</div>
          </div>
          <button className="btn-new-budget" onClick={() => setShowModal(true)}>
            Nuevo presupuesto
          </button>
        </div>

        <div className="budget-list">
          {presupuestosEjemplo.map((item) => (
            <div key={item.id} className={`budget-item ${item.estado === "Excedido" ? "exceeded" : ""}`}>
              <div className="budget-header">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className={`budget-icon ${item.icono}`}></div>
                  <div className="budget-info">
                    <div className="budget-name">{item.categoria}</div>
                    <div className="budget-spent">GASTADO: S/ {item.gastado}</div>
                    <div className="budget-percentage">{item.porcentaje}% UTILIZADO</div>
                  </div>
                </div>
                <div className="budget-status">{item.estado}</div>
              </div>
              <div className="budget-amounts">
                <div className="budget-amount">PRESUPUESTO: S/ {item.presupuesto}</div>
                <div className="budget-available">DISPONIBLE: S/ {item.disponible}</div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${item.porcentaje}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="presupuesto-modal" onClick={() => setShowModal(false)}>
            <div className="presupuesto-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="presupuesto-modal-header">
                <div className="presupuesto-modal-icon"></div>
                <div>
                  <div className="presupuesto-modal-title">FINANCETRACKER</div>
                  <div className="presupuesto-modal-subtitle">NUEVO PRESUPUESTO</div>
                </div>
              </div>
              <form>
                <div className="presupuesto-form-group">
                  <label className="presupuesto-form-label">Categoría</label>
                  <select className="presupuesto-form-select" required>
                    <option value="">Seleccionar categoría</option>
                    <option value="alimentacion">Alimentación</option>
                    <option value="transporte">Transporte</option>
                    <option value="entretenimiento">Entretenimiento</option>
                    <option value="salud">Salud</option>
                    <option value="educacion">Educación</option>
                    <option value="hogar">Hogar</option>
                    <option value="ropa">Ropa</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                <div className="presupuesto-form-group">
                  <label className="presupuesto-form-label">Monto del presupuesto</label>
                  <input type="number" className="presupuesto-form-input" placeholder="0.00" step="0.01" required />
                </div>

                <div className="presupuesto-form-group">
                  <label className="presupuesto-form-label">Período</label>
                  <select className="presupuesto-form-select" required>
                    <option value="mensual">Mensual</option>
                    <option value="semanal">Semanal</option>
                    <option value="anual">Anual</option>
                  </select>
                </div>

                <div className="presupuesto-form-group">
                  <label className="presupuesto-form-label">Fecha de inicio</label>
                  <input type="date" className="presupuesto-form-input" required />
                </div>

                <div className="presupuesto-form-group">
                  <label className="presupuesto-form-label">Alertas</label>
                  <div className="presupuesto-form-alerts">
                    <div className="presupuesto-alert-option">
                      <input type="checkbox" id="alert50" />
                      <label htmlFor="alert50">🔔 NOTIFICAR AL 50%</label>
                    </div>
                    <div className="presupuesto-alert-option">
                      <input type="checkbox" id="alert100" />
                      <label htmlFor="alert100">🔔 NOTIFICAR AL EXCEDER</label>
                    </div>
                  </div>
                </div>

                <div className="presupuesto-form-group">
                  <label className="presupuesto-form-label">Descripción</label>
                  <textarea className="presupuesto-form-textarea" placeholder="Descripción opcional..."></textarea>
                </div>

                <div className="presupuesto-form-actions">
                  <button type="button" className="presupuesto-btn-cancel" onClick={() => setShowModal(false)}>
                    CANCELAR
                  </button>
                  <button type="submit" className="presupuesto-btn-create">
                    CREAR PRESUPUESTO
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Presupuesto;