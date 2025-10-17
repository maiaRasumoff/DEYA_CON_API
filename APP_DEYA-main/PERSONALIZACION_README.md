# 🎨 Flujo de Personalización - DEYA App

## 📱 Pantallas Implementadas

Se han creado **3 nuevas pantallas** para personalizar la experiencia del usuario después del registro:

### 1️⃣ **EstilosScreen.js**
- **Objetivo:** Seleccionar 1-3 estilos de vida
- **Funcionalidad:**
  - Carga estilos desde la tabla `estilos` en Supabase
  - Selección múltiple con límite de 3
  - Guarda en tabla `usuarioXestilos`
  - Navega a `BarriosScreen`

### 2️⃣ **BarriosScreen.js**
- **Objetivo:** Seleccionar 1-3 barrios frecuentados
- **Funcionalidad:**
  - Carga barrios desde la tabla `barrio` en Supabase
  - Selección múltiple con límite de 3
  - Guarda en tabla `usuariosXbarrios`
  - Navega a `PersonalizacionExitosaScreen`

### 3️⃣ **PersonalizacionExitosaScreen.js**
- **Objetivo:** Confirmar personalización y redirigir al Home
- **Funcionalidad:**
  - Pantalla de confirmación con animaciones
  - Navega al `HomeScreen` al presionar "Ir al inicio"

## 🔄 Flujo Completo

```
Registro → EstilosScreen → BarriosScreen → PersonalizacionExitosaScreen → HomeScreen
```

## 🗄️ Estructura de Base de Datos Requerida

### Tablas necesarias en Supabase:

1. **`estilos`**
   ```sql
   - idestilo (PK)
   - nombreestilo (text)
   - emoji (text, opcional)
   - descripcion (text, opcional)
   ```

2. **`barrio`**
   ```sql
   - idbarrio (PK)
   - nombrebarrio (text)
   - emoji (text, opcional)
   - descripcion (text, opcional)
   ```

3. **`usuarioXestilos`**
   ```sql
   - iduser (FK → usuario.iduser)
   - idestilo (FK → estilos.idestilo)
   ```

4. **`usuariosXbarrios`**
   ```sql
   - iduser (FK → usuario.iduser)
   - idbarrio (FK → barrio.idbarrio)
   ```

## 🎨 Características de Diseño

- **Fondo:** `fondoWelcome.png` en todas las pantallas
- **Tipografías:**
  - Títulos: `Neuton-Light` (bold)
  - Textos: `Coolvetica`
- **Colores:**
  - Primario: `#34A853` (verde)
  - Secundario: `#FF5BA0` (rosa)
  - Fondo: Gradiente con imagen

## ⚙️ Configuración Técnica

### Navegación
- Agregadas al `Stack.Navigator` en `App.js`
- Orden: `EstilosScreen` → `BarriosScreen` → `PersonalizacionExitosaScreen`

### Fuentes
- Configuradas en `app.json`
- Archivo de carga en `src/utils/fonts.js`

### Integración con Registro
- `RegisterScreen.js` modificado para navegar a `EstilosScreen` después del registro exitoso
- Pasa el objeto `user` como parámetro entre pantallas

## 🚀 Cómo Probar

1. **Registra un nuevo usuario** desde `WelcomeScreen`
2. **Selecciona 1-3 estilos** en la primera pantalla
3. **Selecciona 1-3 barrios** en la segunda pantalla
4. **Confirma la personalización** en la pantalla final
5. **Ve al Home** para ver la experiencia personalizada

## 🔧 Personalización Adicional

### Para agregar más campos:
1. Modifica las consultas SQL en cada pantalla
2. Actualiza el estado local
3. Ajusta la validación de límites
4. Actualiza la UI según sea necesario

### Para cambiar límites de selección:
- Modifica la condición `prev.length < 3` en las funciones `toggleEstilo` y `toggleBarrio`

## 📝 Notas Importantes

- **Manejo de errores:** Cada pantalla tiene try/catch con Alertas
- **Estados de carga:** Spinners durante operaciones async
- **Validación:** Mínimo 1 selección requerida para continuar
- **Navegación:** Usa `replace` para evitar volver atrás
- **Animaciones:** Implementadas en la pantalla de éxito

## 🐛 Troubleshooting

### Si las fuentes no se ven:
1. Verifica que los archivos estén en `assets/Fonts/`
2. Reinicia la app con `npx expo start --clear`
3. Verifica la configuración en `app.json`

### Si hay errores de navegación:
1. Verifica que las pantallas estén registradas en `App.js`
2. Confirma que los nombres coincidan exactamente

### Si fallan las consultas a Supabase:
1. Verifica que las tablas existan
2. Confirma los nombres de columnas
3. Revisa los permisos RLS en Supabase
