// src/shared/components/CardResumen.jsx
import React from 'react';
import '../styles/CardResumen.scss';

const CardResumen = ({ tipo, cantidad, compacto = false }) => {
  const clases = {
    ingresos: 'card card-ingresos',
    gastos: 'card card-gastos',
    balance: 'card card-balance',
  };

  const iconos = {
    ingresos: '📈',
    gastos: '📉',
    balance: '💼',
  };

  const simbolo = tipo === 'ingresos' ? '+ ' : tipo === 'gastos' ? '- ' : '';

  const monto = typeof cantidad === 'number' ? cantidad : 0;

  return (
    <div className={`${clases[tipo]} ${compacto ? 'compacto' : ''}`}>
      <div className="icono-card">{iconos[tipo]}</div>
      <p className="titulo-seccion">{tipo.toUpperCase().replace('BALANCE', 'SALDO TOTAL')}</p>
      <h3 className={tipo === 'ingresos' ? 'positivo' : tipo === 'gastos' ? 'negativo' : 'balance'}>
        {simbolo}S/ {monto.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
      </h3>
      <span>ESTE MES</span>
    </div>
  );
};

export default CardResumen;
