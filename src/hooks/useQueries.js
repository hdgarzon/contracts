import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { contractService, applicationService, authService } from '../services/api';

// Claves de consulta para React Query
export const QUERY_KEYS = {
  CONTRACTS: 'contracts',
  FILTERED_CONTRACTS: 'filteredContracts',
  CONTRACT_DETAIL: 'contractDetail',
  USER_APPLICATIONS: 'userApplications',
  USER_INFO: 'userInfo',
};

// Hook para obtener todos los contratos
export const useContracts = (page = 1) => {
  return useQuery(
    [QUERY_KEYS.CONTRACTS, page],
    () => contractService.getAllContracts({ page }),
    {
      staleTime: 5 * 60 * 1000, // 5 minutos
      refetchOnMount: true,
      keepPreviousData: true, // Mantener datos anteriores mientras se cargan nuevos
    }
  );
};

// Hook para obtener contratos filtrados
export const useFilteredContracts = (filters) => {
  return useQuery(
    [QUERY_KEYS.FILTERED_CONTRACTS, filters],
    () => contractService.getFilteredContracts(filters),
    {
      enabled: !!filters, // Solo ejecutar si hay filtros
      keepPreviousData: true, // Mantener datos anteriores mientras se cargan los nuevos
      refetchOnWindowFocus: false,
      staleTime: 2 * 60 * 1000, // 2 minutos
    }
  );
};

// Hook para obtener detalles de un contrato
export const useContractDetail = (id) => {
  return useQuery(
    [QUERY_KEYS.CONTRACT_DETAIL, id],
    () => contractService.getContractById(id),
    {
      enabled: !!id, // Solo ejecutar si hay un ID
      staleTime: 10 * 60 * 1000, // 10 minutos para detalles (cambian con menos frecuencia)
    }
  );
};

// Hook para enviar una solicitud de aplicación
export const useSubmitApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    applicationService.submitApplication,
    {
      // Cuando se completa con éxito, invalidar caché de aplicaciones
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.USER_APPLICATIONS);
        // También invalidar los contratos para actualizar número de bidders
        queryClient.invalidateQueries(QUERY_KEYS.CONTRACTS);
      },
    }
  );
};

// Hook para obtener aplicaciones del usuario
export const useUserApplications = () => {
  return useQuery(
    QUERY_KEYS.USER_APPLICATIONS,
    applicationService.getUserApplications,
    {
      enabled: authService.isAuthenticated(), // Solo ejecutar si el usuario está autenticado
      retry: false, // No reintentar si falla
    }
  );
};

// Hook para login de usuario
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    authService.login,
    {
      onSuccess: (data) => {
        // Guardar datos del usuario en caché para acceso rápido
        queryClient.setQueryData(QUERY_KEYS.USER_INFO, data.user);
        // Invalida cualquier consulta que dependa del estado de autenticación
        queryClient.invalidateQueries();
      },
    }
  );
};

// Hook para logout de usuario
export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return {
    logout: () => {
      authService.logout();
      // Limpiar caché relacionada con el usuario
      queryClient.setQueryData(QUERY_KEYS.USER_INFO, null);
      queryClient.removeQueries(QUERY_KEYS.USER_APPLICATIONS);
      // Reiniciar ciertas consultas
      queryClient.invalidateQueries(QUERY_KEYS.CONTRACTS);
    }
  };
};

// Hook para obtener info de usuario actual (siempre disponible con el token hardcodeado)
export const useUserInfo = () => {
  return useQuery(
    QUERY_KEYS.USER_INFO, 
    () => authService.getUserInfo(),
    {
      staleTime: Infinity, // Estos datos no se vuelven obsoletos
      initialData: authService.getUserInfo(), // Data inicial
    }
  );
};

// Hook para paginación (opcional, si la API soporta paginación)
export const usePagination = (initialPage = 1) => {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(initialPage);
  
  // Prefetch página siguiente para hacer la transición más fluida
  React.useEffect(() => {
    queryClient.prefetchQuery(
      [QUERY_KEYS.CONTRACTS, page + 1],
      () => contractService.getAllContracts({ page: page + 1 })
    );
  }, [page, queryClient]);
  
  return {
    page,
    setPage,
    nextPage: () => setPage(old => old + 1),
    prevPage: () => setPage(old => Math.max(1, old - 1)),
    goToPage: (newPage) => setPage(newPage)
  };
};