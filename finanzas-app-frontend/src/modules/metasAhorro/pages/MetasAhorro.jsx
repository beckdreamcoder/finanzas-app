// src/modules/metasAhorro/pages/MetasAhorro.jsx
import React, { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import MetaItem from '../components/MetaItem';
import MetaForm from '../components/MetaForm';
import FiltroMetas from '../components/FiltroMetas';
import AportarModal from '../components/AportarModal';

import {
  obtenerMisMetas,
  eliminarMeta,
  obtenerProgresoMeta,
  aportarMeta,
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
  const [mostrarAporteModal, setMostrarAporteModal] = useState(false);
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
            progreso,
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

  const abrirAporteModal = (meta) => {
    setMetaActual(meta);
    setMostrarAporteModal(true);
  };

  const cancelarFormulario = () => {
    setMetaActual(null);
    setModoEdicion(false);
    setMostrarModal(false);
  };

  const cancelarAporte = () => {
    setMetaActual(null);
    setMostrarAporteModal(false);
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
           <CardResumen
  tipo="balance"
cantidad={totalObjetivo}
  titulo="Objetivo total"
  icono="🎯"
  compacto
/>

<CardResumen
  tipo="ingresos"
 cantidad={totalObjetivo - totalAhorrado}
  titulo="Disponible para metas"
  icono="🏦"
  compacto
/>

<CardResumen
  tipo="gastos"
  cantidad={totalAhorrado}
  titulo="Ahorrado"
  icono="💰"
  compacto
/>
</div>

<div className="leyenda-progreso">
  <h4>🎯 Leyenda de progreso</h4>
  <div className="item-leyenda">
    <span className="color-box barra-roja"></span> Menos del 25% ahorrado
  </div>
  <div className="item-leyenda">
    <span className="color-box barra-amarilla"></span> Entre 25% y 74% ahorrado
  </div>
  <div className="item-leyenda">
    <span className="color-box barra-verde"></span> Entre 75% y 99% ahorrado
  </div>
  <div className="item-leyenda">
    <span className="color-box completed"></span> Meta completada (100%)
  </div>
</div>


          <div className="lista-metas">
            {metasFiltradas.length === 0 ? (
              <p className="sin-resultados">No tienes metas registradas aún.</p>
            ) : (
              metasFiltradas.map((meta) => (
                <MetaItem
                  key={meta.id}
                  meta={meta}
                  progreso={meta.progreso}
                  onEditar={() => editarMeta(meta)}
                  onEliminar={async () => {
                    const confirmar = await Swal.fire({
                      title: '¿Eliminar esta meta?',
                      text: 'Esta acción no se puede deshacer',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonText: 'Sí, eliminar',
                      cancelButtonText: 'Cancelar',
                    });

                    if (confirmar.isConfirmed) {
                      await eliminarMeta(token, meta.id);
                      await cargarMetas();
                      Swal.fire('Meta eliminada', '', 'success');
                    }
                  }}
                  onAportar={() => abrirAporteModal(meta)}
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
                Swal.fire('✅ Meta guardada con éxito', '', 'success');
              }}
            />
          </div>
        </div>
      )}

      {mostrarAporteModal && (
        <AportarModal
          meta={metaActual}
          onClose={cancelarAporte}
          onConfirm={async (monto) => {
            try {
              await aportarMeta(token, metaActual.id, monto);
              await cargarMetas();
              cancelarAporte();
              Swal.fire('Aporte realizado exitosamente.', '', 'success');
            } catch (error) {
              console.error('Error al aportar:', error);
              Swal.fire('Error', 'Hubo un error al realizar el aporte.', 'error');
            }
          }}
        />
      )}
    </div>
  );
};

export default MetasAhorro;
