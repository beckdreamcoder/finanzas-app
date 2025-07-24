// src/modules/metasAhorro/components/MetaItem.jsx
// src/modules/metasAhorro/components/MetaItem.jsx
import React from 'react';
import '../styles/MetaItem.scss';

const MetaItem = ({ meta, onEditar, onEliminar, onAportar }) => {
  const porcentaje = Math.min((meta.montoActual / meta.montoObjetivo) * 100, 100);

  const getColorPorcentaje = (valor) => {
    if (valor >= 100) return 'completed';
    if (valor >= 75) return 'barra-verde';
    if (valor >= 25) return 'barra-amarilla';
    return 'barra-roja';
  };

  const fechaLimite = new Date(meta.fechaLimite);
  const fechaActual = new Date(meta.progreso?.fechaActual || new Date());
  const estaVencida = fechaActual > fechaLimite;

  return (
    <div className="meta-item">
      <div className="meta-info">
        <h4>{meta.descripcion}</h4>

        <div className="detalles-meta">
          <p><span>🎯 Objetivo:</span> S/ {meta.montoObjetivo.toFixed(2)}</p>
          <p><span>💰 Ahorrado:</span> S/ {meta.montoActual?.toFixed(2) || 0}</p>
          <p><span>📅 Fecha límite:</span> {meta.fechaLimite}</p>
          <p><span>🗓️ Hoy:</span> {meta.progreso?.fechaActual || '-'}</p>
          <p><span>🔻 Restante:</span> S/ {meta.progreso?.montoFaltante?.toFixed(2) || '0.00'}</p>
          <p><span>💡 Aporte sugerido:</span> S/ {meta.progreso?.aporteSugerido?.toFixed(2) || '0.00'}</p>
          <p><span>📊 Estado:</span> {meta.cumplida ? '✅ Completada' : estaVencida ? '⚠️ Vencida' : '⏳ En progreso'}</p>
        </div>

        <div className="barra-progreso">
          <div
            className={`relleno ${getColorPorcentaje(porcentaje)}`}
            style={{ width: `${porcentaje}%` }}
          />
        </div>

        <p className="porcentaje">{porcentaje.toFixed(1)}% alcanzado</p>

        {meta.progreso?.mensajeMotivacional && (
          <p className="mensaje-motivacional">📝 {meta.progreso.mensajeMotivacional}</p>
        )}

        {estaVencida && (
          <p className="mensaje-vencida">
            ⚠️ Meta vencida - elimina la meta para recuperar el dinero
          </p>
        )}

        <button
          className="btn-aportar"
          onClick={onAportar}
          disabled={estaVencida}
        >
          Aportar
        </button>
      </div>

      <div className="meta-acciones">
        <button onClick={onEditar}>✏️</button>
        <button onClick={onEliminar}>🗑️</button>
      </div>
    </div>
  );
};

export default MetaItem;
