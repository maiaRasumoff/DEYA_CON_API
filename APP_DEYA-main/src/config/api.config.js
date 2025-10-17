// Configuración de la API
// 🚨 IMPORTANTE: Cambia la IP según tu computadora para la presentación

// Función para obtener la IP automáticamente (opcional)
const getLocalIP = () => {
  // Puedes cambiar esta IP manualmente si es necesario
  return '192.168.0.15'; // ← CAMBIA ESTA IP POR LA DE TU COMPUTADORA
};

export const API_CONFIG = {
  // 🔧 CONFIGURACIÓN PRINCIPAL - CAMBIA ESTA IP:
  BASE_URL: `http://${getLocalIP()}:3000/api`,
  
  // 📝 INSTRUCCIONES RÁPIDAS:
  // 1. En tu nueva computadora, abre terminal/cmd
  // 2. Ejecuta: ipconfig (Windows) o ifconfig (Mac/Linux)
  // 3. Busca tu IP local (ej: 192.168.1.100)
  // 4. Cambia la IP en la línea 8 de este archivo
  
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
