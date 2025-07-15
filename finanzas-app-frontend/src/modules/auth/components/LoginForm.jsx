// src/modules/auth/components/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(email, password);

      // ✅ Guardar datos del usuario en localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('nombre', result.nombre);   // para mostrar "HOLA, NOMBRE"
      localStorage.setItem('email', result.email);     // por si se necesita más adelante
      localStorage.setItem('id', result.id);           // opcional, útil para llamadas de perfil

      // ✅ Redirigir al dashboard
      navigate('/bienvenido');
    } catch (error) {
      alert('Credenciales incorrectas o error del servidor');
      console.error(error);
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
