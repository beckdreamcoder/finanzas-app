import React from 'react';
import '../styles/CardResumen.scss';

const CardResumen = ({ tipo, cantidad }) => {
  const esIngreso = tipo === 'ingresos';
  const monto = typeof cantidad === 'number' ? cantidad : 0;

  return (
    <div className={`card card-${tipo}`}>
      <p className="titulo-seccion">{esIngreso ? 'INGRESOS' : 'GASTOS'}</p>
      <h3 className={esIngreso ? 'positivo' : 'negativo'}>
        {esIngreso ? '+ ' : '- '} S/ {monto.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
      </h3>
      <span>ESTE MES</span>
    </div>
  );
};

export default CardResumen;
