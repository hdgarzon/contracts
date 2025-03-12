import React from "react";
import ViewsContracts from "../assets/img/ViewsContracts.svg";
import TurnOverIcon from "../assets/img/TurnOverIcon.svg";
import MoneyIcon from "../assets/img/MoneyIcon.svg";
import MultifamilyIcon from "../assets/img/MultifamilyIcon.svg";
import MapContract from "../assets/img/MapContract.svg";
import Calendar from "../assets/img/Calendar.svg";
import AssignedIcon from "../assets/img/AssignedIcon.svg";

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
    winCleaner: contract.winCleaner || null,
    // Add this line to include the scopeOfWork
    scopeOfWork: contract.scopeOfWork || 'No scope information available'
  };

  // Determinar si el contrato está asignado
  const isAssigned = safeContract.status === "assigned";

  return (
    <div 
      className={`border rounded p-4 mb-4 relative overflow-hidden ${isAssigned ? 'bg-[#f8f8f8]' : 'bg-white'}`}
    >
      {/* Cinta "Assigned" si el contrato tiene estatus "assigned" */}
      {isAssigned && (
        <div className="absolute top-[-25px] right-[10px] transform translate-y-12 translate-x-12 rotate-45 bg-[#DC6BBC] text-white px-10 py-1 font-semibold text-sm z-10">
          Assigned
        </div>
      )}
      
      <div className={`flex items-start mb-4  p-4 ${isAssigned ? 'bg-[#EBEDF0]' : 'bg-blue-100'}`}>
        <div className="bg-company rounded mr-4">
          <div className="text-white">
            <div className="flex justify-center">
              <img
                src={isAssigned ? AssignedIcon : TurnOverIcon}
                alt="Contract Icon"
                className="w-50 mx-auto block"
              />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-start items-center">
            <h3 className={`text-lg font-semibold ${isAssigned ? 'text-gray-500' : 'text-company'}`}>
              {safeContract.name}
            </h3>
            <span className="text-gray-500 px-4 text-sm">ID: {safeContract.id}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <img src={ViewsContracts} alt="Views Contracts" className="pr-2" />
            {isAssigned && safeContract.winCleaner ? (
              <div>
                <span className="font-bold text-gray-500 pr-1">Michael Smith</span>
              </div>
            ) : (
              <div>
                <span className="font-bold text-gray-600 pr-1">
                  {safeContract.bidders}{" "}
                </span>
                <span className="text-gray-600 font-light">bidders right now</span>
              </div>
            )}
          </div>
        </div>
        
        {!isAssigned && (
          <button
            onClick={() => onSelect(safeContract)}
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
            View Contract Details
          </button>
        )}
      </div>

      <div className={`grid grid-cols-1 gap-4 text-base ${isAssigned ? 'opacity-1' : 'opacity-0.1'}`}>
        <div className="flex items-center">
          <img src={MapContract} alt="Views Contracts" className="pr-2" />
          <span className={`font-bold ${isAssigned ? 'text-gray-500' : ''}`}>{safeContract.location}</span>

          <img src={MultifamilyIcon} alt="Views Contracts" className="px-2" />
          <span className={`font-light ${isAssigned ? 'text-gray-500' : ''}`}>Type: </span> 
          <span className={`font-bold px-2 ${isAssigned ? 'text-gray-500' : ''}`}>{safeContract.type}</span>

          <span className={`ml-8 ${isAssigned ? 'text-gray-500' : ''}`}>Unit count: </span> 
          <span className={`font-bold px-2 ${isAssigned ? 'text-gray-500' : ''}`}>{safeContract.unitCount}</span>
        </div>

        <div className="flex items-center">
          <img src={Calendar} alt="Views Contracts" className="pr-2" />
          <span className={`font-light ${isAssigned ? 'text-gray-500' : ''}`}>Expected Start Date: </span> 
          <span className={`font-bold px-2 ${isAssigned ? 'text-gray-500' : ''}`}>{safeContract.startDate}</span>
        </div>

        <div className="flex items-center">
          <img src={Calendar} alt="Views Contracts" className="pr-2" />
          <span className={`font-light ${isAssigned ? 'text-gray-500' : ''}`}>Estimated # Jobs per month:</span> 
          <span className={`font-bold px-2 ${isAssigned ? 'text-gray-500' : ''}`}>{safeContract.jobsPerMonth}</span>
        </div>

        <div className="flex items-center">
          <img src={MoneyIcon} alt="Views Contracts" className="pr-2" />
          <span className={`font-light ${isAssigned ? 'text-gray-500' : ''}`}> 
            Estimated Annual Contract Value:{" "}
            <span className={`font-bold px-2 ${isAssigned ? 'text-gray-500' : 'text-green-600'}`}>USD ${safeContract.value}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContractCard;