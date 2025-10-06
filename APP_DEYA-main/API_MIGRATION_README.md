# Migración de Supabase a API Express - DEYÁ App

## Descripción
Esta app ha sido migrada de Supabase directo a una API Express personalizada (deyaapi).

## Configuración

### 1. Configurar la URL de la API
Edita el archivo `src/config/api.config.js` y cambia la `BASE_URL`:

```javascript
export const API_CONFIG = {
  // Para desarrollo local:
  BASE_URL: 'http://localhost:3000/api',
  
  // Para tu dispositivo móvil (usa la IP de tu computadora):
  // BASE_URL: 'http://192.168.1.100:3000/api',
  
  // Para producción:
  // BASE_URL: 'https://tu-dominio.com/api',
};
```

### 2. Endpoints de la API
La app espera que tu API tenga estos endpoints:

- `GET /api/event` - Lista todos los popups
- `GET /api/event/:id` - Detalle de un popup
- `GET /api/event/:id/full` - Detalle extendido de un popup
- `GET /api/event/barrioId/:id` - Nombre del barrio por ID

## Estructura de Archivos

### Servicios (`src/services/`)
- `api.js` - Configuración de axios y funciones para consumir la API

### Hooks (`src/hooks/`)
- `usePopups.js` - Hook para obtener todos los popups
- `usePopup.js` - Hook para obtener un popup específico
- `usePopupFullDetail.js` - Hook para detalle extendido
- `useBarrio.js` - Hook para obtener información del barrio

### Configuración (`src/config/`)
- `api.config.js` - Configuración centralizada de la API

## Uso

### En componentes:
```javascript
import { usePopups } from './src/hooks';

const MyComponent = () => {
  const { popups, loading, error, refetch } = usePopups();
  
  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <FlatList
      data={popups}
      renderItem={({ item }) => (
        <Text>{item.nombre}</Text>
      )}
    />
  );
};
```

## Características

- ✅ Manejo automático de estados (loading, error, datos)
- ✅ Manejo de errores con mensajes amigables
- ✅ Botón de reintentar en caso de error
- ✅ Timeout configurable para peticiones
- ✅ Interceptores para logging de errores
- ✅ Hooks reutilizables y limpios

## Notas Importantes

1. **Cambiar la URL**: Asegúrate de cambiar la URL en `api.config.js` por la de tu API
2. **Formato de datos**: Tu API debe devolver los popups con campos como `nombre`, `ubicacion`, `imagen`, etc.
3. **CORS**: Tu API debe permitir peticiones desde la app móvil
4. **Favoritos**: La funcionalidad de favoritos está comentada, implementa la lógica en tu API

## Próximos Pasos

1. Implementar filtrado por barrios dinámicos
2. Agregar funcionalidad de favoritos
3. Implementar búsqueda en la API
4. Agregar paginación si es necesario
