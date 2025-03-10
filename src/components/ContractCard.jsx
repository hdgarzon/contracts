import React from "react";
import ViewsContracts from "../assets/img/ViewsContracts.svg";
import TurnOverIcon from "../assets/img/TurnOverIcon.svg";
import MoneyIcon from "../assets/img/MoneyIcon.svg";
import MultifamilyIcon from "../assets/img/MultifamilyIcon.svg";
import MapContract from "../assets/img/MapContract.svg";
import Calendar from "../assets/img/Calendar.svg";

export const ContractCard = ({ contract, onSelect }) => {
  // Validar datos y proporcionar valores predeterminados
  const safeContract = {
    id: contract.id || 'Unknown ID',
    name: contract.name || 'Turn Over',
    location: contract.location || 'Tampa, Florida',
    type: contract.type || 'multifamily',
    unitCount: contract.unitCount || 0,
    startDate: contract.startDate || 'Unknown Date',
    jobsPerMonth: contract.jobsPerMonth || 0,
    value: contract.value || '0',
    bidders: contract.bidders || 0,
    status: contract.status || 'published',
    winCleaner: contract.winCleaner || null
  };

  // Determinar si el contrato está asignado
  const isAssigned = safeContract.status === "assigned";

  return (
    <div 
      className={`border rounded p-4 mb-4 relative overflow-hidden ${isAssigned ? 'bg-[#BDBDBD]' : 'bg-white'}`}
    >
      {/* Cinta "Assigned" si el contrato tiene estatus "assigned" */}
      {isAssigned && (
        <div className="absolute top-0 right-0 transform translate-y-12 translate-x-12 rotate-45 bg-purple-500 text-white px-10 py-1 font-semibold text-sm z-10">
          Assigned
        </div>
      )}
      
      <div className="flex items-start mb-4 bg-blue-100 p-4">
        <div className="bg-company rounded mr-4">
          <div className="text-white">
            <div className="flex justify-center">
              <img
                src={TurnOverIcon}
                alt="Turn Over Icon"
                className="w-50 mx-auto block"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 ">
          <div className="flex justify-start items-center">
            <h3 className="text-lg font-semibold text-company">
              {safeContract.name}
            </h3>
            <span className="text-gray-500 px-4 text-sm">ID: {safeContract.id}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <img src={ViewsContracts} alt="Views Contracts" className="pr-2" />
            {isAssigned && safeContract.winCleaner ? (
              // Mostrar el nombre del limpiador asignado
              <div>
                <span className="font-bold text-gray-600 pr-1">Michael Smith</span>
              </div>
            ) : (
              // Mostrar el número de licitadores
              <div>
                <span className="font-bold text-gray-600 pr-1">
                  {safeContract.bidders}{" "}
                </span>
                <span className="text-gray-600 font-light">bidders right now</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Mostrar el botón solo si el contrato NO está asignado */}
        {!isAssigned && (
          <button
            onClick={() => onSelect(safeContract)}
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
            View Contract Details
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 text-base">
        <div className="flex items-center">
          <img src={MapContract} alt="Views Contracts" className="pr-2" />
          <span className="font-bold">{safeContract.location}</span>

          <img src={MultifamilyIcon} alt="Views Contracts" className="px-2" />
          <span className="font-light">Type: </span> <span className="font-bold px-2"> {safeContract.type}</span>

          <span className="ml-8">Unit count: </span> <span className="font-bold px-2"> {safeContract.unitCount}</span>
        </div>

        <div className="flex items-center">
          <img src={Calendar} alt="Views Contracts" className="pr-2" />
          <span className="font-light">Expected Start Date: </span> <span className="font-bold px-2"> {safeContract.startDate}</span>
        </div>

        <div className="flex items-center">
          <img src={Calendar} alt="Views Contracts" className="pr-2" />
          <span className="font-light">Estimated # Jobs per month:</span> <span className="font-bold px-2"> {safeContract.jobsPerMonth}</span>
        </div>

        <div className="flex items-center">
          <img src={MoneyIcon} alt="Views Contracts" className="pr-2" />
          <span className="font-light"> 
            Estimated Annual Contract Value:{" "}
            <span className="text-green-600 font-bold px-2">USD ${safeContract.value}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContractCard;