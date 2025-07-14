// src/App.js
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'; // <-- AÑADIR ESTA LÍNEA
import Bienvenido from './components/Bienvenido';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/bienvenido" element={<Bienvenido />} />
      <Route path="/registrar" element={<RegisterForm />} /> {/* <-- NUEVA RUTA */}
    </Routes>
  );
}

export default App;
