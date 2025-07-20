// src/modules/movimientos/pages/Movimientos.jsx
// src/modules/movimientos/pages/Movimientos.jsx
import React, { useEffect, useState, useCallback } from 'react';
import MovimientoItem from '../components/MovimientoItem';
import MovimientoForm from '../components/MovimientoForm';
import FiltroMovimientos from '../components/FiltroMovimientos';
import {
  obtenerMisTransacciones,
  obtenerTotalIngresos,
  obtenerTotalGastos,
} from '../services/movimientoService';

import Sidebar from '../../../shared/components/Sidebar';
import Topbar from '../../../shared/components/TopBar';
import CardResumen from '../../../shared/components/CardResumen';

import '../styles/Movimientos.scss';

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [movimientoActual, setMovimientoActual] = useState(null);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ingresos, setIngresos] = useState(null);
  const [gastos, setGastos] = useState(null);

  const token = localStorage.getItem('token');
  const nombre = localStorage.getItem('nombre') || 'Usuario';

  const cargarMovimientos = useCallback(async () => {
    try {
      const data = await obtenerMisTransacciones(token);
      setMovimientos(data);
    } catch (error) {
      console.error('Error cargando movimientos:', error);
    }
  }, [token]);

  const cargarTotales = useCallback(async () => {
    try {
      const [totalIngresos, totalGastos] = await Promise.all([
        obtenerTotalIngresos(token),
        obtenerTotalGastos(token),
      ]);
      setIngresos(totalIngresos);
      setGastos(totalGastos);
    } catch (error) {
      console.error('Error al cargar ingresos/gastos:', error);
    }
  }, [token]);

  useEffect(() => {
    cargarMovimientos();
    cargarTotales();
  }, [cargarMovimientos, cargarTotales]);

  const editarMovimiento = (movimiento) => {
    setMovimientoActual(movimiento);
    setModoEdicion(true);
    setMostrarModal(true);
  };

  const cancelarFormulario = () => {
    setMovimientoActual(null);
    setModoEdicion(false);
    setMostrarModal(false);
  };

  const abrirModalNuevo = () => {
    setMovimientoActual(null);
    setModoEdicion(false);
    setMostrarModal(true);
  };

  const movimientosFiltrados = movimientos.filter((mov) => {
    const coincideTexto = mov.descripcion.toLowerCase().includes(filtroTexto.toLowerCase());
    const coincideTipo = filtroTipo === 'todos' || mov.tipo === filtroTipo;
    return coincideTexto && coincideTipo;
  });

  const balanceTotal = (ingresos || 0) - (gastos || 0);

  return (
    <div className="layout">
      <Sidebar />
      <main className="contenido">
        <Topbar nombre={nombre} />

        <section className="movimientos-page">
          {/* Título + Filtros arriba */}
          <div className="encabezado-movimientos">
            <h2 className="titulo-seccion">Movimientos Recientes</h2>
            <FiltroMovimientos
              busqueda={filtroTexto}
              setBusqueda={setFiltroTexto}
              filtro={filtroTipo}
              setFiltro={setFiltroTipo}
            />
          </div>

          {/* Cards resumen */}
          <div className="resumen-movimientos">
            <CardResumen tipo="balance" cantidad={balanceTotal} compacto />
            <CardResumen tipo="ingresos" cantidad={ingresos || 0} compacto />
            <CardResumen tipo="gastos" cantidad={gastos || 0} compacto />
          </div>

       {/* Encabezado lista de movimientos */}
            {/* Título + Botón Agregar */}
            <div className="seccion-movimientos-header">
            <h3 className="subtitulo-movimientos">Todos los Movimientos</h3>
            <button className="btn-agregar" onClick={abrirModalNuevo}>
                + Agregar Movimiento
            </button>
            </div>
          {/* Lista de movimientos */}
          <div className="lista-movimientos">
            {movimientosFiltrados.length === 0 ? (
              <p className="sin-resultados">No se encontraron movimientos.</p>
            ) : (
              movimientosFiltrados.map((mov) => (
                <MovimientoItem
                  key={mov.id}
                  movimiento={mov}
                  onEditar={() => editarMovimiento(mov)}
                />
              ))
            )}
          </div>
        </section>
      </main>

      {/* Modal */}
      {mostrarModal && (
        <div className="modal-confirmacion">
          <div className="modal-contenido">
            <MovimientoForm
              movimientoActual={movimientoActual}
              modoEdicion={modoEdicion}
              onCancel={cancelarFormulario}
              onSuccess={() => {
                cargarMovimientos();
                cargarTotales();
                cancelarFormulario();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Movimientos;
