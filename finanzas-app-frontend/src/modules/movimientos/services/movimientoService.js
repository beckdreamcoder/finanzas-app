// src/modules/movimientos/services/movimientoService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || '/api';
const API_URL = `${BASE_URL}/transacciones`;

export const obtenerMisTransacciones = async (token) => {
  const res = await axios.get(`${API_URL}/mis-transacciones`, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const registrarMovimiento = async (token, datos) => {
  const res = await axios.post(`${API_URL}/registrar`, datos, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const actualizarMovimiento = async (token, id, datos) => {
  const res = await axios.put(`${API_URL}/actualizar/${id}`, datos, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const obtenerTotalIngresos = async (token) => {
  const res = await axios.get(`${BASE_URL}/saldo/ingresos`, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const obtenerTotalGastos = async (token) => {
  const res = await axios.get(`${BASE_URL}/saldo/gastos`, {
    headers: { Authorization: token },
  });
  return res.data;
};
