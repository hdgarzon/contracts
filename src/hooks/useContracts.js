import { useState, useEffect, useCallback } from 'react';
import { contractService } from '../services/api';
import { contracts as mockContracts } from '../data/mockData';

export const useContracts = (initialFilters = {}) => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchContracts = useCallback(async (currentFilters = filters) => {
    setLoading(true);
    try {
      const result = await contractService.getFilteredContracts(currentFilters);
      
      if (!result || !Array.isArray(result)) {
        setContracts([]);
      } else {
        setContracts(result);
      }
      
      setError(null);
    } catch (err) {
      console.error("Error fetching contracts:", err);
      setError("Failed to load contracts. Please try again later.");
      setContracts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Cargar contratos cuando cambian los filtros
  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

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
    setFilters(defaultFilters);
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