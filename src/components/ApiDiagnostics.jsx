import React, { useState, useEffect } from 'react';
import { contractService } from '../services/api';

// Componente para diagnosticar problemas con la API
const ApiDiagnostics = () => {
  const [status, setStatus] = useState('idle');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [endpoints, setEndpoints] = useState([
    { name: '/contracts', tested: false, success: false, contracts: 0, error: null },
    { name: '/contract-opportunities', tested: false, success: false, contracts: 0, error: null },
    { name: '/contracts sin parámetros', tested: false, success: false, contracts: 0, error: null },
    { name: '/contracts/search (POST)', tested: false, success: false, contracts: 0, error: null }
  ]);

  // Función para ejecutar pruebas
  const runTests = async () => {
    setStatus('testing');
    setResults([]);
    setError(null);
    
    // Reiniciar estado de endpoints
    setEndpoints(endpoints.map(endpoint => ({
      ...endpoint,
      tested: false,
      success: false,
      contracts: 0,
      error: null
    })));
    
    try {
      // Prueba 1: Endpoint principal con parámetros
      await testEndpoint(0, '/contracts', async () => {
        const params = {
          page: "1",
          per_page: "20",
          location: "-82.5513709,27.4974141",
          startDate: "2025-01-01",
          endDate: "2025-12-10",
          types: "Multifamily,Studio Housing",
          bids: "True"
        };
        
        const response = await fetch(
          'https://8s3qysgi68.execute-api.us-east-1.amazonaws.com/dev/api/web/contracts', 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'CCLN5tQXou8tAM92RndP21uhir68aLyL7tpIUmWx',
              'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6ImMwNmVjNzI2LTE1ZDMtNGNlNS1iODA4LTEwYTY1OGRjOTg5YiIsImxvZ2luRW1haWwiOiJzYW1hbmV6QGdtYWlsLmNvbSIsIm9yaWdlbiI6IndpeC1wcm8tcGluY2giLCJmaXJzdE5hbWUiOiJSb21tZWwiLCJsYXN0TmFtZSI6IlNhbWFuZXoiLCJzdXNjcmlwdGlvbnMiOltdLCJpYXQiOjE3MzM1Nzg2MjYsImV4cCI6MTc2NDY4MjYyNn0.EDfwySVMjVAz9ZgkaDVxkPh2W0W5F-N_1Y0puB3A7Zb9DKIuMI9yTnhA2y4ZWb7Y9fVyV-IGN-KyjGy9JO90ja5L6uPSRvA9TRJS-5_HiIF8tN5nYJJHiWjSsqeRL6IVCPbvrBHBql5AI9I1k8ywIO_9_3cSSi-1sFdmWnOhit4qoJRKgwsTb3wrGbSB1clGX_K4NnyHdyrVh0s4UBld21TJDFogW4ibFBHm0zj7S3MEQ9dVVcygL0X0nONiZNufRICoyj4jZIOLlfl1pk4Y_mKwSyoRJ7D4z2ZN3Uz3xGP1aEVUUHDWuhq_ECTP9HmibDvQ-xJL2X_ZiimxD1As9w`
            }
          }
        );
        
        const data = await response.json();
        addResult(`GET /contracts con parámetros: ${response.status} ${response.statusText}`);
        return data;
      });
      
      // // Prueba 2: Endpoint alternativo
      // await testEndpoint(1, '/contract-opportunities', async () => {
      //   const params = {
      //     page: "1",
      //     per_page: "20"
      //   };
        
      //   const response = await fetch(
      //     'https://8s3qysgi68.execute-api.us-east-1.amazonaws.com/dev/api/web/contract-opportunities', 
      //     {
      //       method: 'GET',
      //       headers: {
      //         'Content-Type': 'application/json',
      //         'x-api-key': 'CCLN5tQXou8tAM92RndP21uhir68aLyL7tpIUmWx',
      //         'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6ImMwNmVjNzI2LTE1ZDMtNGNlNS1iODA4LTEwYTY1OGRjOTg5YiIsImxvZ2luRW1haWwiOiJzYW1hbmV6QGdtYWlsLmNvbSIsIm9yaWdlbiI6IndpeC1wcm8tcGluY2giLCJmaXJzdE5hbWUiOiJSb21tZWwiLCJsYXN0TmFtZSI6IlNhbWFuZXoiLCJzdXNjcmlwdGlvbnMiOltdLCJpYXQiOjE3MzM1Nzg2MjYsImV4cCI6MTc2NDY4MjYyNn0.EDfwySVMjVAz9ZgkaDVxkPh2W0W5F-N_1Y0puB3A7Zb9DKIuMI9yTnhA2y4ZWb7Y9fVyV-IGN-KyjGy9JO90ja5L6uPSRvA9TRJS-5_HiIF8tN5nYJJHiWjSsqeRL6IVCPbvrBHBql5AI9I1k8ywIO_9_3cSSi-1sFdmWnOhit4qoJRKgwsTb3wrGbSB1clGX_K4NnyHdyrVh0s4UBld21TJDFogW4ibFBHm0zj7S3MEQ9dVVcygL0X0nONiZNufRICoyj4jZIOLlfl1pk4Y_mKwSyoRJ7D4z2ZN3Uz3xGP1aEVUUHDWuhq_ECTP9HmibDvQ-xJL2X_ZiimxD1As9w`
      //       }
      //     }
      //   );
        
      //   const data = await response.json();
      //   addResult(`GET /contract-opportunities: ${response.status} ${response.statusText}`);
      //   return data;
      // });
      
      // Prueba 3: Endpoint principal sin parámetros
      await testEndpoint(2, '/contracts sin parámetros', async () => {
        const response = await fetch(
          'https://8s3qysgi68.execute-api.us-east-1.amazonaws.com/dev/api/web/contracts', 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'CCLN5tQXou8tAM92RndP21uhir68aLyL7tpIUmWx',
              'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6ImMwNmVjNzI2LTE1ZDMtNGNlNS1iODA4LTEwYTY1OGRjOTg5YiIsImxvZ2luRW1haWwiOiJzYW1hbmV6QGdtYWlsLmNvbSIsIm9yaWdlbiI6IndpeC1wcm8tcGluY2giLCJmaXJzdE5hbWUiOiJSb21tZWwiLCJsYXN0TmFtZSI6IlNhbWFuZXoiLCJzdXNjcmlwdGlvbnMiOltdLCJpYXQiOjE3MzM1Nzg2MjYsImV4cCI6MTc2NDY4MjYyNn0.EDfwySVMjVAz9ZgkaDVxkPh2W0W5F-N_1Y0puB3A7Zb9DKIuMI9yTnhA2y4ZWb7Y9fVyV-IGN-KyjGy9JO90ja5L6uPSRvA9TRJS-5_HiIF8tN5nYJJHiWjSsqeRL6IVCPbvrBHBql5AI9I1k8ywIO_9_3cSSi-1sFdmWnOhit4qoJRKgwsTb3wrGbSB1clGX_K4NnyHdyrVh0s4UBld21TJDFogW4ibFBHm0zj7S3MEQ9dVVcygL0X0nONiZNufRICoyj4jZIOLlfl1pk4Y_mKwSyoRJ7D4z2ZN3Uz3xGP1aEVUUHDWuhq_ECTP9HmibDvQ-xJL2X_ZiimxD1As9w`
            }
          }
        );
        
        const data = await response.json();
        addResult(`GET /contracts sin parámetros: ${response.status} ${response.statusText}`);
        return data;
      });
      
      // Prueba 4: POST contracts/search
      await testEndpoint(3, '/contracts/search (POST)', async () => {
        const response = await fetch(
          'https://8s3qysgi68.execute-api.us-east-1.amazonaws.com/dev/api/web/contracts/search', 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': 'CCLN5tQXou8tAM92RndP21uhir68aLyL7tpIUmWx',
              'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6ImMwNmVjNzI2LTE1ZDMtNGNlNS1iODA4LTEwYTY1OGRjOTg5YiIsImxvZ2luRW1haWwiOiJzYW1hbmV6QGdtYWlsLmNvbSIsIm9yaWdlbiI6IndpeC1wcm8tcGluY2giLCJmaXJzdE5hbWUiOiJSb21tZWwiLCJsYXN0TmFtZSI6IlNhbWFuZXoiLCJzdXNjcmlwdGlvbnMiOltdLCJpYXQiOjE3MzM1Nzg2MjYsImV4cCI6MTc2NDY4MjYyNn0.EDfwySVMjVAz9ZgkaDVxkPh2W0W5F-N_1Y0puB3A7Zb9DKIuMI9yTnhA2y4ZWb7Y9fVyV-IGN-KyjGy9JO90ja5L6uPSRvA9TRJS-5_HiIF8tN5nYJJHiWjSsqeRL6IVCPbvrBHBql5AI9I1k8ywIO_9_3cSSi-1sFdmWnOhit4qoJRKgwsTb3wrGbSB1clGX_K4NnyHdyrVh0s4UBld21TJDFogW4ibFBHm0zj7S3MEQ9dVVcygL0X0nONiZNufRICoyj4jZIOLlfl1pk4Y_mKwSyoRJ7D4z2ZN3Uz3xGP1aEVUUHDWuhq_ECTP9HmibDvQ-xJL2X_ZiimxD1As9w`
            },
            body: JSON.stringify({
              page: "1",
              per_page: "20",
              location: "-82.5513709,27.4974141",
              startDate: "2025-01-01",
              endDate: "2025-12-10",
              types: "Multifamily,Studio Housing",
              bids: "True"
            })
          }
        );
        
        const data = await response.json();
        addResult(`POST /contracts/search: ${response.status} ${response.statusText}`);
        return data;
      });
      
      // Prueba adicional con el servicio actual
      try {
        addResult("Probando servicio actual contractService.getAllContracts()...");
        const contracts = await contractService.getAllContracts();
        addResult(`El servicio actual devolvió ${contracts.length} contratos`);
        
        if (contracts.length > 0) {
          addResult(`Primer contrato: ${JSON.stringify(contracts[0])}`);
        }
      } catch (err) {
        addResult(`Error en servicio actual: ${err.message}`);
      }
      
      setStatus('completed');
    } catch (err) {
      console.error("Error ejecutando pruebas:", err);
      setError(err.message);
      setStatus('error');
    }
  };
  
  // Función auxiliar para probar un endpoint y actualizar su estado
  const testEndpoint = async (index, name, testFunction) => {
    // Actualizar estado a 'testing'
    setEndpoints(prev => 
      prev.map((endpoint, i) => 
        i === index ? { ...endpoint, tested: true } : endpoint
      )
    );
    
    try {
      const data = await testFunction();
      
      // Intentar encontrar contratos en la respuesta
      let contracts = [];
      
      if (Array.isArray(data)) {
        contracts = data;
      } else if (data.data && Array.isArray(data.data)) {
        contracts = data.data;
      } else if (data.contracts && Array.isArray(data.contracts)) {
        contracts = data.contracts;
      } else if (data.items && Array.isArray(data.items)) {
        contracts = data.items;
      } else if (data.results && Array.isArray(data.results)) {
        contracts = data.results;
      }
      
      // Actualizar estado del endpoint
      setEndpoints(prev => 
        prev.map((endpoint, i) => 
          i === index ? { 
            ...endpoint, 
            tested: true, 
            success: true, 
            contracts: contracts.length,
            error: null
          } : endpoint
        )
      );
      
      // Añadir información sobre la respuesta
      addResult(`Endpoint ${name}: Se encontraron ${contracts.length} contratos`);
      if (contracts.length > 0) {
        addResult(`Ejemplo de contrato: ${JSON.stringify(contracts[0]).slice(0, 200)}...`);
      } else {
        addResult(`Estructura de respuesta: ${JSON.stringify(data).slice(0, 200)}...`);
      }
      
      return contracts;
    } catch (err) {
      console.error(`Error en endpoint ${name}:`, err);
      
      // Actualizar estado del endpoint con error
      setEndpoints(prev => 
        prev.map((endpoint, i) => 
          i === index ? { 
            ...endpoint, 
            tested: true, 
            success: false, 
            contracts: 0,
            error: err.message
          } : endpoint
        )
      );
      
      addResult(`Error en ${name}: ${err.message}`);
      return [];
    }
  };
  
  // Función auxiliar para añadir resultados
  const addResult = (message) => {
    setResults(prev => [...prev, message]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Diagnóstico de API</h2>
      
      <div className="mb-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={runTests}
          disabled={status === 'testing'}
        >
          {status === 'testing' ? 'Ejecutando pruebas...' : 'Ejecutar pruebas de API'}
        </button>
      </div>
      
      {/* Estado de pruebas */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Estado:</h3>
        <div className={`p-2 rounded ${
          status === 'completed' ? 'bg-green-100' : 
          status === 'testing' ? 'bg-yellow-100' : 
          status === 'error' ? 'bg-red-100' : 'bg-gray-100'
        }`}>
          {status === 'idle' && 'Listo para iniciar pruebas'}
          {status === 'testing' && 'Ejecutando pruebas...'}
          {status === 'completed' && 'Pruebas completadas'}
          {status === 'error' && `Error: ${error}`}
        </div>
      </div>
      
      {/* Resultados de endpoints */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Endpoints:</h3>
        <div className="space-y-2">
          {endpoints.map((endpoint, index) => (
            <div 
              key={index}
              className={`p-3 rounded border ${
                !endpoint.tested ? 'bg-gray-50 border-gray-200' : 
                endpoint.success ? 'bg-green-50 border-green-200' : 
                'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{endpoint.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  !endpoint.tested ? 'bg-gray-200' : 
                  endpoint.success ? 'bg-green-200' : 
                  'bg-red-200'
                }`}>
                  {!endpoint.tested ? 'No probado' : 
                   endpoint.success ? `OK (${endpoint.contracts} contratos)` : 
                   'Error'}
                </span>
              </div>
              {endpoint.error && (
                <div className="mt-1 text-sm text-red-600">{endpoint.error}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Log de resultados */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Resultados detallados:</h3>
        <div className="bg-gray-800 text-white p-3 rounded overflow-auto max-h-80 font-mono text-sm">
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="mb-1">
                <span className="text-gray-400">[{index+1}]</span> {result}
              </div>
            ))
          ) : (
            <div className="text-gray-400 italic">No hay resultados aún</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiDiagnostics;