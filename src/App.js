import React, { useState, useEffect } from "react";
import { ContractCard } from "./components/ContractCard";
import { DetailView } from "./components/DetailView";
import { LoginModal } from "./components/LoginModal";
import { ApplicationModal } from "./components/ApplicationModal";
import { ConfirmationMessage } from "./components/ConfirmationMessage";
import { filterOptions } from "./data/mockData";
import SimplePlacesAutocomplete from './components/SimplePlacesAutocomplete';
import { useContracts } from "./hooks/useContracts";
import { applicationService } from './services/api';

// SVG icons as data URLs
const MaxMemberImg = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Crect width='100' height='60' fill='%23241D5D'/%3E%3Ctext x='50' y='35' font-family='Arial' font-size='20' fill='white' text-anchor='middle'%3EMAX%3C/text%3E%3C/svg%3E";
const EliteMemberImg = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Crect width='100' height='60' fill='%23241D5D'/%3E%3Ctext x='50' y='35' font-family='Arial' font-size='18' fill='white' text-anchor='middle'%3EELITE%3C/text%3E%3C/svg%3E";
const CalendarImg = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='2' y='4' width='20' height='18' rx='2' fill='none' stroke='%23000' strokeWidth='2'/%3E%3Cline x1='2' y1='10' x2='22' y2='10' stroke='%23000' strokeWidth='2'/%3E%3Cline x1='7' y1='2' x2='7' y2='6' stroke='%23000' strokeWidth='2'/%3E%3Cline x1='17' y1='2' x2='17' y2='6' stroke='%23000' strokeWidth='2'/%3E%3C/svg%3E";

