import { QueryClient } from 'react-query';

// Configuración global para React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // No volver a buscar datos cuando la ventana recupera el foco
      retry: 1, // Reintentar una vez si falla
      staleTime: 5 * 60 * 1000, // Los datos se consideran obsoletos después de 5 minutos
      cacheTime: 10 * 60 * 1000, // Cache se mantiene por 10 minutos
    },
    mutations: {
      retry: 1, // Reintentar una vez si falla
    }
  },
});