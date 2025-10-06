# 🚀 Integración Completa con API Express - DEYÁ App

## ✅ **Estado de la Migración**
Tu app DEYÁ ha sido **completamente migrada** de Supabase directo a tu API Express (deyaapi).

## 🔧 **Configuración Necesaria**

### 1. **Cambiar la URL de la API**
Edita el archivo `src/config/api.config.js`:

```javascript
export const API_CONFIG = {
  // Cambia esto por la IP y puerto de tu API
  BASE_URL: 'http://TU-IP-REAL:3000/api',
  // ...
};
```

**Para encontrar tu IP:**
- **Windows**: `ipconfig` en cmd
- **Mac/Linux**: `ifconfig` o `ip addr`

### 2. **Endpoints de la API Esperados**
Tu API debe tener estos endpoints:

- `GET /api/event` → `{ count, data, message }`
- `GET /api/event/:id` → `{ count, data, message }`
- `GET /api/event/:id/full` → `{ count, data, message }`
- `GET /api/event/barrioId/:id` → `{ count, data, message }`

## 📱 **Funcionalidades Implementadas**

### **HomeScreen**
- ✅ Lista horizontal de popups usando `FlatList`
- ✅ Cards con imagen, nombre y ubicación
- ✅ Manejo de datos null con placeholders
- ✅ Estados de loading, error y datos vacíos
- ✅ Botón de reintentar en caso de error
- ✅ Navegación a detalle del popup

### **PopupDetailScreen**
- ✅ Pantalla completa de detalles del popup
- ✅ Información del barrio obtenida automáticamente
- ✅ Manejo de datos null con placeholders
- ✅ Estados de loading, error y datos no encontrados
- ✅ Botón de reintentar en caso de error
- ✅ Información del usuario si existe

### **Hooks Personalizados**
- ✅ `usePopups` - Lista todos los popups
- ✅ `usePopupDetail` - Detalle completo con barrio
- ✅ `usePopup` - Popup individual
- ✅ `useBarrio` - Información del barrio

### **Servicios API**
- ✅ Extracción automática de `.data` de respuestas
- ✅ Manejo de errores con mensajes amigables
- ✅ Timeout configurable
- ✅ Interceptores para logging

### **Utilidades**
- ✅ `getValueOrPlaceholder` - Maneja datos null
- ✅ `getImageOrPlaceholder` - Imágenes con fallback
- ✅ `formatPrice` - Formateo de precios
- ✅ `hasValue` - Verificación de valores

## 🏗️ **Estructura de Archivos**

```
src/
├── config/
│   └── api.config.js          # Configuración de la API
├── hooks/
│   ├── index.js               # Exporta todos los hooks
│   ├── usePopups.js           # Hook para lista de popups
│   ├── usePopupDetail.js      # Hook para detalle completo
│   ├── usePopup.js            # Hook para popup individual
│   └── useBarrio.js           # Hook para información de barrio
├── services/
│   └── api.js                 # Funciones para consumir la API
└── utils/
    └── dataHelpers.js         # Utilidades para datos null

Pantallas:
├── HomeScreen.js              # Lista de popups
└── PopupDetailScreen.js       # Detalle completo del popup
```

## 📊 **Formato de Datos Esperado**

### **Respuesta de `/api/event`**
```json
{
  "count": 5,
  "data": [
    {
      "idpopup": 1,
      "nombre": "Mi Popup",
      "ubicacion": "Av. Corrientes 123",
      "imagen": "https://ejemplo.com/imagen.jpg",
      "descripcion": "Descripción del popup",
      "idbarrio": 1,
      "precio": "1000",
      "telefono": "+54 11 1234-5678",
      "email": "popup@ejemplo.com",
      "sitioWeb": "https://ejemplo.com",
      "horarios": "Lun-Vie 9:00-18:00"
    }
  ],
  "message": "Popups obtenidos exitosamente"
}
```

### **Respuesta de `/api/event/:id/full`**
```json
{
  "count": 1,
  "data": {
    "idpopup": 1,
    "nombre": "Mi Popup",
    "ubicacion": "Av. Corrientes 123",
    "imagen": "https://ejemplo.com/imagen.jpg",
    "descripcion": "Descripción completa",
    "idbarrio": 1,
    "precio": "1000",
    "telefono": "+54 11 1234-5678",
    "email": "popup@ejemplo.com",
    "sitioWeb": "https://ejemplo.com",
    "horarios": "Lun-Vie 9:00-18:00",
    "usuario": {
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com",
      "telefono": "+54 11 1234-5678"
    },
    "informacionAdicional": "Información extra del popup"
  },
  "message": "Popup obtenido exitosamente"
}
```

## 🎯 **Características Destacadas**

- ✅ **Manejo automático de datos null** con placeholders
- ✅ **Estados de loading y error** con UI amigable
- ✅ **Navegación fluida** entre pantallas
- ✅ **Hooks reutilizables** y limpios
- ✅ **Manejo de errores** robusto
- ✅ **Placeholders para imágenes** faltantes
- ✅ **Formateo de precios** automático
- ✅ **Información de barrios** obtenida dinámicamente

## 🚀 **Cómo Probar**

1. **Configura la URL de tu API** en `src/config/api.config.js`
2. **Ejecuta la app** con `npm start`
3. **Escanea el código QR** con Expo Go
4. **Verifica que los popups se carguen** desde tu API
5. **Toca "Ver más"** para ir al detalle
6. **Verifica que se muestre toda la información** del popup

## 🔍 **Debugging**

### **Logs en Consola**
- `popups` - Array de popups recibidos
- `loading` - Estado de carga
- `error` - Errores si los hay

### **Verificar Conexión**
- Asegúrate de que tu API esté corriendo
- Verifica que la IP sea accesible desde tu dispositivo
- Revisa los logs de tu API para errores

## 📝 **Próximos Pasos Sugeridos**

1. **Implementar filtrado por barrios** dinámicos
2. **Agregar funcionalidad de favoritos** en la API
3. **Implementar búsqueda** en la API
4. **Agregar paginación** si es necesario
5. **Implementar cache local** para mejor rendimiento

## 🆘 **Solución de Problemas**

### **"No se pudieron cargar los popups"**
- Verifica que tu API esté corriendo
- Confirma la URL en `api.config.js`
- Revisa los logs de tu API

### **"No hay pop-ups disponibles"**
- Verifica que tu API devuelva datos
- Confirma el formato de respuesta `{ count, data, message }`
- Verifica que `data` sea un array

### **Imágenes no se muestran**
- Verifica las URLs de las imágenes
- Confirma que las URLs sean accesibles
- Las imágenes null mostrarán un placeholder

## 🎉 **¡Listo para Usar!**

Tu app DEYÁ ahora consume **exclusivamente tu API Express** y maneja todos los casos edge de datos null. ¡Todo el código es limpio, modular y fácil de mantener!
