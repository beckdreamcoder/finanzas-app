// src/modules/auth/components/RegisterForm.jsx
// src/modules/auth/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import '../styles/LoginForm.css'; // Reutilizando estilos
import Swal from 'sweetalert2';

const RegisterForm = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(nombre, email, password);
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu cuenta ha sido creada correctamente.',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: 'Por favor, intenta nuevamente.',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleRegister}>
        <div className="icon">👤</div>
        <h2>REGÍSTRATE</h2>
        <p>Crea una cuenta para comenzar</p>

        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

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

        <button type="submit">REGISTRAR</button>

        <hr />

        <button type="button" className="google-button">
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
          Registrarse con Google
        </button>

        <Link to="/" className="link-text">¿Ya tienes una cuenta? Inicia sesión</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
