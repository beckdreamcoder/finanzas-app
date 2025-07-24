// src/shared/components/CardResumen.jsx
import React from 'react';
import '../styles/CardResumen.scss';

const CardResumen = ({ tipo, cantidad, compacto = false, titulo, icono }) => {
  const clases = {
    ingresos: 'card card-ingresos',
    gastos: 'card card-gastos',
    balance: 'card card-balance',
  };

  const iconosDefecto = {
    ingresos: '📈',
    gastos: '📉',
    balance: '💼',
  };

  const titulosDefecto = {
    ingresos: 'INGRESOS',
    gastos: 'GASTOS',
    balance: 'SALDO TOTAL',
  };

  const simbolo = tipo === 'ingresos' ? '+ ' : tipo === 'gastos' ? '- ' : '';
  const monto = typeof cantidad === 'number' ? cantidad : 0;

  const iconoFinal = icono || iconosDefecto[tipo];
  const tituloFinal = titulo || titulosDefecto[tipo];

  return (
    <div className={`${clases[tipo]} ${compacto ? 'compacto' : ''}`}>
      <div className="icono-card">{iconoFinal}</div>
      <p className="titulo-seccion">{tituloFinal}</p>
      <h3 className={tipo === 'ingresos' ? 'positivo' : tipo === 'gastos' ? 'negativo' : 'balance'}>
        {simbolo}S/ {monto.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
      </h3>
      <span>ESTE MES</span>
    </div>
  );
};

export default CardResumen;
