/**
 * Servicio para manejar la autenticación y tokens
 */
import { DEV_TOKEN, USE_FIXED_TOKEN, ENV } from "../config/env";

// Variable privada para almacenar el token JWT
let authToken = USE_FIXED_TOKEN ? DEV_TOKEN : '';

/**
 * Establece el token de autenticación para las peticiones API
 * @param {string} token - Token JWT de autenticación
 */
export const setAuthToken = (token) => {
  // Si estamos en ambiente de desarrollo, siempre usar el token fijo
  if (USE_FIXED_TOKEN) {
    authToken = DEV_TOKEN;
    console.log(`[${ENV}] Usando token fijo para desarrollo`);
    return true;
  }
  
  // En otros ambientes, usar el token proporcionado
  if (token && typeof token === 'string') {
    authToken = token;
    console.log(`[${ENV}] Token establecido correctamente`);
    return true;
  }
  return false;
};

/**
 * Obtiene el token de autenticación actual
 * @returns {string} Token JWT
 */
export const getAuthToken = () => {
  // Si estamos en ambiente de desarrollo, siempre devolver el token fijo
  if (USE_FIXED_TOKEN) {
    return DEV_TOKEN;
  }
  return authToken;
};

/**
 * Verifica si hay un token válido disponible
 * @returns {boolean} true si hay token disponible
 */
export const hasValidToken = () => {
  // En desarrollo siempre hay token válido
  if (USE_FIXED_TOKEN) {
    return true;
  }
  return !!authToken && authToken.length > 10;
};

/**
 * Limpia el token de autenticación (logout)
 */
export const clearAuthToken = () => {
  // En desarrollo no limpiar el token
  if (!USE_FIXED_TOKEN) {
    authToken = '';
  }
};

export default {
  setAuthToken,
  getAuthToken,
  hasValidToken,
  clearAuthToken
};