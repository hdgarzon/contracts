import { useState, useEffect } from 'react';
import { wixFunctions } from '../data/wixIntegration';

/**
 * Hook personalizado para obtener datos de Wix
 * 
 * Este hook puede utilizarse cuando la aplicación se integre con Wix.
 * Proporciona un patrón consistente para cargar datos y manejar
 * estados de carga y errores.
 */
export const useWixData = (dataFetchFunction, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await dataFetchFunction();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [dataFetchFunction]);
  
  return { data, isLoading, error, refetch: () => setIsLoading(true) };
};

/**
 * Hook para obtener información de membresía de Wix
 */
export const useWixMembership = () => {
  return useWixData(wixFunctions.getCurrentMembership, {
    isLoggedIn: false,
    type: 'max',
    member: null
  });
};

/**
 * Hook para obtener contratos de Wix
 */
export const useWixContracts = () => {
  return useWixData(wixFunctions.getContracts, []);
};

/**
 * Hook para manejar la presentación de una solicitud a Wix
 */
export const useWixSubmitApplication = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const submitApplication = async (contractId, formData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await wixFunctions.submitApplication(contractId, formData);
      setResult(response);
      return response;
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('Failed to submit application. Please try again.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return { submitApplication, isSubmitting, result, error };
};