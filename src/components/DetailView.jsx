import React from "react";
import { ArrowLeft, Info } from "lucide-react";
import ContractsIcon from "../assets/img/contractsIcon.svg";
import ViewsContracts from "../assets/img/ViewsContracts.svg";
import TurnOverIcon from "../assets/img/TurnOverIcon.svg";
import MoneyIcon from "../assets/img/MoneyIcon.svg";
import MultifamilyIcon from "../assets/img/MultifamilyIcon.svg";
import MapContract from "../assets/img/MapContract.svg";
import Calendar from "../assets/img/Calendar.svg";

export const DetailView = ({ contract, onBack, onApply }) => {
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
    scopeOfWork: contract.scopeOfWork || 'No scope information available',
  };

  return (
    <div>
      <button onClick={onBack} className="flex items-center text-blue-500 mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </button>

      <div className="flex justify-center mb-6">
        <div className="flex items-center">
          <img src={ContractsIcon} alt="Turn Over Icon" className="w-10 mr-2" />
          <h2 className="text-xl font-semibold">Contract Opportunity</h2>
        </div>
      </div>

      <div className="border rounded p-4 mb-4 bg-white ">
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
              <span className="font-bold text-gray-600 pr-1">
                {safeContract.bidders}{" "}
              </span>{" "}
              <span className="text-gray-600 font-light">bidders right now</span>
            </div>
          </div>
          <button
            onClick={onApply}
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
            Apply
          </button>
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

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Scope of Work</h3>
        <ul className="list-disc pl-6 text-gray-600">
          <p>{safeContract.scopeOfWork}</p>
        </ul>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-1" />
          <p className="text-blue-700 text-sm">
            Please note that the annual contract amount only includes Turn Over
            services. If you win this contract, you'll have the opportunity to
            earn more with Common Areas. During your first visit to the property,
            you can set your price and coordinate all additional payment details
            with our PINCH team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailView;