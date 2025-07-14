import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Modal from '../components/Modal';
import TransactionList from '../components/TransactionList';
import '../styles/components/dashboard.css';

const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const transactions = [
    {
      id: 1,
      type: 'income',
      amount: 20000,
      description: 'Pago mensual',
      category: 'salario',
      date: '2025-06-30'
    },
    {
      id: 2,
      type: 'expense',
      amount: 500,
      description: 'Supermercado Plaza vea',
      category: 'alimentacion',
      date: '2025-05-24'
    },
    {
      id: 3,
      type: 'expense',
      amount: 1200,
      description: 'Clínica San Gabriel',
      category: 'salud',
      date: '2025-05-14'
    }
  ];
  
  const totalBalance = 1000000;
  const monthlyIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <Header />
        
        {/* Saldo total */}
        <div className="balance-card">
          <div className="balance-label">SALDO TOTAL</div>
          <div className="balance-amount">S/ {totalBalance.toLocaleString('es-PE')}</div>
          <div className="balance-subtitle">DISPONIBLE PARA ESTE MES</div>
        </div>
        
        {/* Ingresos y gastos */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-title">INGRESOS</div>
            <div className="stat-amount income">+ S/ {monthlyIncome.toLocaleString('es-PE')}</div>
            <div className="stat-subtitle">ESTE MES</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-title">GASTOS</div>
            <div className="stat-amount expense">- S/ {monthlyExpenses.toLocaleString('es-PE')}</div>
            <div className="stat-subtitle">ESTE MES</div>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="actions-grid">
          <div className="action-btn" onClick={() => setModalVisible(true)}>
            <div className="action-icon">💸</div>
            <div className="action-label">TRANSFERIR DINERO</div>
          </div>
          <div className="action-btn" onClick={() => setModalVisible(true)}>
            <div className="action-icon">💳</div>
            <div className="action-label">PAGAR SERVICIOS</div>
          </div>
          <div className="action-btn" onClick={() => setModalVisible(true)}>
            <div className="action-icon">💰</div>
            <div className="action-label">PRÉSTAMOS</div>
          </div>
        </div>
        
        {/* Movimientos recientes */}
        <div className="recent-transactions">
          <div className="section-header">
            <div className="section-title">MOVIMIENTOS RECIENTES</div>
            <div className="view-all-btn">VER TODO</div>
          </div>
          <TransactionList transactions={transactions} />
        </div>
      </main>
      
      {/* Modal */}
      {modalVisible && <Modal onClose={() => setModalVisible(false)} />}
    </div>
  );
};

export default Dashboard;