const CleaningApp = () => {
  const [view, setView] = useState("list");
  const [membership, setMembership] = useState("max");
  const [selectedContract, setSelectedContract] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    contracts, 
    loading: isContractsLoading, 
    error, 
    filters: activeFilters, 
    updateFilter, 
    clearFilters, 
    applyFilters 
  } = useContracts(filterOptions);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoginModal(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const updateDateRange = (dateOption) => {
    const now = new Date();
    let startDate, endDate;
    
    const getStartOfWeek = (date) => {
      const start = new Date(date);
      start.setDate(date.getDate() - date.getDay());
      return start;
    };
    
    const getEndOfWeek = (startDate) => {
      const end = new Date(startDate);
      end.setDate(startDate.getDate() + 6);
      return end;
    };
    
    if (dateOption === 'This Week') {
      startDate = getStartOfWeek(now);
      endDate = getEndOfWeek(startDate);
    } 
    else if (dateOption === 'Next Week') {
      const nextWeek = new Date(now);
      nextWeek.setDate(now.getDate() + 7);
      startDate = getStartOfWeek(nextWeek);
      endDate = getEndOfWeek(startDate);
    } 
    else if (dateOption === 'This Month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } 
    else if (dateOption === 'Next Month') {
      startDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    }
    
    const formatDate = (date) => {
      return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
    };
    
    const dateRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;
    
    updateFilter('date', dateOption);
    updateFilter('dateRange', dateRange);
    updateFilter('startDate', startDate.toISOString().split('T')[0]);
    updateFilter('endDate', endDate.toISOString().split('T')[0]);
  };

  const handleTypeChange = (type, isChecked) => {
    const newTypes = isChecked 
      ? [...activeFilters.types, type] 
      : activeFilters.types.filter(t => t !== type);
    
    updateFilter('types', newTypes);
  };

  const handleBidsChange = (bid, isChecked) => {
    const newBids = isChecked 
      ? [...activeFilters.bids, bid] 
      : activeFilters.bids.filter(b => b !== bid);
    
    updateFilter('bids', newBids);
  };

  const handleLocationChange = (coordinates, details) => {
    updateFilter('location', coordinates);
    updateFilter('displayLocation', details.displayName);
  };

  const clearAllFilters = () => {
    clearFilters(filterOptions);
  };

  const handleContractSelect = (contract) => {
    setSelectedContract(contract);
    setView("detail");
  };

  const handleApply = () => {
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async (formData) => {
    setIsLoading(true);
    
    try {
      const response = await applicationService.submitApplication(
        selectedContract.id, 
        formData
      );
      
      setShowApplicationModal(false);
      setView("confirmation");
    } catch (error) {
      alert("Hubo un error al enviar tu aplicación. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (view === "detail") {
      setView("list");
    } else if (view === "confirmation") {
      setView("list");
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  useEffect(() => {
    if (!activeFilters.dateRange) {
      updateDateRange(activeFilters.date || 'This Week');
    }
  }, [activeFilters.dateRange]);

  return (
    <div className="min-h-screen bg-white">
      {(isLoading || isContractsLoading) && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900 mx-auto"></div>
            <p className="mt-4 text-lg">Cargando...</p>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <div className="bg-gray-500 p-10 mb-6">
              {membership === "max" ? (
                <svg className="mx-auto block" width="133" height="40" viewBox="0 0 133 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.9264 16.6743L63.2391 16.0919C64.0377 15.0601 65.1856 14.4278 66.4334 14.3612L66.9326 14.3279L69.1786 8.91957L71.3249 14.1116C71.9072 14.1449 72.4728 14.3113 72.9886 14.5942L76.965 16.7908C77.1646 16.8906 77.3809 16.9073 77.5806 16.8407L80.7084 15.6592L73.7207 0.0332642H64.7697L57.5823 16.1418L59.3625 16.6743C59.8783 16.8241 60.4107 16.8407 60.9264 16.7076V16.6743Z" fill="#241D5D"/>
                  <path d="M82.8047 30.6529C82.9378 31.7345 82.5219 32.7996 81.6567 33.4486C81.2242 33.7814 80.6918 33.9811 80.1428 34.0144C80.0928 34.264 79.993 34.5136 79.8932 34.7299L81.7399 39.2064H91.2566L86.1322 27.7573L82.7881 30.6529H82.8047Z" fill="#241D5D"/>
                  <path d="M56.4009 34.8131C55.2862 33.9478 55.0034 32.3169 55.7354 31.0855L56.0848 30.5197L52.2749 28.0568L47.3169 39.1897H56.6172L58.0813 35.6784C57.6488 35.6119 57.2328 35.4288 56.8668 35.1459L56.4176 34.7964L56.4009 34.8131Z" fill="#241D5D"/>
                  <path d="M36.6191 0L22.1944 24.3458L7.50352 0H0V39.2063H8.51838V16.1751L19.9982 35.0627H24.0911L35.6208 15.6759L35.6708 39.2063H44.1891L44.0727 0H36.6191Z" fill="#241D5D"/>
                  <path d="M133 39.2063L118.376 18.9208L132.052 0H122.186L113.368 12.6805L104.384 0H94.085L107.828 19.237L93.3529 39.2063H103.768L113.085 25.5773L122.535 39.2063H133Z" fill="#241D5D"/>
                  <path d="M59.9946 30.5363L59.5454 30.1869C59.3291 30.0205 59.0962 29.9373 58.83 29.9373C58.7468 29.9373 58.6803 29.9373 58.5971 29.9539C58.3309 30.0038 58.098 30.1536 57.9316 30.3533C57.9316 30.3533 57.9149 30.3866 57.8983 30.4032C57.865 30.4365 57.8317 30.4864 57.8151 30.5363L57.0165 31.8843C56.6671 32.45 56.8002 33.2155 57.316 33.6149L57.7652 33.9644C58.0314 34.1807 58.3641 34.2639 58.6969 34.1974C59.0296 34.1308 59.3125 33.9311 59.4955 33.6149L59.7117 33.2655L60.3107 32.267C60.6435 31.7012 60.4937 30.9524 59.9946 30.553V30.5363Z" fill="#241D5D"/>
                  <path d="M63.3888 31.7012L63.0561 31.435C62.8398 31.2686 62.6069 31.1854 62.3407 31.1854C62.2575 31.1854 62.1909 31.1854 62.1077 31.202C61.775 31.2686 61.4922 31.4683 61.3092 31.7678L60.8266 32.5832L60.2277 33.5817C59.895 34.1475 60.0281 34.9129 60.5272 35.3123L60.8766 35.5786C61.1428 35.7949 61.4755 35.8781 61.8083 35.8116C62.141 35.745 62.4239 35.5453 62.6069 35.2291L62.8731 34.7798L63.6883 33.4153C64.021 32.8495 63.8879 32.084 63.3722 31.6846L63.3888 31.7012Z" fill="#241D5D"/>
                  <path d="M66.8827 34.4636C66.8827 34.0642 66.7163 33.6648 66.3836 33.4152L66.1008 33.1822C65.8845 33.0158 65.6515 32.9326 65.3853 32.9326C65.3021 32.9326 65.2356 32.9326 65.1524 32.9493C64.8197 33.0158 64.5368 33.2155 64.3538 33.5151L64.2041 33.7647L63.3888 35.1292C63.0395 35.695 63.1725 36.4605 63.6883 36.8599L63.9712 37.0929C64.2374 37.3092 64.5701 37.3924 64.9029 37.3258C65.2356 37.2593 65.5184 37.0596 65.7014 36.7601L66.134 36.0279L66.2172 35.8947L66.6664 35.1459C66.7995 34.9295 66.8494 34.6966 66.8494 34.447L66.8827 34.4636Z" fill="#241D5D"/>
                  <path d="M69.0787 34.9295C68.8625 34.7631 68.6295 34.6799 68.3633 34.6799C68.2802 34.6799 68.2136 34.6799 68.1304 34.6966C67.7977 34.7631 67.5148 34.9628 67.3318 35.279L66.6663 36.394C66.317 36.9598 66.45 37.7252 66.9658 38.1246C67.232 38.341 67.5647 38.4242 67.8975 38.3576C68.2302 38.291 68.5131 38.0913 68.6961 37.7918L69.3616 36.6769C69.4781 36.4772 69.5446 36.2442 69.5446 36.0112C69.5446 35.6118 69.3782 35.2124 69.0455 34.9628L69.0787 34.9295Z" fill="#241D5D"/>
                  <path d="M76.2162 18.1055L72.2399 15.9089C71.8406 15.6926 71.3913 15.5761 70.9255 15.6094L66.4833 15.8756C65.4018 15.9422 64.4203 16.6411 63.971 17.6895L62.091 21.9496C61.8248 22.5653 62.0244 23.2809 62.5734 23.6304C63.0726 23.9465 63.7215 23.8467 64.1208 23.3807L66.7328 20.2189C67.0489 19.8362 67.4982 19.6199 67.964 19.6199C68.0971 19.6199 68.2469 19.6365 68.38 19.6698L71.6742 20.5684C71.9237 20.635 72.1567 20.7348 72.3896 20.8679L77.7801 24.1462C78.5288 24.6122 79.161 25.2612 79.5936 26.0766L81.5236 29.6877L85.4666 26.2763L81.3572 17.0738L78.0962 18.222C77.4807 18.455 76.7819 18.4051 76.1995 18.0889L76.2162 18.1055Z" fill="#241D5D"/>
                  <path d="M80.7085 32.2171C81.3075 31.7678 81.4739 30.9191 81.1245 30.2534L79.078 26.4093C78.6954 25.7104 78.1464 25.128 77.4809 24.712L72.0903 21.4337C71.9239 21.3338 71.7243 21.2506 71.5413 21.2007L68.247 20.3021C67.8644 20.2022 67.4817 20.3354 67.2155 20.6349L64.6034 23.7967C64.0211 24.4956 63.0395 24.662 62.2908 24.1795C61.4756 23.6636 61.1761 22.5819 61.5754 21.6667L63.3556 17.6229L61.2926 18.1388C60.5106 18.3384 59.6954 18.3218 58.9301 18.0888L57.0833 17.5397L52.9073 26.659L57.6656 29.7376C57.9152 29.5212 58.198 29.3714 58.5141 29.3049C59.0133 29.205 59.529 29.3382 59.9283 29.6544L60.3775 30.0038C60.7269 30.2867 60.9765 30.6695 61.0597 31.1021C61.3092 30.8359 61.642 30.6362 62.008 30.5696C62.5071 30.4698 63.0229 30.6029 63.4222 30.9191L63.7549 31.1853C64.1875 31.5181 64.4371 32.0174 64.487 32.5499C64.6534 32.45 64.853 32.3668 65.036 32.3336C65.5351 32.2337 66.0509 32.3668 66.4502 32.683L66.733 32.916C67.1656 33.2488 67.4152 33.7647 67.4651 34.2972C67.6314 34.1973 67.8145 34.1308 68.0141 34.0809C68.5133 33.981 69.029 34.1141 69.4283 34.4303C70.1437 34.9795 70.36 35.9946 70.0106 36.8266C70.2435 37.1262 70.5763 37.3092 70.9589 37.3092C71.2085 37.3092 71.4581 37.226 71.6577 37.0763C72.1735 36.6935 72.3232 35.9613 72.0071 35.3789L70.0439 31.7012C69.9607 31.5514 70.0106 31.3351 70.1604 31.2519C70.3101 31.1687 70.4931 31.2186 70.5763 31.3684L72.5395 35.046L72.9056 35.745C73.1052 36.1111 73.4213 36.3773 73.8206 36.4605C74.2033 36.5604 74.6026 36.4605 74.9353 36.2276C75.5176 35.7783 75.7007 34.9462 75.3513 34.2806L72.839 29.5878C72.7558 29.438 72.8057 29.2217 72.9555 29.1385C73.1052 29.0553 73.2882 29.1052 73.3714 29.255L75.867 33.9311L76.0001 34.1807C76.1998 34.5468 76.5159 34.8131 76.9152 34.8963C77.2979 34.9961 77.6971 34.8963 78.0299 34.6633C78.6288 34.214 78.7952 33.3653 78.4458 32.6997L78.1297 32.1172L75.6507 27.4744C75.5675 27.3246 75.6175 27.1083 75.7672 27.0251C75.9169 26.9419 76.1 26.9918 76.1831 27.1416L78.6621 31.7844C78.9117 32.2504 79.3775 32.5332 79.8767 32.5332C80.1595 32.5332 80.4423 32.4334 80.6919 32.2504L80.7085 32.2171Z" fill="#241D5D"/>
                </svg>
                         
              ) : (
                <svg className="mx-auto block" width="129" height="55" viewBox="0 0 129 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M52.582 3.96338H20.0058L18.5598 5.56919H53.9939L52.582 3.96338Z" fill="#241D5D"/>
                <path d="M40.8883 43.9948H31.6084L36.2541 48.7211L40.8883 43.9948Z" fill="#241D5D"/>
                <path d="M54.5404 0H18.1042L0 17.9031L36.1743 54.7912L50.9424 39.7011H48.5968L36.1743 52.3996L2.36837 17.9145L18.7874 1.67415H53.8459L59.4934 7.41407H61.839L54.5404 0Z" fill="#241D5D"/>
                <path d="M29.7524 25.7613H42.118V20.978H29.7524V15.1926H43.7576V10.2385H23.6266V36.8767H44.2472V31.934H29.7524V25.7613Z" fill="#241D5D"/>
                <path d="M55.3146 10.2385H49.1546V36.8767H68.6707V31.8543H55.3146V10.2385Z" fill="#241D5D"/>
                <path d="M78.2921 10.2385H72.1321V36.8767H78.2921V10.2385Z" fill="#241D5D"/>
                <path d="M81.6056 15.2609H90.1225V36.8767H96.2825V15.2609H104.811V10.2385H81.6056V15.2609Z" fill="#241D5D"/>
                <path d="M114.239 31.934V25.7613H126.604V20.978H114.239V15.1926H128.244V10.2385H108.113V36.8767H128.733V31.934H114.239Z" fill="#241D5D"/>
                </svg>
              )}
            </div>

            <div className="bg-gray-700 text-white p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg uppercase">Filters</h2>
                <button 
                  className="text-sm underline"
                  onClick={clearAllFilters}
                >
                  Clear All
                </button>
              </div>
              <div className="border-b border-gray-400 mb-6 mt-6"></div>
              
              <div className="mb-6">
                <h3 className="mb-2 py-4 font-semibold">Location</h3>
                <p className="text-sm mb-2">Search by city or postal code</p>
                <SimplePlacesAutocomplete 
                  value={activeFilters.location || ""}
                  onChange={handleLocationChange}
                  placeholder="Enter a city name (e.g. Tampa, FL)"
                />
                {activeFilters.displayLocation && (
                  <p className="text-xs mt-1 text-gray-300">
                    Selected: {activeFilters.displayLocation}
                  </p>
                )}
              </div>
              
              <div className="border-b border-gray-400 mb-6 mt-6"></div>
              <div className="mb-6">
                <h3 className="mb-2 py-4 font-semibold">Date</h3>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Select option</span>
                  <div className="text-xs py-1 rounded flex justify-between items-center">
                    <svg className="mr-2" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.06375 0.541913H7.94191V0.329473C7.94191 0.147475 7.78892 0 7.60036 0C7.41169 0 7.25881 0.147475 7.25881 0.329473V0.541913H3.35707V0.329473C3.35707 0.147475 3.20407 0 3.01551 0C2.82684 0 2.67396 0.147475 2.67396 0.329473V0.541913H1.52308C1.11944 0.541913 0.732253 0.696448 0.446641 0.971657C0.161119 1.24686 0.000468361 1.62013 0 2.0096V8.53242C0.000457384 8.92179 0.161113 9.29506 0.446641 9.57026C0.732277 9.84546 1.11944 10 1.52308 10H9.0637C9.46733 10 9.85452 9.84547 10.1401 9.57026C10.4257 9.29505 10.5863 8.92179 10.5868 8.53242V2.0096C10.5863 1.62013 10.4257 1.24686 10.1401 0.971657C9.8545 0.696453 9.46733 0.541913 9.0637 0.541913H9.06375ZM0.683017 2.0096C0.683017 1.79507 0.771405 1.58935 0.928631 1.43769C1.08586 1.28602 1.2991 1.20076 1.5214 1.20076H2.67228V1.41496C2.67228 1.59685 2.82528 1.74432 3.01383 1.74432C3.20239 1.74432 3.35539 1.59685 3.35539 1.41496V1.20087L7.25888 1.20076V1.41496C7.25888 1.59685 7.41177 1.74432 7.60044 1.74432C7.78899 1.74432 7.94199 1.59685 7.94199 1.41496V1.20087H9.06383V1.20076C9.28646 1.20043 9.50017 1.28536 9.65774 1.43713C9.81531 1.5888 9.90393 1.79485 9.90393 2.00959V3.22523H0.683069L0.683017 2.0096ZM9.06375 9.34114H1.52314C1.30051 9.34158 1.0868 9.25654 0.929228 9.10487C0.77166 8.9531 0.68304 8.74716 0.68304 8.53242V3.88399H9.9039V8.53242C9.9039 8.74718 9.81528 8.9531 9.65771 9.10487C9.50014 9.25654 9.28642 9.34158 9.0638 9.34114H9.06375Z" fill="white"/>
                    </svg>
                    {activeFilters.dateRange}
                  </div>
                </div>
                <select 
                  className="w-full p-2 border text-gray-800"
                  value={activeFilters.date}
                  onChange={(e) => updateDateRange(e.target.value)}
                >
                  <option value="This Week">This Week</option>
                  <option value="Next Week">Next Week</option>
                  <option value="This Month">This Month</option>
                  <option value="Next Month">Next Month</option>
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
                        checked={activeFilters.types.includes(type)}
                        onChange={(e) => handleTypeChange(type, e.target.checked)}
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
                        checked={activeFilters.bids.includes(bid)}
                        onChange={(e) => handleBidsChange(bid, e.target.checked)}
                      />
                      <label htmlFor={bid}>{bid}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={applyFilters}
                  className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

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

            {error && (
              <div className="bg-red-100 p-4 mb-6 text-red-700 rounded">
                {error}
              </div>
            )}

            {view === "list" && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-company py-4">
                  Contracts for you
                </h2>
                {contracts.length > 0 ? (
                  contracts.map((contract, index) => (
                    <ContractCard
                      key={index}
                      contract={contract}
                      onSelect={handleContractSelect}
                    />
                  ))
                ) : (
                  !isContractsLoading && (
                    <p className="text-gray-500">No contracts found matching your criteria.</p>
                  )
                )}
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
