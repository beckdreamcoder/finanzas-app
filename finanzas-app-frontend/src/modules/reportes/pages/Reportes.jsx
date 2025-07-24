import React, { useState, useEffect } from 'react';
import { descargarReporteEstadoCuenta } from '../services/reporteService';
import Sidebar from '../../../shared/components/Sidebar';
import Topbar from '../../../shared/components/TopBar';
import '../../reportes/styles/Reportes.scss';

const Reportes = () => {
  const token = localStorage.getItem('token');
  const nombre = localStorage.getItem('nombre') || 'Usuario';

  const [filtro, setFiltro] = useState('hoy');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  // Ajuste automático de fechas según filtro seleccionado
  useEffect(() => {
    if (filtro === 'hoy') {
      const inicio = new Date();
      inicio.setHours(0, 0, 0, 0);
      const fin = new Date();
      fin.setHours(23, 59, 59, 999);
      setFechaInicio(inicio.toISOString());
      setFechaFin(fin.toISOString());
    } else if (filtro === '3dias' || filtro === '7dias') {
      let dias = filtro === '3dias' ? 3 : 7;

      const inicio = new Date();
      inicio.setDate(inicio.getDate() - dias);
      inicio.setHours(0, 0, 0, 0);

      const fin = new Date();
      fin.setHours(23, 59, 59, 999);

      setFechaInicio(inicio.toISOString());
      setFechaFin(fin.toISOString());
    }
  }, [filtro]);

  const handleDescargar = async () => {
    try {
      await descargarReporteEstadoCuenta(token, filtro, fechaInicio, fechaFin);
    } catch (error) {
      console.error('Error al descargar el reporte:', error);
      alert('Ocurrió un error al generar el reporte');
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <main className="contenido">
        <Topbar nombre={nombre} />

        <section className="reporte-container">
          <h2 className="titulo-seccion">📄 Generar Reporte de Estado de Cuenta</h2>

          <form className="filtros-reporte" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="rango">Rango:</label>
              <select
                id="rango"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              >
                <option value="hoy">Hoy</option>
                <option value="3dias">Últimos 3 días</option>
                <option value="7dias">Últimos 7 días</option>
                <option value="personalizado">Personalizado</option>
              </select>
            </div>

            {filtro === 'personalizado' && (
              <fieldset className="fechas-personalizadas">
                <legend>Selecciona el rango de fechas:</legend>

                <div>
                  <label htmlFor="fechaInicio">Desde:</label>
                  <input
                    type="datetime-local"
                    id="fechaInicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="fechaFin">Hasta:</label>
                  <input
                    type="datetime-local"
                    id="fechaFin"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                  />
                </div>
              </fieldset>
            )}

            <button type="submit" className="btn-generar" onClick={handleDescargar}>
              Descargar PDF
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Reportes;
