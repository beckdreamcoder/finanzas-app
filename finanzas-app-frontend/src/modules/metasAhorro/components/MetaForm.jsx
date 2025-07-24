// src/modules/metasAhorro/components/MetaForm.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { registrarMeta, actualizarMeta } from '../services/metasService';
import '../styles/MetaForm.scss';

const MetaForm = ({ metaActual, modoEdicion, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    descripcion: '',
    categoria: '',
    montoObjetivo: '',
    fechaLimite: '',
    frecuencia: 'MENSUAL',
  });

  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (modoEdicion && metaActual) {
      setFormData({
        descripcion: metaActual.descripcion,
        categoria: metaActual.categoria,
        montoObjetivo: metaActual.montoObjetivo,
        fechaLimite: metaActual.fechaLimite?.split('T')[0] || '',
        frecuencia: metaActual.frecuencia,
      });
    }
  }, [modoEdicion, metaActual]);

  const hayDatos = () => {
    return (
      formData.descripcion.trim() !== '' ||
      formData.categoria.trim() !== '' ||
      formData.montoObjetivo !== '' ||
      formData.fechaLimite !== ''
    );
  };

  const handleCancel = () => {
    if (!hayDatos()) {
      onCancel();
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
        onCancel();
      }
    });
  };

  const validar = () => {
    if (!formData.descripcion.trim()) {
      Swal.fire('Campo requerido', 'La descripción es obligatoria.', 'warning');
      return false;
    }
    if (!formData.categoria.trim()) {
      Swal.fire('Campo requerido', 'La categoría es obligatoria.', 'warning');
      return false;
    }
    const monto = parseFloat(formData.montoObjetivo);
    if (isNaN(monto) || monto <= 0) {
      Swal.fire('Monto inválido', 'Ingresa un monto mayor que 0.', 'warning');
      return false;
    }
    if (!formData.fechaLimite) {
      Swal.fire('Fecha requerida', 'La fecha límite es obligatoria.', 'warning');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    const token = localStorage.getItem('token');

    const dataFinal = {
      ...formData,
      montoObjetivo: parseFloat(formData.montoObjetivo),
    };

    console.log('Datos enviados:', dataFinal);

    try {
      setGuardando(true);
      if (modoEdicion) {
        await actualizarMeta(token, metaActual.id, dataFinal);
        await Swal.fire('Actualizado', 'Meta actualizada correctamente.', 'success');
      } else {
        await registrarMeta(token, dataFinal);
        await Swal.fire('Guardado', 'Meta registrada correctamente.', 'success');
      }
      onSuccess();
    } catch (error) {
      console.error('Error al guardar meta:', error.response?.data || error.message);
      Swal.fire('Error', 'No se pudo guardar la meta.', 'error');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal-formulario">
      <div className="formulario-contenido">
        <div className="form-header">
          <h2>{modoEdicion ? '✏️ Editar Meta' : '🎯 Nueva Meta'}</h2>
          <button className="boton-cerrar" onClick={handleCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            placeholder="Ej: Comprar laptop"
            value={formData.descripcion}
            onChange={handleChange}
          />

          <label>Categoría</label>
          <input
            type="text"
            name="categoria"
            placeholder="Ej: Tecnología"
            value={formData.categoria}
            onChange={handleChange}
          />

          <label>Monto Objetivo</label>
          <input
            type="number"
            name="montoObjetivo"
            placeholder="0.00"
            value={formData.montoObjetivo}
            onChange={handleChange}
          />

          <label>Fecha Límite</label>
          <input
            type="date"
            name="fechaLimite"
            value={formData.fechaLimite}
            onChange={handleChange}
          />

          <label>Frecuencia</label>
          <select
            name="frecuencia"
            value={formData.frecuencia}
            onChange={handleChange}
          >
            <option value="DIARIO">DIARIO</option>
            <option value="SEMANAL">SEMANAL</option>
            <option value="MENSUAL">MENSUAL</option>
          </select>

          <button
            type="submit"
            className="btn-guardar"
            disabled={guardando}
          >
            {guardando ? 'Guardando...' : modoEdicion ? 'Actualizar Meta' : 'Guardar Meta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MetaForm;
