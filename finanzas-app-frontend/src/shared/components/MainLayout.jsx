import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './TopBar';

const MainLayout = ({ children }) => {
  const nombre = localStorage.getItem('nombre') || 'Usuario';

  return (
    <div className="layout">
      <Sidebar />
      <main className="contenido">
        <Topbar nombre={nombre} />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
