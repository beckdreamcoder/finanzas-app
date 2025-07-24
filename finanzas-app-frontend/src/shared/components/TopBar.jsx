// src/shared/components/TopBar.jsx
// src/shared/components/TopBar.jsx
import '../styles/TopBar.scss';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const TopBar = ({ nombre }) => {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const toggleModo = () => {
    setModoOscuro(!modoOscuro);
    document.body.classList.toggle('modo-oscuro');
  };

  const toggleMenu = () => {
    setMenuAbierto((prev) => !prev);
  };

  const cerrarSesion = () => {
    MySwal.fire({
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que deseas cerrar tu sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate('/');
      }
    });
  };

  useEffect(() => {
    const manejarClickFuera = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener('mousedown', manejarClickFuera);
    return () => document.removeEventListener('mousedown', manejarClickFuera);
  }, []);

  useEffect(() => {
    const dark = localStorage.getItem('modoOscuro') === 'true';
    if (dark) {
      setModoOscuro(true);
      document.body.classList.add('modo-oscuro');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('modoOscuro', modoOscuro.toString());
  }, [modoOscuro]);

  return (
    <header className="topbar">
      <div className="saludo">
        <h3>HOLA, {nombre.toUpperCase()}</h3>
      </div>

      <div className="acciones-top">
        <button onClick={toggleModo} title="Modo oscuro">🌙</button>
        <button title="Notificaciones">🔔</button>
        <button title="Ajustes">⚙️</button>

        <div className="perfil-menu-container" ref={menuRef}>
          <button onClick={toggleMenu} title="Perfil">👤</button>
          {menuAbierto && (
            <div className="menu-perfil">
              <div className="menu-header">
                <span className="menu-nombre">{nombre}</span>
              </div>
              <hr />
              <button className="menu-item cerrar-sesion" onClick={cerrarSesion}>
                🔓 Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
