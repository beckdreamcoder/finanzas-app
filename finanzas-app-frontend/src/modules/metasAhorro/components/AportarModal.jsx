// src/modules/metasAhorro/components/AportarModal.jsx
import React, { useState } from 'react';
import '../styles/AportarModal.scss';

const AportarModal = ({ meta, onClose, onConfirm }) => {
  const [monto, setMonto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const montoNumerico = parseFloat(monto);
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      alert('Ingresa un monto válido mayor a 0');
      return;
    }

    onConfirm(montoNumerico);
    setMonto('');
    onClose();
  };

  if (!meta) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h3>
          💰 Aportar a <span className="meta-nombre">“{meta.descripcion}”</span>
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Monto a aportar"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            min="0"
            step="0.01"
          />

          <div className="acciones">
            <button type="submit" className="btn-confirmar">Aportar</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AportarModal;
