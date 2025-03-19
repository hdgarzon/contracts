import React from 'react';
// import LoginImg from "../assets/img/LoginIconPinch.svg";

export const LoginModal = () => (
  <div 
    className="fixed inset-0 flex items-center justify-center z-50"
    style={{
      backgroundImage: "url('https://static.wixstatic.com/media/e16f16_3e21b9e78fde4eeaa1f865b0eba72cd3~mv2.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <div className="bg-white p-6 w-full max-w-md">
      <div className="flex justify-center mb-4">
        <div className="rounded-full p-3">
        </div>
      </div>
      
      <h2 className="text-xl text-company font-semibold text-center mb-2">Hey PINCH Pro!</h2>
      <p className="text-center font-light text-gray-600 mb-4">
        You need a Max, Elite or QuickPay membership to access the Opportunities Dashboard.
      </p>
      
      <a 
        href="https://dev6345.wixstudio.com/pro-uat/account/upgrade-profile"
        className="block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-center"
      >
        UPDATE MEMBERSHIP
      </a>
    </div>
  </div>
);