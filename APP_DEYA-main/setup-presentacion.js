#!/usr/bin/env node

/**
 * 🚀 Script de Configuración Rápida para Presentación
 * 
 * Este script te ayuda a configurar la app rápidamente en una nueva computadora
 * 
 * Uso:
 * 1. Ejecuta: node setup-presentacion.js
 * 2. Sigue las instrucciones
 * 3. ¡Listo para presentar!
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Configuración Rápida para Presentación DEYA App\n');

rl.question('¿Cuál es la IP de tu computadora? (ej: 192.168.1.100): ', (ip) => {
  if (!ip || !ip.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
    console.log('❌ IP inválida. Por favor, ingresa una IP válida.');
    rl.close();
    return;
  }

  // Actualizar el archivo de configuración
  const configPath = path.join(__dirname, 'src', 'config', 'api.config.js');
  
  try {
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Reemplazar la IP
    configContent = configContent.replace(
      /return '[^']*';/,
      `return '${ip}';`
    );
    
    fs.writeFileSync(configPath, configContent);
    
    console.log(`✅ IP actualizada a: ${ip}`);
    console.log(`✅ Archivo actualizado: ${configPath}`);
    
    // Mostrar próximos pasos
    console.log('\n📋 PRÓXIMOS PASOS:');
    console.log('1. Inicia tu servidor API: npm start (en la carpeta de tu API)');
    console.log('2. Inicia la app: npx expo start --clear');
    console.log('3. Escanea el QR con tu teléfono');
    console.log('4. ¡Presenta tu app! 🎉');
    
    console.log('\n🔧 VERIFICACIÓN:');
    console.log(`- Tu API debe estar corriendo en: http://${ip}:3000`);
    console.log('- Tu teléfono debe estar en la misma red WiFi');
    console.log('- Usa Expo Go para escanear el QR');
    
  } catch (error) {
    console.log('❌ Error al actualizar la configuración:', error.message);
  }
  
  rl.close();
});

// Instrucciones adicionales
console.log('\n💡 CONSEJOS:');
console.log('- Si no sabes tu IP, ejecuta: ipconfig (Windows) o ifconfig (Mac/Linux)');
console.log('- Asegúrate de que tu servidor API esté corriendo en el puerto 3000');
console.log('- Si algo falla, revisa la guía en GUIA_PRESENTACION.md');
