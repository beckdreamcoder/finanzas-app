import axios from 'axios';

const API_URL = '/api/reportes';

export const descargarReporteEstadoCuenta = async (token, filtro, fechaInicio, fechaFin) => {
  const params = new URLSearchParams();

  if (filtro) params.append('filtro', filtro);
  if (filtro === 'personalizado') {
    if (fechaInicio) params.append('fechaInicio', fechaInicio);
    if (fechaFin) params.append('fechaFin', fechaFin);
  }

  const response = await axios.get(`${API_URL}/estado-cuenta?${params.toString()}`, {
    headers: { Authorization: token },
    responseType: 'blob', // Necesario para descargar archivos
  });

  // Crear un enlace para descargar el PDF
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'estado_cuenta.pdf');
  document.body.appendChild(link);
  link.click();
  link.remove();
};
