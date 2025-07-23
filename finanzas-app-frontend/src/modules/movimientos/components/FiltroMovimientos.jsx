import React from 'react';
import '../styles/FiltroMovimientos.scss';

const FiltroMovimientos = ({ busqueda, setBusqueda, filtro, setFiltro }) => {
  return (
    <div className="filtros-derecha">
      <input
        type="text"
        placeholder="Buscar movimientos..."
        className="input-busqueda"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <select
        className="select-filtro"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      >
        <option value="todos">Todos</option>
        <option value="INGRESO">Ingresos</option>
        <option value="GASTO">Gastos</option>
      </select>
    </div>
  );
};

export default FiltroMovimientos;
