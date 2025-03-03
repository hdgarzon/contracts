import React from 'react';

export const ContractCard = ({ contract, onSelect }) => (
  <div className="border rounded p-4 mb-4 bg-white">
    <div className="flex items-start mb-4 bg-blue-100 p-4">
      <div className="bg-company rounded mr-4">
        <div className="text-white">
          <div className="flex justify-center">
          <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="49" height="49" rx="2" fill="#241D5D"/>
            <path d="M33.5236 39H14.4762C14.3293 39 14.1907 38.9311 14.1005 38.8135C14.0102 38.6959 13.9786 38.5423 14.0145 38.3976L16.8014 27.1986C16.855 26.9838 17.045 26.8333 17.263 26.8333H30.7369C30.955 26.8333 31.145 26.9838 31.1986 27.1986L33.9855 38.3976C34.0214 38.5423 33.9898 38.6957 33.8995 38.8135C33.8091 38.9311 33.6705 39 33.5236 39ZM15.0878 38.0323H32.9119L30.366 27.8011H17.6338L15.0878 38.0323Z" fill="white"/>
            <path d="M24.0061 39C23.7432 39 23.5299 38.7832 23.5299 38.5161V31.1117C23.5299 30.8446 23.7432 30.6278 24.0061 30.6278C24.2689 30.6278 24.4823 30.8446 24.4823 31.1117V38.5161C24.4823 38.7832 24.2692 39 24.0061 39Z" fill="white"/>
            <path d="M20.6611 39C20.4321 39 20.2299 38.8316 20.1918 38.5943L18.9975 31.1899C18.9549 30.9262 19.1309 30.6775 19.3904 30.6341C19.6492 30.5899 19.8947 30.7696 19.9373 31.0333L21.1316 38.4378C21.1742 38.7015 20.9982 38.9502 20.7387 38.9935C20.7125 38.9981 20.6866 39 20.6611 39Z" fill="white"/>
            <path d="M27.3905 39C27.3567 39 27.3227 38.9963 27.2884 38.9888C27.0313 38.9317 26.8686 38.6738 26.9248 38.4128L28.5172 31.0084C28.5734 30.7473 28.8279 30.5825 29.0841 30.6389C29.3412 30.696 29.5038 30.9539 29.4477 31.215L27.8553 38.6194C27.8065 38.8456 27.6093 39 27.3905 39Z" fill="white"/>
            <path d="M30.7179 27.8011H17.2631C17.0002 27.8011 16.7869 27.5843 16.7869 27.3172C16.7866 25.5353 17.594 24.0211 19.1216 22.9382C20.4002 22.0316 22.1059 21.5117 23.8011 21.5117C27.3072 21.5117 31.0898 23.5174 31.1941 27.2342L31.1943 27.317C31.1941 27.5843 30.9808 27.8011 30.7179 27.8011ZM17.7642 26.8333H30.2098C29.8301 23.8379 26.3068 22.4795 23.8008 22.4795C22.2959 22.4795 20.789 22.936 19.6664 23.7317C18.8671 24.2983 17.9285 25.2818 17.7642 26.8333Z" fill="white"/>
            <path d="M25.5922 22.6701C25.5601 22.6701 25.528 22.6667 25.4961 22.6602C24.4792 22.447 23.4956 22.4194 22.4885 22.596C22.3501 22.62 22.2082 22.5813 22.1009 22.4894C21.9932 22.3974 21.9313 22.2619 21.9313 22.1192V11.0881C21.9313 9.93677 22.8592 9 23.9999 9C25.1406 9 26.0684 9.93677 26.0684 11.0881V22.1862C26.0684 22.3316 26.0039 22.4693 25.893 22.5612C25.8072 22.6323 25.7008 22.6701 25.5922 22.6701ZM23.8008 21.5117C24.2327 21.5117 24.6732 21.5446 25.1161 21.6099V11.0881C25.1161 10.4705 24.6154 9.96774 23.9999 9.96774C23.3844 9.96774 22.8837 10.4705 22.8837 11.0881V21.5627C23.1918 21.5289 23.4987 21.5117 23.8008 21.5117Z" fill="white"/>
            </svg>

          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">{contract.name}</h3>
          <span className="text-gray-500">ID: {contract.id}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0"/>
            <circle cx="12" cy="8" r="2"/>
          </svg>
          <span>{contract.bidders} bidders right now</span>
        </div>
      </div>
      <button 
        onClick={() => onSelect(contract)} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        View Contract Details
      </button>
    </div>
    
    <div className="grid grid-cols-1 gap-4 text-sm">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0"/>
          <circle cx="12" cy="8" r="2"/>
        </svg>
        <span>{contract.location}</span>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-2">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <path d="M8 12h8"/>
          <path d="M12 8v8"/>
        </svg>
        <span>Type: {contract.type}</span>
        
        <span className="ml-2">Unit count: {contract.unitCount}</span>
      </div>
      
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <path d="M3 9h18"/>
          <path d="M9 21V9"/>
        </svg>
        <span>Expected Start Date: {contract.startDate}</span>
      </div>
      
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
          <path d="M8 12h8"/>
          <path d="M12 8v8"/>
        </svg>
        <span>Estimated # Jobs per month: {contract.jobsPerMonth}</span>
      </div>
      
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 17v.01"/>
          <path d="M12 13.5a1.5 1.5 0 0 1 1-1.5 2.6 2.6 0 1 0-3-4"/>
        </svg>
        <span>Estimated Annual Contract Value: <span className="text-green-600">USD ${contract.value}</span></span>
      </div>
    </div>
  </div>
);