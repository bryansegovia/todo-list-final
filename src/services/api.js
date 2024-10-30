// src/services/api.js
import axios from 'axios';
import { getToken } from './authService';

// Configura la instancia de Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Cambia esta URL según tu backend
});

// Agrega un interceptor para incluir el token en las cabeceras
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
