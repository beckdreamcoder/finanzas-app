import './styles/variables.scss';
import './styles/theme.scss';
import './styles/layout.scss';

import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './modules/auth/components/LoginForm';
import RegisterForm from './modules/auth/components/RegisterForm'; // ✅ nuevo
import Bienvenido from './modules/inicio/pages/Bienvenido';



function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/registrar" element={<RegisterForm />} /> {/* ✅ nueva ruta */}
      <Route path="/bienvenido" element={<Bienvenido />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
