import React, { useState, useEffect } from 'react';
import { contractService, authService } from '../services/api';

export const ApiTest = () => {
  const [testResults, setTestResults] = useState({
    userInfo: null,
    contracts: null,
    error: null
  });

  useEffect(() => {
    const testAPI = async () => {
      try {
        // Test user authentication
        const userInfo = authService.getUserInfo();
        console.log('User Info:', userInfo);
        
        // Test contracts endpoint
        const contracts = await contractService.getAllContracts();
        console.log('Contracts:', contracts);

        setTestResults({
          userInfo,
          contracts,
          error: null
        });

      } catch (error) {
        console.error('API Test Error:', error);
        setTestResults(prev => ({
          ...prev,
          error: error.message
        }));
      }
    };

    testAPI();
  }, []);

  return (
    <div className="p-4 bg-gray-100 mb-4">
      <h2 className="text-xl font-bold mb-4">API Test Results</h2>
      {testResults.error ? (
        <div className="text-red-500">Error: {testResults.error}</div>
      ) : (
        <div>
          <div className="mb-2">
            <strong>User Info:</strong> {JSON.stringify(testResults.userInfo, null, 2)}
          </div>
          <div>
            <strong>Contracts:</strong> {testResults.contracts ? `Found ${testResults.contracts.length} contracts` : 'Loading...'}
          </div>
        </div>
      )}
    </div>
  );
};