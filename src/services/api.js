// Servicio para conectarse a la API
import axios from 'axios';
import { formatDate, formatCurrency } from '../utils/formatters';
import { getCoordinatesByName } from './geocoding';
import { contracts as mockContracts } from '../data/mockData';

// Define la URL base para todas las peticiones API
const API_BASE_URL = 'https://8s3qysgi68.execute-api.us-east-1.amazonaws.com/dev/api/web';

// API Key para las cabeceras
const API_KEY = 'CCLN5tQXou8tAM92RndP21uhir68aLyL7tpIUmWx';

// Token JWT
const JWT_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6ImMwNmVjNzI2LTE1ZDMtNGNlNS1iODA4LTEwYTY1OGRjOTg5YiIsImxvZ2luRW1haWwiOiJzYW1hbmV6QGdtYWlsLmNvbSIsIm9yaWdlbiI6IndpeC1wcm8tcGluY2giLCJmaXJzdE5hbWUiOiJSb21tZWwiLCJsYXN0TmFtZSI6IlNhbWFuZXoiLCJzdXNjcmlwdGlvbnMiOltdLCJpYXQiOjE3MzM1Nzg2MjYsImV4cCI6MTc2NDY4MjYyNn0.EDfwySVMjVAz9ZgkaDVxkPh2W0W5F-N_1Y0puB3A7Zb9DKIuMI9yTnhA2y4ZWb7Y9fVyV-IGN-KyjGy9JO90ja5L6uPSRvA9TRJS-5_HiIF8tN5nYJJHiWjSsqeRL6IVCPbvrBHBql5AI9I1k8ywIO_9_3cSSi-1sFdmWnOhit4qoJRKgwsTb3wrGbSB1clGX_K4NnyHdyrVh0s4UBld21TJDFogW4ibFBHm0zj7S3MEQ9dVVcygL0X0nONiZNufRICoyj4jZIOLlfl1pk4Y_mKwSyoRJ7D4z2ZN3Uz3xGP1aEVUUHDWuhq_ECTP9HmibDvQ-xJL2X_ZiimxD1As9w';

// Crear una instancia de axios con la configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
    'Authorization': `Bearer ${JWT_TOKEN}`
  },
});

// Interceptor para manejar respuestas
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en API:', error);
    return Promise.reject(error);
  }
);

// Función para formatear los filtros según la estructura esperada por la API
const formatFilters = (filters) => {
  if (!filters) return {};
  
  // Valores predeterminados exactamente como espera la API
  const defaultParams = {
    page: "1",
    per_page: "20",
    location: "-82.5513709,27.4974141", // Coordenadas estándar para Bradenton, FL
    startDate: "2025-01-01",
    endDate: "2025-12-10",
    bids: "True",
    types: "Multifamily,Studio Housing"
  };
  
  // Comenzar con los parámetros predeterminados
  const params = { ...defaultParams };
  
  // Actualizar location basado en los filtros proporcionados
  if (filters.location) {
    // Si es coordenadas en formato "lng,lat"
    if (typeof filters.location === 'string' && filters.location.includes(',')) {
      params.location = filters.location;
    }
    // Si es un objeto con lat y lng
    else if (typeof filters.location === 'object' && filters.location !== null && 
        'lat' in filters.location && 'lng' in filters.location) {
      params.location = `${filters.location.lng},${filters.location.lat}`;
    }
    // Si es un nombre de ubicación
    else if (typeof filters.location === 'string') {
      // Intentamos obtener coordenadas del nombre desde nuestro servicio
      const coordinates = getCoordinatesByName(filters.location);
      params.location = coordinates || "-82.5513709,27.4974141"; // Default a Bradenton, FL
    }
  }
  
  // Manejar las fechas basadas en el filtro de fecha
  if (filters.date) {
    const now = new Date();
    
    if (filters.date === 'This Week') {
      // Calcular inicio y fin de semana
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      params.startDate = startOfWeek.toISOString().split('T')[0];
      params.endDate = endOfWeek.toISOString().split('T')[0];
    } else if (filters.date === 'This Month') {
      // Calcular inicio y fin de mes
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      params.startDate = startOfMonth.toISOString().split('T')[0];
      params.endDate = endOfMonth.toISOString().split('T')[0];
    }
    // Para 'This Year' ya tenemos los valores predeterminados
  }
  
  // Manejar tipos de propiedad
  if (filters.types && Array.isArray(filters.types) && filters.types.length > 0) {
    params.types = filters.types.join(',');
  }
  
  // Manejar bids - API espera "True" o "False"
  if (filters.bids && Array.isArray(filters.bids)) {
    // Si incluye "With bids", establecer como "True"
    if (filters.bids.includes('With bids')) {
      params.bids = "True";
    } 
    // Si solo incluye "Without Bids", establecer como "False"
    else if (filters.bids.includes('Without Bids') && !filters.bids.includes('With bids')) {
      params.bids = "False";
    }
  }
  
  return params;
};

