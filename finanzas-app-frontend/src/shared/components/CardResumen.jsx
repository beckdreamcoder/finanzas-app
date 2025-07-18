import React from 'react';
import '../styles/CardResumen.scss';

const CardResumen = ({ tipo, cantidad }) => {
  const esIngreso = tipo === 'ingresos';

  return (
    <div className={`card card-${tipo}`}>
      <p>{esIngreso ? 'INGRESOS' : 'GASTOS'}</p>
      <h3 className={esIngreso ? 'positivo' : 'negativo'}>
        {esIngreso ? '+ ' : '- '} S/ {cantidad.toLocaleString()}
      </h3>
      <span>ESTE MES</span>
    </div>
  );
};

export default CardResumen;
