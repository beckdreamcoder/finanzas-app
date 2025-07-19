// src/modules/inicio/pages/Bienvenido.jsx

import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

import '../../../styles/pages/Bienvenido.scss';

import Sidebar from '../../../shared/components/Sidebar';
import Topbar from '../../../shared/components/TopBar';
import CardResumen from '../../../shared/components/CardResumen';
import Acciones from '../../../shared/components/Acciones';

const Bienvenido = () => {
  const nombre = localStorage.getItem('nombre') || 'Usuario';
  const [saldo, setSaldo] = useState(null);
  const [ingresos, setIngresos] = useState(null);
  const [gastos, setGastos] = useState(null);
  const [mostrarSaldo, setMostrarSaldo] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: token };

    const obtenerDatos = async () => {
      try {
        const [resSaldo, resIngresos, resGastos] = await Promise.all([
          axios.get('/api/saldo', { headers }),
          axios.get('/api/saldo/ingresos', { headers }),
          axios.get('/api/saldo/gastos', { headers }),
        ]);
        setSaldo(resSaldo.data);
        setIngresos(resIngresos.data);
        setGastos(resGastos.data);
      } catch (error) {
        console.error('Error al obtener datos financieros:', error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <main className="contenido">
        <Topbar nombre={nombre} />

        <section className="panel-principal">
          <div className="card-saldo">
            <p className="titulo-seccion">SALDO TOTAL</p>

            {/* Botón ojito */}
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

          <div className="resumen-ingresos-gastos">
            <CardResumen tipo="ingresos" cantidad={ingresos} />
            <CardResumen tipo="gastos" cantidad={gastos} />
          </div>

          <Acciones />
        </section>
      </main>
    </div>
  );
};

export default Bienvenido;
