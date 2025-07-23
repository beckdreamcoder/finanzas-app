// src/modules/metasAhorro/services/metasService.js
import axios from 'axios';

const API_URL = '/api/metas';

export const obtenerMisMetas = async (token) => {
  const res = await axios.get(`${API_URL}/mis-metas`, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const registrarMeta = async (token, datos) => {
  const res = await axios.post(`${API_URL}/registrar`, datos, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  });
  return res.data;
};

export const actualizarMeta = async (token, metaId, datos) => {
  const res = await axios.put(`${API_URL}/actualizar/${metaId}`, datos, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const eliminarMeta = async (token, metaId) => {
  const res = await axios.delete(`${API_URL}/delete/${metaId}`, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const aportarMeta = async (token, metaId, monto) => {
  const res = await axios.post(`${API_URL}/${metaId}/aportar`, { monto }, {
    headers: { Authorization: token },
  });
  return res.data;
};

export const obtenerProgresoMeta = async (token, metaId) => {
  const res = await axios.get(`${API_URL}/${metaId}/progreso`, {
    headers: { Authorization: token },
  });
  return res.data;
};
