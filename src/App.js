import React, { useState, useEffect } from "react";
import { ContractCard } from "./components/ContractCard";
import { DetailView } from "./components/DetailView";
import { LoginModal } from "./components/LoginModal";
import { ApplicationModal } from "./components/ApplicationModal";
import { ConfirmationMessage } from "./components/ConfirmationMessage";
import { contracts, filterOptions } from "./data/mockData";
import MaxMemberImg from "./assets/img/MaxMember.svg";
import EliteMemberImg from "./assets/img/EliteMember.svg";
import CalendarImg from "./assets/img/Calendar.svg";

const CleaningApp = () => {
  const [view, setView] = useState("list"); // list, detail, confirmation
  const [membership, setMembership] = useState("elite"); // max, elite, quickpay
  const [selectedContract, setSelectedContract] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState(filterOptions);
  const [filteredContracts, setFilteredContracts] = useState(contracts);

  // Este hook podría utilizarse para conectar con Wix cuando se implemente en Wix
  useEffect(() => {
    // Aquí se puede añadir código para conectarse con Wix cuando se implemente
    // Por ahora, simplemente cerramos el modal de login tras un breve retardo para simular
    const timer = setTimeout(() => {
      setShowLoginModal(false);
    }, 2000);

    // Inicializar los contratos filtrados con todos los contratos
    setFilteredContracts(contracts);

    return () => clearTimeout(timer);
  }, []);

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
    // Aquí se podría conectar con Wix cuando se implemente
    console.log("Datos del formulario enviados:", formData);

    // Simular proceso de envío
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowApplicationModal(false);
      setView("confirmation");
    }, 1000);
  };

  // Handle back button click
  const handleBack = () => {
    if (view === "detail") {
      setView("list");
    } else if (view === "confirmation") {
      setView("detail");
    }
  };

  // Close login modal
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

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
                <button className="text-sm underline">Clear All</button>
              </div>
              <div className="border-b border-gray-400 mb-6 mt-6"></div>
              <div className="mb-6">
                <h3 className="mb-2 py-4 font-semibold">Location</h3>
                <p className="text-sm mb-2">Search by city or postal code</p>
                <input
                  type="text"
                  className="w-full p-2 border text-gray-800"
                  value={filterOptions.location}
                  readOnly
                />
              </div>
              <div className="border-b border-gray-400 mb-6 mt-6"></div>
              <div className="mb-6">
                <h3 className="mb-2 py-4 font-semibold">Expected Start Date</h3>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Select option</span>
                  <div className="text-xs py-1 rounded flex justify-between">
                    <img
                      src={CalendarImg}
                      alt="Calendar"
                      className="w-50 px-2"
                    />
                    {filterOptions.dateRange}
                  </div>
                </div>
                <select className="w-full p-2 border text-gray-800">
                  <option>This Week</option>
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
                        defaultChecked
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
                        defaultChecked
                      />
                      <label htmlFor={bid}>{bid}</label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Apply Filters Button */}
              <div className="mt-8">
                <button 
                  onClick={() => {
                    console.log("Filtros aplicados:");
                  }}
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

            {view === "list" && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-company py-4">
                  Contracts for you
                </h2>
                {contracts.map((contract, index) => (
                  <ContractCard
                    key={index}
                    contract={contract}
                    onSelect={handleContractSelect}
                  />
                ))}
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
