import React from 'react';
import { ArrowLeft, Info } from 'lucide-react';

export const DetailView = ({ contract, onBack, onApply }) => (
  <div>
    <button 
      onClick={onBack}
      className="flex items-center text-blue-500 mb-6"
    >
      <ArrowLeft className="h-4 w-4 mr-1" /> Back
    </button>
    
    <div className="flex justify-center mb-6">
      <div className="flex items-center">
        <img src="/api/placeholder/30/30" alt="Contract" className="mr-2" />
        <h2 className="text-xl font-semibold">Contract Opportunity</h2>
      </div>
    </div>
    
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <div className="flex items-start mb-4">
        <div className="bg-indigo-900 p-3 rounded mr-4">
          <div className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 22v-8.5L12 2l9 11.5V22"/>
              <path d="M5 22v-4h14v4"/>
            </svg>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Turn Over / Common Area</h3>
            <button 
              onClick={onApply}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0"/>
              <circle cx="12" cy="8" r="2"/>
            </svg>
            <span>5 bidders right now</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0"/>
            <circle cx="12" cy="8" r="2"/>
          </svg>
          <span>Tampa, Florida</span>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <path d="M8 12h8"/>
            <path d="M12 8v8"/>
          </svg>
          <span>Type: Studio Housing</span>
          
          <span className="ml-2">Unit count: 10</span>
        </div>
        
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <path d="M3 9h18"/>
            <path d="M9 21V9"/>
          </svg>
          <span>Expected Start Date: Thur, 02/26/2025</span>
        </div>
        
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <path d="M8 12h8"/>
            <path d="M12 8v8"/>
          </svg>
          <span>Estimated # Jobs per month: 4</span>
        </div>
        
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 17v.01"/>
            <path d="M12 13.5a1.5 1.5 0 0 1 1-1.5 2.6 2.6 0 1 0-3-4"/>
          </svg>
          <span>Estimated Annual Contract Value: <span className="text-green-600">USD $1405.00</span></span>
        </div>
      </div>
    </div>
    
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Scope of Work</h3>
      <ul className="list-disc pl-6 text-gray-600">
        <li>is simply dummy text of the printing</li>
        <li>is simply dummy text of the printing</li>
        <li>is simply dummy text of the printing</li>
        <li>is simply dummy text of the printing</li>
        <li>is simply dummy text of the printing</li>
      </ul>
    </div>
    
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
      <div className="flex">
        <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-1" />
        <p className="text-blue-700 text-sm">
          Please note that the annual contract amount only includes Turn Over services. If you win this contract, you'll have the opportunity to earn more with Common Areas. During your first visit to the property, you can set your price and coordinate all additional payment details with our PINCH team.
        </p>
      </div>
    </div>
  </div>
);