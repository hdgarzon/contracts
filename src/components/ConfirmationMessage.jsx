import React from 'react';
import { Check } from 'lucide-react';

export const ConfirmationMessage = ({ onBackToBoard }) => (
  <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-40">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
      <div className="flex justify-center mb-4">
        <div className="bg-indigo-600 rounded-full p-4">
          <Check className="h-8 w-8 text-white" />
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-4">Congratulations! You are now a bidder for this contract.</h2>
      <p className="text-gray-600 mb-6">Our PINCH Operations team will be reviewing your bid and will reach out to you soon!</p>
      
      <button 
        onClick={onBackToBoard}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Back to PINCH Board
      </button>
    </div>
  </div>
);