import React from 'react';
import '../styles/MovimientoItem.scss';

const MovimientoItem = ({ movimiento, onEditar, onEliminar }) => {
  const { descripcion, monto, tipo, fecha, categoria } = movimiento;

  const fechaFormateada = new Date(fecha).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    secondary: '2-digit',
  });

  return (
    <div className={`item-movimiento ${tipo.toLowerCase()}`}>
      <div className="detalle">
        <div className="descripcion">
          <strong>{descripcion}</strong>
          <small>{categoria}</small>
        </div>
        <div className="fecha">
          <small>{fechaFormateada}</small>
        </div>
      </div>

      <div className="acciones">
        <span
          className={`monto ${tipo === 'INGRESO' ? 'positivo' : 'negativo'}`}
        >
          {tipo === 'INGRESO' ? '+ ' : '- '}S/ {monto.toLocaleString('es-PE')}
        </span>

        <button className="accion-btn editar" onClick={() => onEditar(movimiento)}>
          ✏️
        </button>
        
        {/* <button className="accion-btn eliminar" onClick={() => onEliminar(movimiento)}>
          🗑️
        </button> */}
      </div>
    </div>
  );
};

export default MovimientoItem;
