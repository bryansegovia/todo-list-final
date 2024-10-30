// src/services/authService.js
import axios from 'axios';

// Define la URL base de la API
const API_URL = 'http://localhost:5000/api';  // Cambia esta URL según el backend

// Función para registrar un nuevo usuario
export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error en el registro:', error);
    throw error;
  }
};

// Función para iniciar sesión y obtener el token JWT
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    
    // Guarda el token JWT en localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw error;
  }
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem('token');
};

// Función para obtener el token desde localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};
