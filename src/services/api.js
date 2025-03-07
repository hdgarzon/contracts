// Servicio para conectarse a la API
import axios from 'axios';

// Define la URL base para todas las peticiones API
const API_BASE_URL = 'https://8s3qysgi68.execute-api.us-east-1.amazonaws.com/dev/api/web';

// API Key para las cabeceras
const API_KEY = 'CCLN5tQXou8tAM92RndP21uhir68aLyL7tpIUmWx';

// Token JWT (idealmente esto vendría de un proceso de login)
const JWT_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6ImMwNmVjNzI2LTE1ZDMtNGNlNS1iODA4LTEwYTY1OGRjOTg5YiIsImxvZ2luRW1haWwiOiJzYW1hbmV6QGdtYWlsLmNvbSIsIm9yaWdlbiI6IndpeC1wcm8tcGluY2giLCJmaXJzdE5hbWUiOiJSb21tZWwiLCJsYXN0TmFtZSI6IlNhbWFuZXoiLCJzdXNjcmlwdGlvbnMiOltdLCJpYXQiOjE3MzM1Nzg2MjYsImV4cCI6MTc2NDY4MjYyNn0.EDfwySVMjVAz9ZgkaDVxkPh2W0W5F-N_1Y0puB3A7Zb9DKIuMI9yTnhA2y4ZWb7Y9fVyV-IGN-KyjGy9JO90ja5L6uPSRvA9TRJS-5_HiIF8tN5nYJJHiWjSsqeRL6IVCPbvrBHBql5AI9I1k8ywIO_9_3cSSi-1sFdmWnOhit4qoJRKgwsTb3wrGbSB1clGX_K4NnyHdyrVh0s4UBld21TJDFogW4ibFBHm0zj7S3MEQ9dVVcygL0X0nONiZNufRICoyj4jZIOLlfl1pk4Y_mKwSyoRJ7D4z2ZN3Uz3xGP1aEVUUHDWuhq_ECTP9HmibDvQ-xJL2X_ZiimxD1As9w';

// Crear una instancia de axios con la configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
});

// Interceptor para añadir token de autenticación
apiClient.interceptors.request.use(config => {
  // Usar el token hardcodeado por ahora
  // En producción, esto debería obtenerse de localStorage o un contexto de autenticación
  config.headers.Authorization = `Bearer ${JWT_TOKEN}`;
  return config;
}, error => {
  return Promise.reject(error);
});

// Función para formatear los filtros según la estructura esperada por la API
const formatFilters = (filters) => {
  if (!filters) return {};
  
  // Valores predeterminados
  const defaultParams = {
    page: 1,
    per_page: 20,
    date: 'This Year',
    startDate: '2025-01-01',
    endDate: '2025-12-20',
  };
  
  // Combinar con los filtros proporcionados
  const params = { ...defaultParams };
  
  // Agregar ubicación si está disponible
  if (filters.location) {
    params.location = filters.location;
  } else {
    // Ubicación predeterminada (coordenadas de Tampa, Florida)
    params.location = '-81.7009551,30.2640273';
  }
  
  // Agregar tipos si están disponibles
  if (filters.types && filters.types.length > 0) {
    params.types = filters.types.join(',');
  }
  
  // Agregar bids si están disponibles
  if (filters.bids) {
    params.bids = 'True';
  }
  
  // Agregar fecha si está disponible
  if (filters.date) {
    params.date = filters.date;
  }
  
  // Agregar page si está disponible
  if (filters.page) {
    params.page = filters.page;
  }
  
  return params;
};

// Servicio para contratos
export const contractService = {
  // Obtener todos los contratos
  getAllContracts: async () => {
    try {
      // Usar los parámetros predeterminados para obtener todos los contratos
      const params = formatFilters({});
      const response = await apiClient.get('/contracts', { params });
      return response.data.data || [];
    } catch (error) {
      console.error('Error al obtener contratos:', error);
      throw error;
    }
  },

  // Obtener contratos con filtros
  getFilteredContracts: async (filters) => {
    try {
      const params = formatFilters(filters);
      const response = await apiClient.get('/contracts', { params });
      return response.data.data || [];
    } catch (error) {
      console.error('Error al filtrar contratos:', error);
      throw error;
    }
  },

  // Obtener un contrato específico por ID
  getContractById: async (id) => {
    try {
      if (!id) return null;
      const response = await apiClient.get(`/contracts/${id}`);
      return response.data.data || null;
    } catch (error) {
      console.error(`Error al obtener contrato con ID ${id}:`, error);
      throw error;
    }
  }
};

// Servicio para aplicaciones/postulaciones a contratos
export const applicationService = {
  // Enviar una aplicación para un contrato
  submitApplication: async (applicationData) => {
    try {
      const response = await apiClient.post('/applications', {
        ...applicationData,
        applicationDate: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error al enviar aplicación:', error);
      throw error;
    }
  },

  // Obtener aplicaciones del usuario actual
  getUserApplications: async () => {
    try {
      const response = await apiClient.get('/applications/user');
      return response.data.data || [];
    } catch (error) {
      console.error('Error al obtener aplicaciones del usuario:', error);
      throw error;
    }
  }
};

// Servicio para autenticación
export const authService = {
  // Iniciar sesión
  login: async (credentials) => {
    try {
      // Aquí normalmente harías una llamada a la API para autenticar
      // Para este ejemplo, simularemos una respuesta exitosa con el token proporcionado
      return {
        token: JWT_TOKEN,
        user: {
          id: 'c06ec726-15d3-4ce5-b808-10a658dc989b',
          email: 'samanez@gmail.com',
          firstName: 'Rommel',
          lastName: 'Samanez',
          membershipType: 'elite'
        }
      };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  },

  // Cerrar sesión
  logout: () => {
    // En producción, aquí limpiarías el token de localStorage
    console.log('Logout exitoso');
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    // Siempre devolvemos true porque estamos usando un token hardcodeado
    return true;
  },

  // Obtener información del usuario
  getUserInfo: () => {
    // En producción, esto vendría de localStorage o una llamada a la API
    return {
      id: 'c06ec726-15d3-4ce5-b808-10a658dc989b',
      email: 'samanez@gmail.com',
      firstName: 'Rommel',
      lastName: 'Samanez',
      membershipType: 'elite'
    };
  }
};

export default {
  contractService,
  applicationService,
  authService
};