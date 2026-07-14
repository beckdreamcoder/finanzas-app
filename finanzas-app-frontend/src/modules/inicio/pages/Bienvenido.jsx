// src/modules/inicio/pages/Bienvenido.jsx
// =========================================================================
// CUS 04 — Dashboard con visualización de resumen financiero
// Muestra: Saldo total, gráfico circular (ingresos vs gastos),
// tabla de últimas transacciones y progreso de metas de ahorro.
// =========================================================================

import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

import '../../../styles/pages/Bienvenido.scss';
import MainLayout from '../../../shared/components/MainLayout';
import CardResumen from '../../../shared/components/CardResumen';

// Colores para el gráfico circular
const COLORS_PIE = ['#00c853', '#c62828'];

const Bienvenido = () => {
  const [saldo, setSaldo] = useState(null);
  const [ingresos, setIngresos] = useState(null);
  const [gastos, setGastos] = useState(null);
  const [mostrarSaldo, setMostrarSaldo] = useState(true);
  const [transacciones, setTransacciones] = useState([]);
  const [metas, setMetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: token };

    const obtenerDatos = async () => {
      try {
        // Consultas paralelas para mejor rendimiento
        const [resSaldo, resIngresos, resGastos, resTrans, resMetas] = await Promise.all([
          axios.get('/api/saldo', { headers }),
          axios.get('/api/saldo/ingresos', { headers }),
          axios.get('/api/saldo/gastos', { headers }),
          axios.get('/api/transacciones/mis-transacciones', { headers }).catch(() => ({ data: [] })),
          axios.get('/api/metas/mis-metas', { headers }).catch(() => ({ data: [] })),
        ]);
        setSaldo(resSaldo.data);
        setIngresos(resIngresos.data);
        setGastos(resGastos.data);
        // Últimas 5 transacciones ordenadas por fecha descendente
        const listaTransacciones = Array.isArray(resTrans.data) ? resTrans.data : [];
        const ordenadas = listaTransacciones
          .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
          .slice(0, 5);
        setTransacciones(ordenadas);
        setMetas(Array.isArray(resMetas.data) ? resMetas.data : []);
      } catch (error) {
        console.error('Error al obtener datos financieros:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, []);

  // ---- Datos para el gráfico circular (Pie Chart) ----
  const datosPie = [
    { name: 'Ingresos', value: ingresos || 0 },
    { name: 'Gastos', value: gastos || 0 },
  ];

  // ---- Datos para el gráfico de barras (resumen) ----
  const datosBarras = [
    { nombre: 'Ingresos', monto: ingresos || 0 },
    { nombre: 'Gastos', monto: gastos || 0 },
    { nombre: 'Saldo', monto: saldo || 0 },
  ];

  // Colores personalizados para las barras
  const getBarColor = (entry) => {
    switch (entry.nombre) {
      case 'Ingresos': return '#00c853';
      case 'Gastos': return '#c62828';
      case 'Saldo': return '#2962ff';
      default: return '#888';
    }
  };

  // ---- Formateo de fecha ----
  const formatFecha = (fechaStr) => {
    if (!fechaStr) return '—';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // ---- Cálculo de progreso de meta ----
  const calcularProgreso = (meta) => {
    const actual = meta.montoActual || 0;
    const objetivo = meta.montoObjetivo || 1;
    return Math.min((actual / objetivo) * 100, 100).toFixed(1);
  };

  return (
    <MainLayout>
      <section className="panel-principal">

        {/* ===== SALDO TOTAL ===== */}
        <div className="card-saldo">
          <p className="titulo-seccion">SALDO TOTAL</p>
          <button
            className="btn-toggle-saldo"
            onClick={() => setMostrarSaldo(!mostrarSaldo)}
            title={mostrarSaldo ? 'Ocultar saldo' : 'Mostrar saldo'}
          >
            {mostrarSaldo ? <FaEyeSlash /> : <FaEye />}
          </button>
          <h1>
            {mostrarSaldo
              ? saldo !== null
                ? `S/ ${saldo.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`
                : 'Cargando...'
              : ' S/ ********'}
          </h1>
          <span className="texto-ahorro">
            {mostrarSaldo
              ? '¡Estás a salvo del fin de quincena... por ahora!'
              : 'Ocultando saldo por seguridad y tranquilidad mental.'}
          </span>
        </div>

        {/* ===== CARDS INGRESOS / GASTOS ===== */}
        <div className="resumen-ingresos-gastos">
          <CardResumen tipo="ingresos" cantidad={ingresos} />
          <CardResumen tipo="gastos" cantidad={gastos} />
        </div>

        {/* ===== GRÁFICOS ===== */}
        <div className="dashboard-graficos">

          {/* Gráfico Circular — Distribución Ingresos vs Gastos */}
          <div className="grafico-card">
            <h3 className="grafico-titulo">📊 Distribución Financiera</h3>
            <p className="grafico-subtitulo">Relación entre ingresos y gastos totales</p>
            {(ingresos || gastos) ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={datosPie}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {datosPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS_PIE[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="sin-datos">Aún no hay datos para mostrar</p>
            )}
          </div>

          {/* Gráfico de Barras — Resumen General */}
          <div className="grafico-card">
            <h3 className="grafico-titulo">📈 Resumen General</h3>
            <p className="grafico-subtitulo">Comparativa de ingresos, gastos y saldo</p>
            {(ingresos || gastos) ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={datosBarras} barSize={50}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="nombre" tick={{ fill: 'var(--text-primary)', fontSize: 13 }} />
                  <YAxis tick={{ fill: 'var(--text-primary)', fontSize: 12 }} />
                  <Tooltip
                    formatter={(value) => `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`}
                    contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                  <Bar dataKey="monto" radius={[8, 8, 0, 0]}>
                    {datosBarras.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={getBarColor(entry)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="sin-datos">Aún no hay datos para mostrar</p>
            )}
          </div>
        </div>

        {/* ===== ÚLTIMAS TRANSACCIONES ===== */}
        <div className="dashboard-seccion">
          <h3 className="seccion-titulo">🕐 Últimas Transacciones</h3>
          {transacciones.length > 0 ? (
            <div className="tabla-transacciones-wrapper">
              <table className="tabla-transacciones">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Descripción</th>
                    <th>Tipo</th>
                    <th>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {transacciones.map((t, i) => (
                    <tr key={t.id || i}>
                      <td>{formatFecha(t.fecha)}</td>
                      <td>{t.descripcion}</td>
                      <td>
                        <span className={`badge ${t.tipo === 'INGRESO' ? 'badge-ingreso' : 'badge-gasto'}`}>
                          {t.tipo}
                        </span>
                      </td>
                      <td className={t.tipo === 'INGRESO' ? 'monto-positivo' : 'monto-negativo'}>
                        {t.tipo === 'INGRESO' ? '+' : '-'} S/ {(t.monto || 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="sin-datos">
              {loading ? 'Cargando transacciones...' : 'Aún no hay datos para mostrar. ¡Crea tu primer movimiento!'}
            </p>
          )}
        </div>

        {/* ===== PROGRESO DE METAS DE AHORRO ===== */}
        <div className="dashboard-seccion">
          <h3 className="seccion-titulo">🎯 Progreso de Metas de Ahorro</h3>
          {metas.length > 0 ? (
            <div className="metas-progreso-grid">
              {metas.map((meta) => {
                const progreso = calcularProgreso(meta);
                const cumplida = parseFloat(progreso) >= 100;
                return (
                  <div key={meta.id} className={`meta-card ${cumplida ? 'meta-cumplida' : ''}`}>
                    <div className="meta-header">
                      <span className="meta-categoria">{meta.categoria || 'General'}</span>
                      {cumplida && <span className="meta-badge-cumplida">✅ Cumplida</span>}
                    </div>
                    <h4 className="meta-nombre">{meta.descripcion || 'Meta de ahorro'}</h4>
                    <div className="meta-montos">
                      <span>S/ {(meta.montoActual || 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                      <span className="meta-objetivo">de S/ {(meta.montoObjetivo || 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="barra-progreso-container">
                      <div
                        className="barra-progreso-fill"
                        style={{
                          width: `${progreso}%`,
                          backgroundColor: cumplida ? '#00c853' : progreso > 50 ? '#fbc02d' : '#2962ff'
                        }}
                      />
                    </div>
                    <span className="meta-porcentaje">{progreso}%</span>
                    {meta.fechaLimite && (
                      <span className="meta-fecha-limite">📅 Fecha límite: {formatFecha(meta.fechaLimite)}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="sin-datos">
              {loading ? 'Cargando metas...' : 'No tienes metas de ahorro configuradas. ¡Crea tu primera meta!'}
            </p>
          )}
        </div>

      </section>
    </MainLayout>
  );
};

export default Bienvenido;
