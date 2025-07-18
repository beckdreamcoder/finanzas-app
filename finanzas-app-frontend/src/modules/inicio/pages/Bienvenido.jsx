// src/modules/inicio/pages/Bienvenido.jsx

import React from 'react';
//Uso de sass
import '../../../styles/pages/Bienvenido.scss';


// ✅ Importaciones correctas (3 niveles arriba)
import Sidebar from '../../../shared/components/Sidebar';
import Topbar from '../../../shared/components/TopBar';
import CardResumen from '../../../shared/components/CardResumen';
import Acciones from '../../../shared/components/Acciones';



const Bienvenido = () => {
  const nombre = localStorage.getItem('nombre') || 'Usuario';

  return (
    <div className="layout">
      {/* Barra lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="contenido">
        {/* Parte superior con saludo y botones */}
        <Topbar nombre={nombre} />

        <section className="panel-principal">
          {/* Tarjeta de saldo */}
          <div className="card-saldo">
            <p>SALDO TOTAL</p>
            <h1>S/ 1,000,000</h1>
            <span>DISPONIBLE PARA ESTE MES</span>
          </div>

          {/* Ingresos y gastos */}
          <div className="resumen-ingresos-gastos">
            <CardResumen tipo="ingresos" cantidad={20000} />
            <CardResumen tipo="gastos" cantidad={1700} />
          </div>

          {/* Botones de acción */}
          <Acciones />

        </section>
      </main>
    </div>
  );
};

export default Bienvenido;
