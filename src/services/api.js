// Servicio para conectarse a la API
import axios from "axios";
import { formatDate, formatCurrency } from "../utils/formatters";
import { getCoordinatesByName } from "./geocoding";
import { getAuthToken } from "./api-auth";
import { API_URL, API_KEY, ENV } from "../config/env";

// Define la URL base para todas las peticiones API usando la variable de entorno
const API_BASE_URL = API_URL;

// Mostrar información en consola sobre el ambiente configurado (solo en desarrollo)
if (ENV !== 'prod') {
  console.log(`API configurada para ambiente: ${ENV}`);
  console.log(`API URL: ${API_BASE_URL}`);
}

// Crear una instancia de axios con la configuración base
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

// Interceptor para añadir el token a cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      // Formato correcto para el token JWT
      config.headers.Authorization = `Bearer ${token}`;
      
      // Solo para depuración - remover en producción
      if (ENV !== 'prod') {
        console.log("Token incluido:", token.substring(0, 15) + "...");
      }
    } else {
      console.warn("No hay token disponible para la solicitud a:", config.url);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    
    console.log("URL solicitada:", config.url);
    console.log("Parámetros:", config.params);
    console.log("¿Hay token?", !!token);
    
    if (token) {
      // Formato correcto para el token JWT
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token incluido (primeros 15 caracteres):", token.substring(0, 15) + "...");
    } else {
      console.warn("No hay token disponible para la solicitud");
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Función para formatear los filtros según la estructura esperada por la API
const formatFilters = (filters) => {
  if (!filters) return {};

  // Valores predeterminados exactamente como espera la API, pero sin location
  const defaultParams = {
    page: "1",
    per_page: "20",
    startDate: "2025-01-01",
    endDate: "2025-12-10",
    bids: "False", // Changed default to False
    types: "Multifamily,Studio Housing",
  };

  // Comenzar con los parámetros predeterminados
  const params = { ...defaultParams };

  // Añadir location solo si está presente en los filtros
  if (filters.location) {
    // Si es coordenadas en formato "lng,lat" (validar que realmente son coordenadas)
    const isCoordinates = typeof filters.location === "string" && 
                          /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(filters.location);
    
    if (isCoordinates) {
      params.location = filters.location;
    }
    // Si es un objeto con lat y lng
    else if (
      typeof filters.location === "object" &&
      filters.location !== null &&
      "lat" in filters.location &&
      "lng" in filters.location
    ) {
      params.location = `${filters.location.lng},${filters.location.lat}`;
    }
    // Si es un nombre de ubicación
    else if (typeof filters.location === "string") {
      // Intentamos obtener coordenadas del nombre desde nuestro servicio
      const coordinates = getCoordinatesByName(filters.location);
      if (coordinates) {
        params.location = coordinates;
      }
      // Si no podemos obtener coordenadas, no añadimos el parámetro location
    }
  }

  // Manejar las fechas basadas en el filtro de fecha
  if (filters.date) {
    const now = new Date();

    if (filters.date === "This Week") {
      // Calcular inicio y fin de semana
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      params.startDate = startOfWeek.toISOString().split("T")[0];
      params.endDate = endOfWeek.toISOString().split("T")[0];
    } else if (filters.date === "Next Week") {
      // Calcular inicio y fin de la próxima semana
      const nextWeek = new Date(now);
      nextWeek.setDate(now.getDate() + 7);
      const startOfNextWeek = new Date(nextWeek);
      startOfNextWeek.setDate(nextWeek.getDate() - nextWeek.getDay());
      const endOfNextWeek = new Date(startOfNextWeek);
      endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);

      params.startDate = startOfNextWeek.toISOString().split("T")[0];
      params.endDate = endOfNextWeek.toISOString().split("T")[0];
    } else if (filters.date === "This Month") {
      // Calcular inicio y fin de mes
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      params.startDate = startOfMonth.toISOString().split("T")[0];
      params.endDate = endOfMonth.toISOString().split("T")[0];
    } else if (filters.date === "Next Month") {
      // Calcular inicio y fin del próximo mes
      const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const endOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0);

      params.startDate = startOfNextMonth.toISOString().split("T")[0];
      params.endDate = endOfNextMonth.toISOString().split("T")[0];
    }
    // Para otros periodos usamos los valores por defecto
  }

  // Usar fechas específicas si están incluidas en los filtros
  if (filters.startDate) {
    params.startDate = filters.startDate;
  }
  if (filters.endDate) {
    params.endDate = filters.endDate;
  }

  // Manejar tipos de propiedad
  if (
    filters.types &&
    Array.isArray(filters.types) &&
    filters.types.length > 0
  ) {
    params.types = filters.types.join(",");
  }

  // Manejar bids - API espera "True" o "False"
  if (filters.bids && Array.isArray(filters.bids)) {
    // Si incluye "With bids", establecer como "True"
    if (filters.bids.includes("With bids")) {
      params.bids = "True";
    }
    // Si solo incluye "Without Bids", establecer como "False"
    else if (
      filters.bids.includes("Without Bids") &&
      !filters.bids.includes("With bids")
    ) {
      params.bids = "False";
    }
  }

  // Imprimir los parámetros que se utilizarán para depuración
  console.log("Parámetros API:", params);

  return params;
};