// Función para formatear los datos de contrato recibidos de la API
// Reemplaza la función existente con esta:
const formatContractData = (apiContract) => {
  // Crear contrato con valores por defecto según la estructura proporcionada 
  const contract = {
    id: apiContract._id || apiContract.number || 'CO325678',
    status: apiContract.status || 'published',
    type: apiContract.type || 'Multifamily',
    name: apiContract.services || 'Turn Over',
    location: apiContract.location || 'Bradenton, FL',
    startDate: formatDate(apiContract.startDate) || 'Thur, 01/08/2025',
    jobsPerMonth: apiContract.jobsPerMonth || 4,
    value: apiContract.anualEstimation?.clientPrice 
      ? formatCurrency(apiContract.anualEstimation.clientPrice) 
      : '0',
    unitCount: apiContract.unitCount || 10,
    bidders: apiContract.bidders || 5,
    scopeOfWork: apiContract.scopeOfWork || 'No scope of work provided',
    // Añadir información del limpiador asignado
    winCleaner: apiContract.winCleaner || null
  };
  
  return contract;
};

// Función para extraer el array de contratos de la respuesta API
const extractContractsFromResponse = (response) => {
  if (!response || !response.data) {
    return [];
  }
  
  // Verificar si tenemos la estructura esperada
  if (response.data.status === "success" && response.data.data && response.data.data.data) {
    return response.data.data.data;
  }
  
  // Intentar otras estructuras posibles
  if (Array.isArray(response.data)) {
    return response.data;
  } else if (response.data.data && Array.isArray(response.data.data)) {
    return response.data.data;
  } else if (response.data.contracts && Array.isArray(response.data.contracts)) {
    return response.data.contracts;
  } else if (response.data.items && Array.isArray(response.data.items)) {
    return response.data.items;
  } else if (response.data.results && Array.isArray(response.data.results)) {
    return response.data.results;
  }
  
  return [];
};

// Servicio para contratos
export const contractService = {
  // Obtener todos los contratos
  getAllContracts: async (options = {}) => {
    try {
      const params = formatFilters(options);
      const response = await apiClient.get('/contracts', { params });
      
      // Extraer los contratos de la respuesta y formatearlos
      const contractsData = extractContractsFromResponse(response);
      
      if (contractsData.length === 0) {
        return mockContracts.map(formatContractData);
      }
      
      return contractsData.map(formatContractData);
    } catch (error) {
      console.error('Error al obtener contratos:', error);
      return mockContracts.map(formatContractData);
    }
  },

  // Obtener contratos con filtros
  getFilteredContracts: async (filters) => {
    try {
      const params = formatFilters(filters);
      const response = await apiClient.get('/contracts', { params });
      
      // Extraer los contratos de la respuesta y formatearlos
      const contractsData = extractContractsFromResponse(response);
      
      if (contractsData.length === 0) {
        return mockContracts.map(formatContractData);
      }
      
      return contractsData.map(formatContractData);
    } catch (error) {
      console.error('Error al filtrar contratos:', error);
      return mockContracts.map(formatContractData);
    }
  },
  
  // Obtener un contrato específico por ID
  getContractById: async (id) => {
    try {
      if (!id) return null;
      
      const response = await apiClient.get(`/contracts/${id}`);
      
      if (!response.data) return null;
      
      // Extraer el contrato de la respuesta
      let contractData;
      
      if (response.data.status === "success" && response.data.data) {
        // Estructura esperada
        contractData = response.data.data;
      } else {
        // Otras estructuras posibles
        contractData = response.data.data || response.data;
      }
      
      // Formatear el contrato recibido
      return formatContractData(contractData);
    } catch (error) {
      console.error(`Error al obtener contrato con ID ${id}:`, error);
      const contract = mockContracts.find(c => c.id === id);
      return contract ? formatContractData(contract) : null;
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
      // Simular una respuesta exitosa con el token proporcionado
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
    return true;
  },

  // Obtener información del usuario
  getUserInfo: () => {
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