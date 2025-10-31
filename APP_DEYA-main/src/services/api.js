import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.DEFAULT_HEADERS,
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // El servidor respondió con un código de estado de error
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error('No response received:', error.request);
    } else {
      // Algo pasó al configurar la petición
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Funciones para consumir la API

/**
 * Obtiene todos los popups
 * @returns {Promise<Array>} Array de popups
 */
export const getPopups = async () => {
  try {
    const response = await api.get('/event');
    // Extraer el array de popups de la respuesta { count, data, message }
    return response.data.data || [];
  } catch (error) {
    console.error('Error al obtener popups:', error);
    throw new Error('No se pudieron cargar los popups. Intenta más tarde.');
  }
};

/**
 * Obtiene un popup por ID
 * @param {string|number} id - ID del popup
 * @returns {Promise<Object>} Popup encontrado
 */
export const getPopupById = async (id) => {
  try {
    const response = await api.get(`/event/${id}`);
    // Extraer el popup de la respuesta { count, data, message }
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Error al obtener popup ${id}:`, error);
    throw new Error('No se pudo cargar el popup. Intenta más tarde.');
  }
};

/**
 * Obtiene el detalle extendido de un popup
 * @param {string|number} id - ID del popup
 * @returns {Promise<Object>} Detalle extendido del popup
 */
export const getPopupFullDetail = async (id) => {
  try {
    const response = await api.get(`/event/${id}/full`);
    // Extraer el detalle del popup de la respuesta { count, data, message }
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Error al obtener detalle extendido del popup ${id}:`, error);
    throw new Error('No se pudo cargar el detalle del popup. Intenta más tarde.');
  }
};

/**
 * Obtiene el nombre del barrio por ID
 * @param {string|number} id - ID del barrio
 * @returns {Promise<string>} Nombre del barrio
 */
export const getBarrioById = async (id) => {
  try {
    const response = await api.get(`/event/barrioId/${id}`);
    // Extraer el nombre del barrio de la respuesta { count, data, message }
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Error al obtener barrio ${id}:`, error);
    throw new Error('No se pudo cargar la información del barrio. Intenta más tarde.');
  }
};

export default api;
