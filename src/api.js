import axios from 'axios';

// Crear una instancia de Axios para reutilizar en toda la app
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // URL del backend
});

// Configuración para incluir el token en los encabezados de cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Incluye el token en los encabezados
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
