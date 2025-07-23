// src/modules/metasAhorro/components/FiltroMetas.jsx
import React from 'react';
import '../styles/FiltroMetas.scss';

const FiltroMetas = ({ filtroTexto, setFiltroTexto }) => {
  return (
    <div className="filtro-metas">
      <input
        type="text"
        placeholder="Buscar metas..."
        value={filtroTexto}
        onChange={(e) => setFiltroTexto(e.target.value)}
        className="input-filtro"
      />
    </div>
  );
};

export default FiltroMetas;
