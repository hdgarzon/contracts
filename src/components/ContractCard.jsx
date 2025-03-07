import React from "react";
import ViewsContracts from "../assets/img/ViewsContracts.svg";
import TurnOverIcon from "../assets/img/TurnOverIcon.svg";
import MoneyIcon from "../assets/img/MoneyIcon.svg";
import MultifamilyIcon from "../assets/img/MultifamilyIcon.svg";
import MapContract from "../assets/img/MapContract.svg";
import Calendar from "../assets/img/Calendar.svg";

export const ContractCard = ({ contract, onSelect }) => (
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
            {contract.name}
          </h3>
          <span className="text-gray-500 px-4 text-sm">ID: {contract.id}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <img src={ViewsContracts} alt="Views Contracts" className="pr-2" />
          <span className="font-bold text-gray-600 pr-1">
            {contract.bidders}{" "}
          </span>{" "}
          <span className="text-gray-600 font-light">bidders right now</span>
        </div>
      </div>
      <button
        onClick={() => onSelect(contract)}
        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
        View Contract Details
      </button>
    </div>

    <div className="grid grid-cols-1 gap-4 text-base">
      <div className="flex items-center">
        <img src={MapContract} alt="Views Contracts" className="pr-2" />
        <span className="font-bold">{contract.location}</span>

        <img src={MultifamilyIcon} alt="Views Contracts" className="px-2" />
        <span className="font-light">Type: </span> <span className="font-bold px-2"> {contract.type}</span>

        <span className="ml-8">Unit count: </span> <span className="font-bold px-2"> {contract.unitCount}</span>
      </div>

      <div className="flex items-center">
        <img src={Calendar} alt="Views Contracts" className="pr-2" />
        <span className="font-light">Expected Start Date: </span> <span className="font-bold px-2"> {contract.startDate}</span>
      </div>

      <div className="flex items-center">
        <img src={Calendar} alt="Views Contracts" className="pr-2" />
        <span className="font-light">Estimated # Jobs per month:</span> <span className="font-bold px-2"> {contract.jobsPerMonth}</span>
      </div>

      <div className="flex items-center">
        <img src={MoneyIcon} alt="Views Contracts" className="pr-2" />
        <span className="font-light"> 
          Estimated Annual Contract Value:{" "}
          <span className="text-green-600 font-bold px-2">USD ${contract.value}</span>
        </span>
      </div>
    </div>
  </div>
);
