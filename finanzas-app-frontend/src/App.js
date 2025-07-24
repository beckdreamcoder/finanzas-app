import './styles/variables.scss';
import './styles/theme.scss';
import './styles/layout.scss';

import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './modules/auth/components/LoginForm';
import RegisterForm from './modules/auth/components/RegisterForm';
import Bienvenido from './modules/inicio/pages/Bienvenido';
import Movimientos from './modules/movimientos/pages/Movimientos';
import MetasAhorro from './modules/metasAhorro/pages/MetasAhorro';
import Reportes from './modules/reportes/pages/Reportes'; // ✅ nuevo

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registrar" element={<RegisterForm />} />
      <Route path="/bienvenido" element={<Bienvenido />} />
      <Route path="/movimientos" element={<Movimientos />} />
      <Route path="/metas-ahorro" element={<MetasAhorro />} />
      <Route path="/reportes" element={<Reportes />} /> {/* ✅ nueva ruta */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
