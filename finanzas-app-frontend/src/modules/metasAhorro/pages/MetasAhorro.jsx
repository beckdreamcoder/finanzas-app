// src/modules/metasAhorro/pages/MetasAhorro.jsx
import React, { useEffect, useState, useCallback } from 'react';
import MetaItem from '../components/MetaItem';
import MetaForm from '../components/MetaForm';
import FiltroMetas from '../components/FiltroMetas';

import {
  obtenerMisMetas,
  eliminarMeta,
  obtenerProgresoMeta,
} from '../services/metasService';

import Sidebar from '../../../shared/components/Sidebar';
import Topbar from '../../../shared/components/TopBar';
import CardResumen from '../../../shared/components/CardResumen';

import '../styles/MetasAhorro.scss';

const MetasAhorro = () => {
  const [metas, setMetas] = useState([]);
  const [metaActual, setMetaActual] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtroTexto, setFiltroTexto] = useState('');

  const token = localStorage.getItem('token');
  const nombre = localStorage.getItem('nombre') || 'Usuario';

  const cargarMetas = useCallback(async () => {
    try {
      const data = await obtenerMisMetas(token);

      const metasConProgreso = await Promise.all(
        data.map(async (meta) => {
          const progreso = await obtenerProgresoMeta(token, meta.id);
          return {
            ...meta,
            montoActual: progreso.montoAhorrado,
            progreso, // <- 👈 Añadimos el progreso completo
          };
        })
      );

      setMetas(metasConProgreso);
    } catch (error) {
      console.error('Error al cargar metas:', error);
    }
  }, [token]);

  useEffect(() => {
    cargarMetas();
  }, [cargarMetas]);

  const abrirModalNueva = () => {
    setMetaActual(null);
    setModoEdicion(false);
    setMostrarModal(true);
  };

  const editarMeta = (meta) => {
    setMetaActual(meta);
    setModoEdicion(true);
    setMostrarModal(true);
  };

  const cancelarFormulario = () => {
    setMetaActual(null);
    setModoEdicion(false);
    setMostrarModal(false);
  };

  const totalAhorrado = metas.reduce((acc, meta) => acc + (meta.montoActual || 0), 0);
  const totalObjetivo = metas.reduce((acc, meta) => acc + meta.montoObjetivo, 0);

  const metasFiltradas = metas.filter((meta) =>
    meta.descripcion.toLowerCase().includes(filtroTexto.toLowerCase())
  );

  return (
    <div className="layout">
      <Sidebar />
      <main className="contenido">
        <Topbar nombre={nombre} />

        <section className="metas-page">
          <div className="encabezado-metas">
            <h2 className="titulo-seccion">Mis Metas de Ahorro</h2>
            <FiltroMetas filtroTexto={filtroTexto} setFiltroTexto={setFiltroTexto} />
            <button className="btn-agregar" onClick={abrirModalNueva}>
              + Nueva Meta
            </button>
          </div>

          <div className="resumen-metas">
            <CardResumen tipo="balance" cantidad={totalObjetivo - totalAhorrado} compacto />
            <CardResumen tipo="ingresos" titulo="Objetivo Total" cantidad={totalObjetivo} compacto />
            <CardResumen tipo="gastos" titulo="Ahorrado" cantidad={totalAhorrado} compacto />
          </div>

          <div className="lista-metas">
            {metasFiltradas.length === 0 ? (
              <p className="sin-resultados">No tienes metas registradas aún.</p>
            ) : (
              metasFiltradas.map((meta) => (
                <MetaItem
                  key={meta.id}
                  meta={meta}
                  progreso={meta.progreso} // 👈 Aquí lo pasamos al componente
                  onEditar={() => editarMeta(meta)}
                  onEliminar={async () => {
                    await eliminarMeta(token, meta.id);
                    await cargarMetas();
                  }}
                />
              ))
            )}
          </div>
        </section>
      </main>

      {mostrarModal && (
        <div className="modal-confirmacion">
          <div className="modal-contenido">
            <MetaForm
              metaActual={metaActual}
              modoEdicion={modoEdicion}
              onCancel={cancelarFormulario}
              onSuccess={async () => {
                await cargarMetas();
                cancelarFormulario();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MetasAhorro;
