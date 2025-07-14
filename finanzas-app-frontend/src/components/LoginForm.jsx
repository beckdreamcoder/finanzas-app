// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      localStorage.setItem('token', result.token);
      navigate('/bienvenido');
    } catch (error) {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="icon">$</div>
        <h2>FINANCETRACKER</h2>
        <p>COMPROMETIDOS CON TU BIENESTAR FINANCIERO</p>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">INGRESAR</button>

        <hr />

        <button type="button" className="google-button">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
          Continuar con Google
        </button>

        <Link to="/registrar" className="link-text">¿No tienes cuenta? Regístrate</Link>
      </form>
    </div>
  );
};

export default LoginForm;
