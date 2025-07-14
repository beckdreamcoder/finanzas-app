import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './auth.css'; // Asegúrate de importar estilos

const Auth: React.FC = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement?.setAttribute('style', 'transform: translateY(-2px)');
      });
      input.addEventListener('blur', () => {
        input.parentElement?.setAttribute('style', 'transform: translateY(0)');
      });
    });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  const email = (document.getElementById('email') as HTMLInputElement).value;
  successRef.current!.style.display = 'block';

  setTimeout(() => {
    // Redirige al dashboard
    navigate('/dashboard');
  }, 1500);
};


  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const name = (document.getElementById('fullName') as HTMLInputElement).value;
    alert(`¡Cuenta creada exitosamente para ${name}!`);
    setShowRegister(false);
  };

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple';
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div className="auth-container">
      {/* Login Card */}
      {!showRegister && (
        <div className="auth-card">
          <div className="logo">$</div>
          <h1 className="app-title">FRONT-END</h1>
          <p className="app-subtitle">Comprometidos con tu bienestar financiero</p>

          <div className="success-message" ref={successRef}>
            ¡Bienvenido! Iniciando sesión...
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" id="email" required placeholder="tu@email.com" />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleRipple}>Ingresar</button>
          </form>

          <div className="divider">
            <span>o</span>
          </div>

          <button className="btn btn-google" onClick={() => alert('Iniciando sesión con Google')}>
            <div className="google-icon"></div>
            Continuar con Google
          </button>

          <div className="register-link">
            <a href="#" className="link" onClick={() => setShowRegister(true)}>
              ¿No tienes cuenta? Regístrate
            </a>
          </div>
        </div>
      )}

      {/* Register Card */}
      {showRegister && (
        <div className="auth-card">
          <div className="logo">$</div>
          <h1 className="app-title">FRONT-END</h1>
          <p className="app-subtitle">Crear cuenta</p>

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Nombre completo</label>
              <input type="text" id="fullName" required placeholder="Tu nombre completo" />
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" id="regEmail" required placeholder="tu@email.com" />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <div className="password-input">
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  id="regPassword"
                  required
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowRegPassword(prev => !prev)}
                >
                  {showRegPassword ? '🙈' : '👁'}
                </button>
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleRipple}>Crear cuenta</button>
          </form>

          <div className="register-link">
            <a href="#" className="link" onClick={() => setShowRegister(false)}>
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
