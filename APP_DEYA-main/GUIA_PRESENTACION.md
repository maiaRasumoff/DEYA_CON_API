# 🚀 Guía para Presentación - DEYA App

## ⚠️ **CHECKLIST ANTES DE LA PRESENTACIÓN**

### 📱 **1. Preparar la App Móvil:**
- [ ] Copiar todo el proyecto a la nueva computadora
- [ ] Instalar Node.js en la nueva computadora
- [ ] Ejecutar `npm install` en el proyecto
- [ ] **CAMBIAR LA IP** en `src/config/api.config.js` (línea 8)

### 🖥️ **2. Preparar el Servidor API:**
- [ ] Copiar tu proyecto de API a la nueva computadora
- [ ] Instalar dependencias del servidor (`npm install`)
- [ ] **INICIAR EL SERVIDOR** en puerto 3000
- [ ] Verificar que esté corriendo en `http://tu-ip:3000`

### 🔧 **3. Configurar Red:**
- [ ] Asegurarse de que el teléfono y computadora estén en la misma WiFi
- [ ] Obtener la IP de la nueva computadora
- [ ] Actualizar la configuración de la app

---

## 🔍 **CÓMO OBTENER TU IP RÁPIDAMENTE**

### **Windows:**
```cmd
ipconfig
```
Busca: `Dirección IPv4` (ej: `192.168.1.100`)

### **Mac/Linux:**
```bash
ifconfig
```
Busca: `inet` (ej: `192.168.1.100`)

---

## ⚡ **PASOS RÁPIDOS (5 minutos antes de presentar)**

### **1. Configurar la App:**
1. Abrir `src/config/api.config.js`
2. Cambiar la línea 8: `return 'TU_IP_AQUI';`
3. Guardar el archivo

### **2. Iniciar el Servidor:**
```bash
# En la carpeta de tu API
npm start
# o
node server.js
```

### **3. Iniciar la App:**
```bash
# En la carpeta de la app
npx expo start --clear
```

### **4. Escanear QR:**
- Usar Expo Go en tu teléfono
- Escanear el código QR

---

## 🧪 **VERIFICAR QUE TODO FUNCIONA**

### **Test 1: Conexión API**
```bash
# En terminal, probar la API:
curl http://TU_IP:3000/api/event
```

### **Test 2: App Móvil**
1. Registrar un nuevo usuario
2. Verificar que cargue la pantalla de estilos
3. Seleccionar algunos estilos
4. Continuar a barrios
5. Completar el flujo

---

## 🚨 **PLAN B - SI ALGO FALLA**

### **Si la API no responde:**
1. Verificar que el servidor esté corriendo
2. Revisar el puerto (debe ser 3000)
3. Verificar el firewall

### **Si la app no se conecta:**
1. Verificar que la IP sea correcta
2. Asegurarse de estar en la misma red WiFi
3. Reiniciar la app con `npx expo start --clear`

### **Si hay errores de base de datos:**
1. Verificar que Supabase esté funcionando
2. Revisar los logs del servidor
3. Comprobar las tablas en Supabase

---

## 📋 **DATOS PARA LA PRESENTACIÓN**

### **Funcionalidades que funcionan:**
- ✅ Registro de usuarios
- ✅ Login de usuarios
- ✅ Selección de estilos (1-3)
- ✅ Selección de barrios (1-3)
- ✅ Pantalla de éxito
- ✅ Navegación al Home
- ✅ Carga de popups desde API

### **Flujo completo:**
```
Registro → Estilos → Barrios → Éxito → Home
```

### **Tecnologías:**
- React Native + Expo
- Supabase (base de datos)
- API Express (servidor)
- Navegación con React Navigation

---

## 💡 **CONSEJOS PARA LA PRESENTACIÓN**

1. **Practica el flujo completo** antes de presentar
2. **Ten la IP anotada** en un papel por si acaso
3. **Prepara datos de prueba** en Supabase
4. **Ten un plan B** (demo con datos estáticos si falla la API)
5. **Explica el problema de la IP** como parte del desarrollo

---

## 🆘 **CONTACTO DE EMERGENCIA**

Si algo falla durante la presentación:
1. **Reinicia la app** con `npx expo start --clear`
2. **Verifica la IP** y cámbiala si es necesario
3. **Reinicia el servidor API**
4. **Usa datos de demostración** si es necesario

---

## ✨ **LO QUE FUNCIONA PERFECTAMENTE**

- 🎨 **Diseño:** Coincide exactamente con tu Figma
- 🔄 **Navegación:** Flujo completo implementado
- 💾 **Base de datos:** Conexión a Supabase
- 📱 **UI/UX:** Interfaz moderna y funcional
- 🎯 **Funcionalidad:** Selección múltiple, validaciones, etc.

**¡Tu app está lista para impresionar! 🚀**
