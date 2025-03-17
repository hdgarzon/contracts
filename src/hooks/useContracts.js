// src/hooks/useContracts.js
import { useState, useEffect, useCallback, useRef } from 'react';
import { contractService } from '../services/api';

export const useContracts = (initialFilters = {}) => {
  // Omitir location del filtro inicial
  const initialFiltersWithoutLocation = { ...initialFilters };
  delete initialFiltersWithoutLocation.location;
  
  // Configurar el período de 3 meses por defecto y bids como False para la primera llamada
  const getDefaultFirstFilters = () => {
    const now = new Date();
    const threeMonthsLater = new Date(now);
    threeMonthsLater.setMonth(now.getMonth() + 3);
    
    return {
      ...initialFiltersWithoutLocation,
      startDate: now.toISOString().split('T')[0],
      endDate: threeMonthsLater.toISOString().split('T')[0],
      bids: ['Without Bids'] // Comenzar con "Without Bids" solamente
    };
  };
  
  // Estados para controlar los contratos, carga, errores y filtros
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(getDefaultFirstFilters());
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  // Referencia para controlar si es la primera renderización
  const isInitialRender = useRef(true);
  // Referencia para almacenar la última solicitud de filtros para evitar llamadas duplicadas
  const lastFetchRef = useRef(null);

  // Función para obtener los contratos de la API
  const fetchContracts = useCallback(async (currentFilters = filters) => {
    // Crear una copia de los filtros para no modificar el original
    const filtersToUse = { ...currentFilters };
    
    // Si es la primera carga, eliminar el parámetro location
    if (isFirstLoad) {
      delete filtersToUse.location;
      setIsFirstLoad(false);
    }
    
    // Crear una cadena que represente los filtros para comparación
    const filtersString = JSON.stringify(filtersToUse);
    
    // Si ya hicimos esta solicitud exacta, no la repetimos
    if (lastFetchRef.current === filtersString) {
      return;
    }
    
    // Guardar esta solicitud como la última realizada
    lastFetchRef.current = filtersString;
    
    setLoading(true);
    
    try {
      const result = await contractService.getFilteredContracts(filtersToUse);
      
      if (!result || !Array.isArray(result)) {
        setContracts([]);
      } else {
        setContracts(result);
      }
      
      setError(null);
    } catch (err) {
      setError("Failed to load contracts. Please try again later.");
      setContracts([]);
    } finally {
      setLoading(false);
    }
  }, [filters, isFirstLoad]);

  // Efecto para la carga inicial de datos - solo se ejecuta una vez
  useEffect(() => {
    if (isInitialRender.current) {
      fetchContracts();
      isInitialRender.current = false;
    }
  }, []); // Array de dependencias vacío para ejecutar solo en el montaje inicial

  // Función para actualizar un filtro específico
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Función para actualizar múltiples filtros a la vez
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Función para limpiar todos los filtros
  const clearFilters = useCallback((defaultFilters = {}) => {
    // Asegurar que location no se incluye en los filtros por defecto
    const defaultWithoutLocation = { ...defaultFilters };
    delete defaultWithoutLocation.location;
    setFilters(defaultWithoutLocation);
  }, []);

  // Función para aplicar los filtros actuales manualmente
  const applyFilters = useCallback(() => {
    fetchContracts(filters);
  }, [filters, fetchContracts]);

  return {
    contracts,
    loading,
    error,
    filters,
    updateFilter,
    updateFilters,
    clearFilters,
    applyFilters,
    refetch: fetchContracts
  };
};

export default useContracts;