// Función para formatear los datos de contrato recibidos de la API
const formatContractData = (apiContract) => {
  // Crear contrato con valores predeterminados según la estructura proporcionada
  const contract = {
    id: apiContract._id || "", // Usar _id de MongoDB para llamadas a la API
    number: apiContract.number || "", // Guardar el número visible para mostrar al usuario
    status: apiContract.status || "published",
    type: apiContract.type || "",
    name: apiContract.services || "Turn Over",
    location: apiContract.location || "",
    startDate: formatDate(apiContract.startDate) || "",
    jobsPerMonth: apiContract.jobsPerMonth || 0,
    value: apiContract.anualEstimation?.clientPrice
      ? formatCurrency(apiContract.anualEstimation.clientPrice)
      : "0",
    unitCount: apiContract.units || apiContract.unitCount || 0,
    bidders: apiContract.bidders || 0,
    scopeOfWork: apiContract.scopeOfWork || "No disponible",
    winCleaner: apiContract.winCleaner || null,
  };

  // Verificar cada propiedad en caso de que se necesite mapeo adicional
  if (ENV !== 'prod') {
    console.log("Datos del contrato de la API:", apiContract);
    console.log("Contrato formateado:", contract);
  }

  return contract;
};

// Función para extraer el array de contratos de la respuesta API
const extractContractsFromResponse = (response) => {
  if (!response || !response.data) {
    return [];
  }

  // Si response.data ya es un array, usarlo directamente
  if (Array.isArray(response.data)) {
    return response.data;
  }

  // Verificar si tenemos la estructura esperada
  if (
    response.data.status === "success" &&
    response.data.data &&
    response.data.data.data
  ) {
    return response.data.data.data;
  } else if (response.data.data && Array.isArray(response.data.data)) {
    return response.data.data;
  } else if (
    response.data.contracts &&
    Array.isArray(response.data.contracts)
  ) {
    return response.data.contracts;
  } else if (response.data.items && Array.isArray(response.data.items)) {
    return response.data.items;
  } else if (response.data.results && Array.isArray(response.data.results)) {
    return response.data.results;
  }

  return [];
};

// Función para validar y limpiar el ID del contrato para MongoDB
const validateContractId = (id) => {
  if (!id) {
    console.error("ID de contrato no proporcionado");
    throw new Error("Contract ID is required");
  }

  // Eliminar espacios en blanco
  const cleanId = id.toString().trim();
  
  // Verificar si se ajusta al formato de MongoDB ObjectId (24 caracteres hexadecimales)
  // o si es un código con formato CO###### que podría necesitar transformación
  const isMongoId = /^[0-9a-fA-F]{24}$/.test(cleanId);
  const isContractCode = /^CO\d+$/.test(cleanId);
  
  if (!isMongoId && !isContractCode) {
    console.error(`ID de contrato inválido: ${cleanId}. Debe ser un ObjectId de MongoDB válido o un código de contrato.`);
    throw new Error("Invalid contract ID format");
  }
  
  return cleanId;
};

// Servicio para contratos
export const contractService = {
  // Obtener todos los contratos
  getAllContracts: async (options = {}) => {
    try {
      const params = formatFilters(options);
      const response = await apiClient.get("/contracts", { params });

      // Extraer los contratos de la respuesta y formatearlos
      const contractsData = extractContractsFromResponse(response);

      // Return empty array if no contracts are found
      return contractsData.map(formatContractData);
    } catch (error) {
      console.error("Error al obtener contratos:", error);
      // Return empty array - no mock data fallback
      return [];
    }
  },

  // Obtener contratos con filtros
  getFilteredContracts: async (filters) => {
    try {
      // Verificar autenticación primero
      const token = getAuthToken();
      if (!token && ENV !== 'prod') {
        console.warn("No hay token disponible para getFilteredContracts");
        // Return empty array
        return [];
      }
      
      const params = formatFilters(filters);
      
      // Log detallado para depuración
      console.log("Solicitando contratos filtrados con parámetros:", params);
      
      try {
        const response = await apiClient.get("/contracts", { params });
        
        // Extraer los contratos de la respuesta y formatearlos
        const contractsData = extractContractsFromResponse(response);
        const formattedContracts = contractsData.map(formatContractData);
        
        console.log("Contratos recibidos:", formattedContracts.length);
        return formattedContracts;
      } catch (apiError) {
        console.error("Error específico de API:", apiError.response?.status, apiError.response?.data);
        
        // Si el error es 401 o 403, podría ser un problema con el token
        if (apiError.response?.status === 401 || apiError.response?.status === 403) {
          console.error("Error de autenticación, posible token inválido");
        }
        
        // Si el error es 500, es un problema del servidor
        if (apiError.response?.status === 500) {
          console.error("Error del servidor:", apiError.response?.data);
        }
        
        throw apiError; // Re-lanzar para manejo adicional
      }
    } catch (error) {
      console.error("Error general en getFilteredContracts:", error);
      // Return empty array instead of mock data
      return [];
    }
  },

  // Obtener un contrato específico por ID
  getContractById: async (id) => {
    try {
      if (!id) return null;

      // Validar y limpiar el ID del contrato
      const cleanId = validateContractId(id);

      const response = await apiClient.get(`/contracts/${cleanId}`);

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
      console.error("Error al obtener contrato por ID:", error);
      // Don't return mock data here
      return null;
    }
  },
};

// Servicio para aplicaciones/postulaciones a contratos
export const applicationService = {
  // Enviar una aplicación para un contrato
  submitApplication: async (contractId, formData) => {
    try {
      // Validar que tenemos un ID
      if (!contractId) {
        console.error("ID de contrato no proporcionado");
        throw new Error("Contract ID is required");
      }
      
      // Eliminar espacios en blanco
      const cleanId = contractId.toString().trim();
      
      console.log(`Enviando aplicación para contrato ID: ${cleanId}`);
      
      // Transformar datos del formulario para coincidir con el formato esperado por la API
      const apiData = {
        survey: {
          teamSize: formData.teamSize,
          cleaningExperience: formData.experienceYears,
          managementCompanies: {
            experience: formData.hasPropertyExperience,
            companyName: formData.companyName || "",
            lastCleanedYear: formData.lastCleanedYear || "",
          },
          availability: {
            mon: formData.availableDays.includes("Mon"),
            tue: formData.availableDays.includes("Tue"),
            wed: formData.availableDays.includes("Wed"),
            thur: formData.availableDays.includes("Thur"),
            fri: formData.availableDays.includes("Fri"),
            sat: formData.availableDays.includes("Sat"),
            sun: formData.availableDays.includes("Sun"),
          },
          notWorkingHours: {
            apply: formData.unavailableTimes !== "none",
            closeRange:
              formData.unavailableTimes === "none"
                ? ""
                : formData.unavailableTimes,
          },
        },
      };
  
      console.log("Datos formateados para API:", JSON.stringify(apiData, null, 2));
      
      // Hacer la llamada a la API para enviar la aplicación
      const response = await apiClient.put(
        `/contracts/${cleanId}`,
        apiData
      );
  
      return response.data;
    } catch (error) {
      console.error("Error al enviar aplicación:", error);
      
      // Información más detallada para diagnóstico
      if (error.response) {
        console.error("Respuesta del servidor:", error.response.status, error.response.data);
      }
      
      // Lanzar el error para que pueda ser capturado por la función que lo llama
      throw error;
    }
  },
  

  // Obtener aplicaciones del usuario
  getUserApplications: async () => {
    try {
      const response = await apiClient.get("/applications/user");
      return response.data.data || [];
    } catch (error) {
      console.error("Error al obtener aplicaciones del usuario:", error);
      throw error;
    }
  },
};

// Servicio para autenticación
export const authService = {
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    const token = getAuthToken();
    return !!token && token.length > 10;
  },

  // Obtener información del usuario a partir del token actual
  getUserInfo: async () => {
    try {
      const response = await apiClient.get("/profile");
      return response.data.data;
    } catch (error) {
      console.error("Error al obtener información del usuario:", error);
      // Devolver información de perfil simulada
      return {
        id: "user-id",
        email: "usuario@ejemplo.com",
        firstName: "Usuario",
        lastName: "Ejemplo",
        membershipType: "max"
      };
    }
  },
};

export default {
  contractService,
  applicationService,
  authService,
};