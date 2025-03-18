/**
 * Configuración de entorno para la aplicación
 * Carga las variables de entorno según el ambiente actual
 */

// Determinar el ambiente actual
export const ENV = process.env.REACT_APP_ENV || 'local';

// Token fijo para ambiente de desarrollo
export const DEV_TOKEN = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6ImMwNmVjNzI2LTE1ZDMtNGNlNS1iODA4LTEwYTY1OGRjOTg5YiIsImxvZ2luRW1haWwiOiJzYW1hbmV6QGdtYWlsLmNvbSIsIm9yaWdlbiI6IndpeC1wcm8tcGluY2giLCJmaXJzdE5hbWUiOiJSb21tZWwiLCJsYXN0TmFtZSI6IlNhbWFuZXoiLCJzdXNjcmlwdGlvbnMiOltdLCJpYXQiOjE3MzM1Nzg2MjYsImV4cCI6MTc2NDY4MjYyNn0.EDfwySVMjVAz9ZgkaDVxkPh2W0W5F-N_1Y0puB3A7Zb9DKIuMI9yTnhA2y4ZWb7Y9fVyV-IGN-KyjGy9JO90ja5L6uPSRvA9TRJS-5_HiIF8tN5nYJJHiWjSsqeRL6IVCPbvrBHBql5AI9I1k8ywIO_9_3cSSi-1sFdmWnOhit4qoJRKgwsTb3wrGbSB1clGX_K4NnyHdyrVh0s4UBld21TJDFogW4ibFBHm0zj7S3MEQ9dVVcygL0X0nONiZNufRICoyj4jZIOLlfl1pk4Y_mKwSyoRJ7D4z2ZN3Uz3xGP1aEVUUHDWuhq_ECTP9HmibDvQ-xJL2X_ZiimxD1As9w";

// Variable para almacenar token dinámico
let RUNTIME_TOKEN = null;

// Configuración base por defecto
const baseConfig = {
  API_URL: process.env.REACT_APP_API_URL || 'https://8s3qysgi68.execute-api.us-east-1.amazonaws.com/dev/api/web',
  API_KEY: process.env.REACT_APP_API_KEY || 'CCLN5tQXou8tAM92RndP21uhir68aLyL7tpIUmWx',
  GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyD8y8PTeAJPEa3ImFdYVp0vJ4f7_y-nZeE',
  APP_ID: process.env.REACT_APP_APP_ID || 'pinch-contracts-app', // Debe coincidir con CALLER_ID en Wix
  USE_FIXED_TOKEN: ENV === 'dev' // Usar token fijo solo en ambiente de desarrollo
};

// Configuraciones específicas por ambiente
const envConfigs = {
  local: {
    ...baseConfig,
    USE_FIXED_TOKEN: true // También usar token fijo en ambiente local
  },
  dev: {
    ...baseConfig,
    API_URL: process.env.REACT_APP_DEV_API_URL || 'https://8s3qysgi68.execute-api.us-east-1.amazonaws.com/dev/api/web',
    USE_FIXED_TOKEN: true // Usar token fijo en desarrollo
  },
  uat: {
    ...baseConfig,
    API_URL: process.env.REACT_APP_UAT_API_URL || 'https://fk7lux7azi.execute-api.us-east-1.amazonaws.com/uat/api/web',
    USE_FIXED_TOKEN: false // Usar token dinámico en UAT
  },
  prod: {
    ...baseConfig,
    API_URL: process.env.REACT_APP_PROD_API_URL || 'https://8alb08nq85.execute-api.us-east-1.amazonaws.com/prod/api/web',
    USE_FIXED_TOKEN: false // Usar token dinámico en producción
  }
};

// Exportar la configuración para el ambiente actual
export const config = envConfigs[ENV] || baseConfig;

// Exportar configuraciones específicas para facilitar su uso
export const API_URL = config.API_URL;
export const API_KEY = config.API_KEY;
export const GOOGLE_MAPS_API_KEY = config.GOOGLE_MAPS_API_KEY;
export const APP_ID = config.APP_ID;
export const USE_FIXED_TOKEN = config.USE_FIXED_TOKEN;

/**
 * Obtiene el token actual para usar en las llamadas a la API
 * @returns {string} Token de autenticación
 */
export const getToken = () => {
  // Si estamos usando token fijo, devolver ese
  if (USE_FIXED_TOKEN) {
    return DEV_TOKEN;
  }
  
  // Si tenemos un token en tiempo de ejecución, usar ese
  if (RUNTIME_TOKEN) {
    return RUNTIME_TOKEN;
  }
  
  // Sin token
  return null;
};

/**
 * Actualiza el token en tiempo de ejecución
 * @param {string} token - Nuevo token de autenticación
 */
export const updateToken = (token) => {
  if (token) {
    console.log(`[${ENV}] Actualizando token en config/env.js`);
    RUNTIME_TOKEN = token;
  }
};

export default config;