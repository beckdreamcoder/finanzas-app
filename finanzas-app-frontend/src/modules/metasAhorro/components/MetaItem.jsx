// src/modules/metasAhorro/components/MetaItem.jsx
import React from 'react';
import '../styles/MetaItem.scss';

const MetaItem = ({ meta, onEditar, onEliminar, onAportar }) => {
  const porcentaje = Math.min((meta.montoActual / meta.montoObjetivo) * 100, 100);

  const getColorPorcentaje = (valor) => {
    if (valor >= 100) return 'completed';
    if (valor >= 75) return 'green';
    if (valor >= 25) return 'yellow';
    return 'red';
  };

  return (
    <div className="meta-item">
      <div className="meta-info">
        <h4>{meta.descripcion}</h4>

        <div className="meta-detalles">
          <p><strong>Objetivo:</strong> S/ {meta.montoObjetivo.toFixed(2)}</p>
          <p><strong>Ahorrado:</strong> S/ {meta.montoActual?.toFixed(2) || 0}</p>
          <p><strong>Fecha límite:</strong> {meta.fechaLimite}</p>
          <p><strong>Fecha actual:</strong> {meta.fechaActual}</p>
          <p><strong>Restante:</strong> S/ {meta.montoFaltante?.toFixed(2)}</p>
          <p><strong>Aporte sugerido hoy:</strong> <span className="aporte">S/ {meta.aporteSugerido?.toFixed(2)}</span></p>
          <p><strong>Estado:</strong> {meta.cumplida ? '✅ Completada' : '⏳ En progreso'}</p>
        </div>

        <div className="barra-progreso">
          <div className={`relleno ${getColorPorcentaje(porcentaje)}`} style={{ width: `${porcentaje}%` }} />
        </div>
        <p className="porcentaje">{porcentaje.toFixed(1)}% alcanzado</p>

        <p className="mensaje-motivacional">{meta.mensajeMotivacional}</p>

        <button className="btn-aportar" onClick={onAportar}>Aportar</button>
      </div>

      <div className="meta-acciones">
        <button onClick={onEditar}>✏️</button>
        <button onClick={onEliminar}>🗑️</button>
      </div>
    </div>
  );
};

export default MetaItem;