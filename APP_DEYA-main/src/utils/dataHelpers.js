/**
 * Utilidades para manejar datos que pueden ser null o undefined
 */

/**
 * Obtiene un valor o un placeholder si es null/undefined
 * @param {*} value - Valor a verificar
 * @param {string} placeholder - Texto a mostrar si el valor es null/undefined
 * @returns {string} Valor o placeholder
 */
export const getValueOrPlaceholder = (value, placeholder = 'No disponible') => {
  if (value === null || value === undefined || value === '') {
    return placeholder;
  }
  return value;
};

/**
 * Verifica si un valor existe (no es null, undefined o string vacío)
 * @param {*} value - Valor a verificar
 * @returns {boolean} true si el valor existe
 */
export const hasValue = (value) => {
  return value !== null && value !== undefined && value !== '';
};

/**
 * Obtiene una imagen o una imagen placeholder si no existe
 * @param {string} imageUrl - URL de la imagen
 * @param {string} placeholderUrl - URL de la imagen placeholder
 * @returns {string} URL de la imagen o placeholder
 */
export const getImageOrPlaceholder = (imageUrl, placeholderUrl = 'https://via.placeholder.com/400x250?text=Sin+Imagen') => {
  if (hasValue(imageUrl)) {
    return imageUrl;
  }
  return placeholderUrl;
};

/**
 * Formatea un precio o muestra "Consultar" si no está disponible
 * @param {string|number} price - Precio a formatear
 * @returns {string} Precio formateado o "Consultar"
 */
export const formatPrice = (price) => {
  if (hasValue(price)) {
    return `$${price}`;
  }
  return 'Consultar';
};

/**
 * Obtiene el nombre del barrio o un placeholder
 * @param {string} barrioName - Nombre del barrio
 * @returns {string} Nombre del barrio o "No especificado"
 */
export const getBarrioName = (barrioName) => {
  return getValueOrPlaceholder(barrioName, 'No especificado');
};
