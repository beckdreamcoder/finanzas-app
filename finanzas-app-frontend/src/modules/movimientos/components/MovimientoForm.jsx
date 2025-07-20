import React, { useState } from 'react';
import { registrarMovimiento } from '../services/movimientoService';
import '../styles/MovimientoForm.scss';

const MovimientoForm = ({ onClose, onSuccess }) => {
  const [tipo, setTipo] = useState('INGRESO');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [guardando, setGuardando] = useState(false);

  const hayCambios = () =>
    descripcion.trim() !== '' || monto.trim() !== '' || fecha !== new Date().toISOString().split('T')[0];

  const handleClose = () => {
    if (hayCambios()) {
      const confirmacion = window.confirm('¿Seguro que deseas cerrar el formulario? Se perderán los datos.');
      if (!confirmacion) return;
    }
    onClose();
  };

  const validar = () => {
    if (!descripcion.trim()) {
      alert('La descripción es obligatoria');
      return false;
    }
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      alert('El monto debe ser un número positivo');
      return false;
    }
    if (!fecha) {
      alert('La fecha es obligatoria');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    try {
      setGuardando(true);
      const token = localStorage.getItem('token');
      const dto = {
        tipo,
        descripcion: descripcion.trim(),
        monto: parseFloat(monto),
        fecha,
      };

      await registrarMovimiento(token, dto);
      if (onSuccess) onSuccess();
      alert('✅ Movimiento registrado correctamente');
      onClose();
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('❌ Ocurrió un error al registrar el movimiento.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal-formulario">
      <div className="formulario-contenido">
        <div className="form-header">
          <h2><span role="img" aria-label="icon">💳</span> Nuevo Movimiento</h2>
          <button className="boton-cerrar" onClick={handleClose}>×</button>
        </div>

        <div className="toggle-tipo">
          <button
            type="button"
            className={tipo === 'INGRESO' ? 'activo-ingreso' : ''}
            onClick={() => setTipo('INGRESO')}
          >
            Ingreso
          </button>
          <button
            type="button"
            className={tipo === 'GASTO' ? 'activo-gasto' : ''}
            onClick={() => setTipo('GASTO')}
          >
            Gasto
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Descripción</label>
          <input
            type="text"
            placeholder="Ej: Pago mensual"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <label>Monto</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
          />

          <label>Fecha</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />

          <button type="submit" className={`btn-guardar ${tipo.toLowerCase()}`} disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar Movimiento'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovimientoForm;
