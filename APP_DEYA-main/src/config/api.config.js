// Configuración de la API
export const API_CONFIG = {
  // Cambia esta URL por la IP y puerto de tu API Express
  BASE_URL: 'http://192.168.0.7:3000/api',
  
  // Timeout para las peticiones (en milisegundos)
  TIMEOUT: 10000,
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Para desarrollo local, puedes usar:
// BASE_URL: 'http://localhost:3000/api'

// Para tu dispositivo móvil, usa la IP de tu computadora:
// BASE_URL: 'http://192.168.1.100:3000/api'

// Para producción, usa tu dominio:
// BASE_URL: 'https://tu-dominio.com/api'
