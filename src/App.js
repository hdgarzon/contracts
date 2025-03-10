import React, { useState, useEffect } from "react";
import { ContractCard } from "./components/ContractCard";
import { DetailView } from "./components/DetailView";
import { LoginModal } from "./components/LoginModal";
import { ApplicationModal } from "./components/ApplicationModal";
import { ConfirmationMessage } from "./components/ConfirmationMessage";
import { filterOptions } from "./data/mockData";
import MaxMemberImg from "./assets/img/MaxMember.svg";
import EliteMemberImg from "./assets/img/EliteMember.svg";
import CalendarImg from "./assets/img/Calendar.svg";
import { useContracts } from "./hooks/useContracts";
import SimplePlacesAutocomplete from './components/SimplePlacesAutocomplete';

const CleaningApp = () => {
  const [view, setView] = useState("list");
  const [membership, setMembership] = useState("elite");
  const [selectedContract, setSelectedContract] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  
  // Usar el hook personalizado para contratos
  const { 
    contracts, 
    loading: isLoading, 
    error, 
    filters: activeFilters, 
    updateFilter, 
    clearFilters, 
    applyFilters 
  } = useContracts(filterOptions);

  // Cerrar modal de login después de un tiempo
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginModal(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Función para actualizar el rango de fechas basado en la selección
  const updateDateRange = (dateOption) => {
    const now = new Date();
    let startDate, endDate;
    
    // Calcular el inicio de la semana actual (domingo)
    const getStartOfWeek = (date) => {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      return start;
    };
    
    // Calcular el fin de la semana (sábado)
    const getEndOfWeek = (startDate) => {
      const end = new Date(startDate);
      end.setDate(startDate.getDate() + 6);
      return end;
    };
    
    if (dateOption === 'This Week') {
      // Desde el domingo hasta el sábado de la semana actual
      startDate = getStartOfWeek(now);
      endDate = getEndOfWeek(startDate);
    } 
    else if (dateOption === 'Next Week') {
      // Desde el domingo hasta el sábado de la próxima semana
      const nextWeek = new Date(now);
      nextWeek.setDate(now.getDate() + 7);
      startDate = getStartOfWeek(nextWeek);
      endDate = getEndOfWeek(startDate);
    } 
    else if (dateOption === 'This Month') {
      // Desde el primer día hasta el último día del mes actual
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } 
    else if (dateOption === 'Next Month') {
      // Desde el primer día hasta el último día del próximo mes
      startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    }
    
    // Formatear fechas como MM/DD/YYYY
    const formatDate = (date) => {
      return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
    };
    
    const dateRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    
    // Actualizar fecha en API y rango para mostrar
    updateFilter('date', dateOption);
    updateFilter('dateRange', dateRange);
    
    // También actualizamos las fechas de inicio y fin para la API
    updateFilter('startDate', startDate.toISOString().split('T')[0]);
    updateFilter('endDate', endDate.toISOString().split('T')[0]);
  };

  // Manejar cambios en los checkboxes de tipos
  const handleTypeChange = (type, isChecked) => {
    const newTypes = isChecked 
      ? [...activeFilters.types, type] 
      : activeFilters.types.filter(t => t !== type);
    
    updateFilter('types', newTypes);
  };

  // Manejar cambios en los checkboxes de bids
  const handleBidsChange = (bid, isChecked) => {
    const newBids = isChecked 
      ? [...activeFilters.bids, bid] 
      : activeFilters.bids.filter(b => b !== bid);
    
    updateFilter('bids', newBids);
  };

  // Manejar cambios de ubicación
  const handleLocationChange = (coordinates, details) => {
    // Guarda las coordenadas para enviar a la API
    updateFilter('location', coordinates);
    
    // También guarda el nombre para mostrar
    updateFilter('displayLocation', details.displayName);
  };

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    clearFilters(filterOptions);
  };

  // Handle contract selection
  const handleContractSelect = (contract) => {
    setSelectedContract(contract);
    setView("detail");
  };

  // Handle apply button click
  const handleApply = () => {
    setShowApplicationModal(true);
  };

  // Handle application submission
  const handleSubmitApplication = (formData) => {
    // Aquí se podría conectar con la API para enviar la aplicación
    console.log("Datos del formulario enviados:", formData);

    // Simular proceso de envío
    setTimeout(() => {
      setShowApplicationModal(false);
      setView("confirmation");
    }, 1000);
  };

  // Handle back button click
  const handleBack = () => {
    if (view === "detail") {
      setView("list");
    } else if (view === "confirmation") {
      setView("list");
    }
  };

  // Close login modal
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  // Establecer el rango de fechas si no existe al cargar
  useEffect(() => {
    if (!activeFilters.dateRange) {
      updateDateRange(activeFilters.date || 'This Week');
    }
  }, [activeFilters.dateRange]);

  return (
    <div className="min-h-screen bg-white">
      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900 mx-auto"></div>
            <p className="mt-4 text-lg">Loading...</p>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-gray-500 p-10 mb-6">
              {membership === "max" ? (
                <img
                  src={MaxMemberImg}
                  alt="MAX Membership"
                  className="w-50 mx-auto block"
                />
              ) : (
                <img
                  src={EliteMemberImg}
                  alt="ELITE Membership"
                  className="w-50 mx-auto block"
                />
              )}
            </div>

            <div className="bg-gray-700 text-white p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg uppercase">Filters</h2>
                <button 
                  className="text-sm underline"
                  onClick={clearAllFilters}
                >
                  Clear All
                </button>
              </div>
              <div className="border-b border-gray-400 mb-6 mt-6"></div>
              
              {/* Location Filter with Places Autocomplete */}
              <div className="mb-6">
                <h3 className="mb-2 py-4 font-semibold">Location</h3>
                <p className="text-sm mb-2">Search by city or postal code</p>
                <SimplePlacesAutocomplete 
                  value={activeFilters.location || ""}
                  onChange={handleLocationChange}
                  placeholder="Enter a city name (e.g. Tampa, FL)"
                />
                {activeFilters.displayLocation && (
                  <p className="text-xs mt-1 text-gray-300">
                    Selected: {activeFilters.displayLocation}
                  </p>
                )}
              </div>
              
              <div className="border-b border-gray-400 mb-6 mt-6"></div>
              <div className="mb-6">
                <h3 className="mb-2 py-4 font-semibold">Date</h3>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Select option</span>
                  <div className="text-xs py-1 rounded flex justify-between">
                    <img
                      src={CalendarImg}
                      alt="Calendar"
                      className="w-50 px-2"
                    />
                    {activeFilters.dateRange}
                  </div>
                </div>
                <select 
                  className="w-full p-2 border text-gray-800"
                  value={activeFilters.date}
                  onChange={(e) => updateDateRange(e.target.value)}
                >
                  <option value="This Week">This Week</option>
                  <option value="Next Week">Next Week</option>
                  <option value="This Month">This Month</option>
                  <option value="Next Month">Next Month</option>
                </select>
              </div>
              <div className="border-b border-gray-400 mb-6 mt-6"></div>
              <div className="mb-6">
                <h3 className="mb-2">Type</h3>
                <div className="space-y-2">
                  {filterOptions.types.map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        id={type}
                        className="mr-2"
                        checked={activeFilters.types.includes(type)}
                        onChange={(e) => handleTypeChange(type, e.target.checked)}
                      />
                      <label htmlFor={type}>{type}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-gray-400 mb-6 mt-6"></div>
              <div className="mb-6">
                <h3 className="mb-2">Bids</h3>
                <div className="space-y-2">
                  {filterOptions.bids.map((bid) => (
                    <div key={bid} className="flex items-center">
                      <input
                        type="checkbox"
                        id={bid}
                        className="mr-2"
                        checked={activeFilters.bids.includes(bid)}
                        onChange={(e) => handleBidsChange(bid, e.target.checked)}
                      />
                      <label htmlFor={bid}>{bid}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Apply Filters Button */}
              <div className="mt-8">
                <button 
                  onClick={applyFilters}
                  className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Welcome to the Opportunities Board!
              </h2>
              <p className="mb-4 font-light text-base">
                New cleaning contracts and job opportunities are posted here and
                prioritized for
                <span className="font-semibold italic"> Quick Pay</span> members,
                followed by
                <span className="font-semibold italic"> ELITE</span> members,
                and then
                <span className="font-semibold"> Max</span> members.
              </p>

              <div className="bg-gray-500 p-4 ">
                <button className="text-blue-500 font-medium">
                  Upgrade Your Membership now
                </button>{" "}
                to unlock priority access and secure more opportunities!
              </div>
            </div>

            {/* Error message if any */}
            {error && (
              <div className="bg-red-100 p-4 mb-6 text-red-700 rounded">
                {error}
              </div>
            )}

            {view === "list" && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-company py-4">
                  Contracts for you
                </h2>
                {contracts.length > 0 ? (
                  contracts.map((contract, index) => (
                    <ContractCard
                      key={index}
                      contract={contract}
                      onSelect={handleContractSelect}
                    />
                  ))
                ) : (
                  !isLoading && (
                    <p className="text-gray-500">No contracts found matching your criteria.</p>
                  )
                )}
              </div>
            )}

            {view === "detail" && selectedContract && (
              <DetailView
                contract={selectedContract}
                onBack={handleBack}
                onApply={handleApply}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
      {showApplicationModal && (
        <ApplicationModal
          onSubmit={handleSubmitApplication}
          onClose={() => setShowApplicationModal(false)}
        />
      )}
      {view === "confirmation" && (
        <ConfirmationMessage onBackToBoard={() => setView("list")} />
      )}
    </div>
  );
};

export default CleaningApp;