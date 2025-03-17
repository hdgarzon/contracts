import React, { useState, useEffect } from "react";
import { ContractCard } from "./components/ContractCard";
import { DetailView } from "./components/DetailView";
import { LoginModal } from "./components/LoginModal";
import { ApplicationModal } from "./components/ApplicationModal";
import { ConfirmationMessage } from "./components/ConfirmationMessage";
import { filterOptions } from "./data/mockData";
import SimplePlacesAutocomplete from "./components/SimplePlacesAutocomplete";
import { useContracts } from "./hooks/useContracts";
import { applicationService } from "./services/api";
import { setAuthToken } from "./services/api-auth";
import MembershipContent from "./components/MembershipContent";
import { USE_FIXED_TOKEN } from "./config/env";

const CleaningApp = () => {
  // Opciones de filtro iniciales - sin incluir location
  const initialFilterOptions = {
    date: 'This Week',
    dateRange: '01/08/2025 - 01/15/2025',
    types: ['Multifamily', 'Studio Housing'],
    bids: ['Without Bids']
    // No incluir location aquí para que el primer llamado no lo tenga
  };

  const [view, setView] = useState("list");
  const [membership, setMembership] = useState("max");
  const [selectedContract, setSelectedContract] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [tokenReady, setTokenReady] = useState(false);

  const {
    contracts,
    loading: isContractsLoading,
    error,
    filters: activeFilters,
    updateFilter,
    clearFilters,
    applyFilters,
  } = useContracts(initialFilterOptions);

  // Listener para mensajes de Wix
  useEffect(() => {
    // Si estamos usando token fijo, no necesitamos esperar mensajes de Wix
    if (USE_FIXED_TOKEN) {
      setAuthToken(); // Llamar sin parámetros establecerá el token fijo
      setTokenReady(true);
      setShowLoginModal(false); // Ocultar modal de login ya que tenemos token
    }
    const handleMessage = (event) => {
      // Verificar que el mensaje proviene de Wix
      if (event.data && event.data.token) {
        console.log("Mensaje recibido de Wix:", event.data);

        // Guardar el token para las llamadas API
        setAuthToken(event.data.token);
        setTokenReady(true);

        // Actualizar información del perfil
        if (event.data.userProfile) {
          setUserProfile(event.data.userProfile);

          // Establecer el tipo de membresía si está disponible
          if (event.data.userProfile.membershipType) {
            setMembership(event.data.userProfile.membershipType.toLowerCase());
          }
        }

        // Cerrar el modal de login ya que ahora tenemos la sesión
        setShowLoginModal(false);
      }
    };

    // Añadir el listener
    window.addEventListener("message", handleMessage);

    // Notificar a Wix que la app está lista para recibir datos
    window.parent.postMessage(
      {
        applicationId: "pinch-contracts-app", // Debe coincidir con lo validado en Wix
        ready: true,
      },
      "*"
    );

    // Timer de respaldo para ocultar el modal de login
    const timer = setTimeout(() => {
      setShowLoginModal(false);
    }, 2000);

    // Limpiar el listener y timer al desmontar
    return () => {
      window.removeEventListener("message", handleMessage);
      clearTimeout(timer);
    };
  }, []);

  const updateDateRange = (dateOption) => {
    const now = new Date();
    let startDate, endDate;

    const getStartOfWeek = (date) => {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      return start;
    };

    const getEndOfWeek = (startDate) => {
      const end = new Date(startDate);
      end.setDate(startDate.getDate() + 6);
      return end;
    };

    if (dateOption === "This Week") {
      startDate = getStartOfWeek(now);
      endDate = getEndOfWeek(startDate);
    } else if (dateOption === "Next Week") {
      const nextWeek = new Date(now);
      nextWeek.setDate(now.getDate() + 7);
      startDate = getStartOfWeek(nextWeek);
      endDate = getEndOfWeek(startDate);
    } else if (dateOption === "This Month") {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (dateOption === "Next Month") {
      startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    }

    const formatDate = (date) => {
      return `${String(date.getMonth() + 1).padStart(2, "0")}/${String(
        date.getDate()
      ).padStart(2, "0")}/${date.getFullYear()}`;
    };

    const dateRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;

    updateFilter("date", dateOption);
    updateFilter("dateRange", dateRange);
    updateFilter("startDate", startDate.toISOString().split("T")[0]);
    updateFilter("endDate", endDate.toISOString().split("T")[0]);
  };

  const handleTypeChange = (type, isChecked) => {
    const newTypes = isChecked
      ? [...activeFilters.types, type]
      : activeFilters.types.filter((t) => t !== type);

    updateFilter("types", newTypes);
  };

  const handleBidsChange = (bid, isChecked) => {
    const newBids = isChecked
      ? [...activeFilters.bids, bid]
      : activeFilters.bids.filter((b) => b !== bid);

    updateFilter("bids", newBids);
  };

// Manejador específico para location
const handleLocationChange = (coordinates, details) => {
  
  // Solo actualizar location cuando el usuario selecciona explícitamente una ubicación
  if (coordinates && details) {
    // Verify coordinates are in the correct format (lng,lat)
    if (typeof coordinates === 'string' && /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(coordinates)) {
      updateFilter("location", coordinates);
      updateFilter("displayLocation", details.displayName);
    } else {
      console.warn("Invalid coordinates format:", coordinates);
    }
  }
};

  const clearAllFilters = () => {
    clearFilters(initialFilterOptions);
  };

  const handleContractSelect = (contract) => {
    setSelectedContract(contract);
    setView("detail");
  };

  const handleApply = () => {
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async (formData) => {
    setIsLoading(true);

    try {
      const response = await applicationService.submitApplication(
        selectedContract.id,
        formData
      );

      setShowApplicationModal(false);
      setView("confirmation");
    } catch (error) {
      alert(
        "Hubo un error al enviar tu aplicación. Por favor, intenta de nuevo."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (view === "detail") {
      setView("list");
    } else if (view === "confirmation") {
      setView("list");
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  useEffect(() => {
    if (!activeFilters.dateRange) {
      updateDateRange(activeFilters.date || "This Week");
    }
  }, [activeFilters.dateRange]);

  return (
    <div className="min-h-screen bg-white">
      {(isLoading || isContractsLoading) && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900 mx-auto"></div>
            <p className="mt-4 text-lg">Cargando...</p>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <MembershipContent membership={membership}>
            </MembershipContent>

            <div className="bg-gray-700 text-white p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg uppercase">Filters</h2>
                <button className="text-sm underline" onClick={clearAllFilters}>
                  Clear All
                </button>
              </div>
              <div className="border-b border-gray-400 mb-6 mt-6"></div>

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
                  <div className="text-xs py-1 rounded flex justify-between items-center">
                    <svg
                      className="mr-2"
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.06375 0.541913H7.94191V0.329473C7.94191 0.147475 7.78892 0 7.60036 0C7.41169 0 7.25881 0.147475 7.25881 0.329473V0.541913H3.35707V0.329473C3.35707 0.147475 3.20407 0 3.01551 0C2.82684 0 2.67396 0.147475 2.67396 0.329473V0.541913H1.52308C1.11944 0.541913 0.732253 0.696448 0.446641 0.971657C0.161119 1.24686 0.000468361 1.62013 0 2.0096V8.53242C0.000457384 8.92179 0.161113 9.29506 0.446641 9.57026C0.732277 9.84546 1.11944 10 1.52308 10H9.0637C9.46733 10 9.85452 9.84547 10.1401 9.57026C10.4257 9.29505 10.5863 8.92179 10.5868 8.53242V2.0096C10.5863 1.62013 10.4257 1.24686 10.1401 0.971657C9.8545 0.696453 9.46733 0.541913 9.0637 0.541913H9.06375ZM0.683017 2.0096C0.683017 1.79507 0.771405 1.58935 0.928631 1.43769C1.08586 1.28602 1.2991 1.20076 1.5214 1.20076H2.67228V1.41496C2.67228 1.59685 2.82528 1.74432 3.01383 1.74432C3.20239 1.74432 3.35539 1.59685 3.35539 1.41496V1.20087L7.25888 1.20076V1.41496C7.25888 1.59685 7.41177 1.74432 7.60044 1.74432C7.78899 1.74432 7.94199 1.59685 7.94199 1.41496V1.20087H9.06383V1.20076C9.28646 1.20043 9.50017 1.28536 9.65774 1.43713C9.81531 1.5888 9.90393 1.79485 9.90393 2.00959V3.22523H0.683069L0.683017 2.0096ZM9.06375 9.34114H1.52314C1.30051 9.34158 1.0868 9.25654 0.929228 9.10487C0.77166 8.9531 0.68304 8.74716 0.68304 8.53242V3.88399H9.9039V8.53242C9.9039 8.74718 9.81528 8.9531 9.65771 9.10487C9.50014 9.25654 9.28642 9.34158 9.0638 9.34114H9.06375Z"
                        fill="white"
                      />
                    </svg>
                    {activeFilters.dateRange}
                  </div>
                </div>
                <select
                  className="w-full p-2 border text-gray-800"
                  value={activeFilters.date}
                  onChange={(e) => updateDateRange(e.target.value)}>
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
                        onChange={(e) =>
                          handleTypeChange(type, e.target.checked)
                        }
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
                        onChange={(e) =>
                          handleBidsChange(bid, e.target.checked)
                        }
                      />
                      <label htmlFor={bid}>{bid}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={applyFilters}
                  className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600">
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                Welcome to the Opportunities Board!
              </h2>
              <p className="mb-4 font-light text-base">
                New cleaning contracts and job opportunities are posted here and
                prioritized for
                <span className="font-semibold italic"> Quick Pay</span>{" "}
                members, followed by
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
                {contracts.length > 0
                  ? contracts.map((contract, index) => (
                      <ContractCard
                        key={index}
                        contract={contract}
                        onSelect={handleContractSelect}
                      />
                    ))
                  : !isContractsLoading && (
                      <p className="text-gray-500">
                        No contracts found matching your criteria.
                      </p>
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