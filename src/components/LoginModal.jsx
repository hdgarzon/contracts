import React from 'react';
// import LoginImg from "../assets/img/LoginIconPinch.svg";

export const LoginModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-20 flex items-center justify-center z-50">
    <div className="bg-white p-6 w-full max-w-md">
      <div className="flex justify-center mb-4">
        <div className="rounded-full p-3">
        </div>
      </div>
      
      <h2 className="text-xl text-company font-semibold text-center mb-2">Hey PINCH Pro!</h2>
      <p className="text-center font-light text-gray-600 mb-4">
        You need a Max, Elite or QuickPay membership to access the Opportunities Dashboard.
      </p>
      
      <button 
        onClick={onClose}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        UPDATE MEMBERSHIP
      </button>
    </div>
  </div>
);