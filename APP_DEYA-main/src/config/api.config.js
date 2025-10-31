// Configuración de la API
// 🚨 IMPORTANTE: Cambia la IP según tu computadora para la presentación

// Función para obtener la IP automáticamente (opcional)
const getLocalIP = () => {
 
  return '192.168.30.45'; // ← CAMBIAR ESTA IP POR LA DE LA COMPU
};

export const API_CONFIG = {
 
  // Usa HTTPS o túnel ngrok para dispositivos físicos
  BASE_URL: 'https://TU_NGROK_TUNNEL_ID.ngrok-free.app/api',
  // BASE_URL: `http://${getLocalIP()}:3000/api`,
  
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
