// src/modules/movimientos/components/MovimientoForm.jsx
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { registrarMovimiento, actualizarMovimiento } from '../services/movimientoService';
import '../styles/MovimientoForm.scss';

const MovimientoForm = ({ onClose, onSuccess, movimientoActual, modoEdicion }) => {
  const [tipo, setTipo] = useState('INGRESO');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [guardando, setGuardando] = useState(false);

  // Precargar datos si estamos editando
  useEffect(() => {
    if (modoEdicion && movimientoActual) {
      setTipo(movimientoActual.tipo);
      setDescripcion(movimientoActual.descripcion);
      setMonto(movimientoActual.monto.toString());
      setFecha(movimientoActual.fecha.split('T')[0]);
    }
  }, [modoEdicion, movimientoActual]);

  const hayDatos = () =>
    descripcion.trim() !== '' || monto.trim() !== '' || fecha !== new Date().toISOString().split('T')[0];

  const handleClose = () => {
    if (!hayDatos()) {
      onClose();
      return;
    }

    Swal.fire({
      title: '¿Cerrar sin guardar?',
      text: 'Hay datos sin guardar. ¿Estás seguro que quieres salir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onClose();
      }
    });
  };

  const validar = () => {
    if (!descripcion.trim()) {
      Swal.fire('Campo obligatorio', 'La descripción es obligatoria.', 'warning');
      return false;
    }

    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      Swal.fire('Monto inválido', 'El monto debe ser un número mayor que 0.', 'warning');
      return false;
    }

    if (!fecha) {
      Swal.fire('Fecha requerida', 'La fecha es obligatoria.', 'warning');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    const token = localStorage.getItem('token');
   const dto = {
  tipo,
  descripcion: descripcion.trim(),
  monto: parseFloat(monto),
  fecha: modoEdicion ? movimientoActual.fecha : fecha, // conservar fecha original en edición
};

    try {
      setGuardando(true);

      if (modoEdicion && movimientoActual) {
        await actualizarMovimiento(token, movimientoActual.id, dto);
        await Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'Movimiento actualizado correctamente.',
          confirmButtonColor: '#00c853',
        });
      } else {
        await registrarMovimiento(token, dto);
        await Swal.fire({
          icon: 'success',
          title: '¡Guardado!',
          text: 'Movimiento registrado correctamente.',
          confirmButtonColor: '#00c853',
        });
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo guardar el movimiento.',
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal-formulario">
      <div className="formulario-contenido">
        <div className="form-header">
          <h2>{modoEdicion ? '✏️ Editar Movimiento' : '📋 Nuevo Movimiento'}</h2>
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
   disabled={modoEdicion}
/>


          <button type="submit" className={`btn-guardar ${tipo.toLowerCase()}`} disabled={guardando}>
            {guardando ? 'Guardando...' : modoEdicion ? 'Actualizar Movimiento' : 'Guardar Movimiento'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovimientoForm;
