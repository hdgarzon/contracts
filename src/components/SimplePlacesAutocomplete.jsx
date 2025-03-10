import React, { useState, useEffect, useRef } from 'react';

// Lista de ubicaciones predefinidas de Florida con sus coordenadas
const FLORIDA_LOCATIONS = [
  { name: 'Tampa, FL', coordinates: '-82.4572,27.9506' },
  { name: 'Orlando, FL', coordinates: '-81.3792,28.5383' },
  { name: 'Miami, FL', coordinates: '-80.1918,25.7617' },
  { name: 'Jacksonville, FL', coordinates: '-81.6557,30.3322' },
  { name: 'Gainesville, FL', coordinates: '-82.3248,29.6516' },
  { name: 'Tallahassee, FL', coordinates: '-84.2807,30.4383' },
  { name: 'Bradenton, FL', coordinates: '-82.5513709,27.4974141' },
  { name: 'Sarasota, FL', coordinates: '-82.5307,27.3364' },
  { name: 'St. Petersburg, FL', coordinates: '-82.6793,27.7676' },
  { name: 'Clearwater, FL', coordinates: '-82.8001,27.9659' },
  { name: 'Fort Lauderdale, FL', coordinates: '-80.1431,26.1224' },
  { name: 'West Palm Beach, FL', coordinates: '-80.0534,26.7153' },
  { name: 'Pensacola, FL', coordinates: '-87.2169,30.4213' },
  { name: 'Fort Myers, FL', coordinates: '-81.8723,26.6406' },
  { name: 'Naples, FL', coordinates: '-81.7948,26.1420' },
  { name: 'Daytona Beach, FL', coordinates: '-81.0228,29.2108' },
  { name: 'Key West, FL', coordinates: '-81.7800,24.5551' }
];

const SimplePlacesAutocomplete = ({ value, onChange, placeholder = 'Search for a location' }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef(null);

  // Inicializar el valor de entrada
  useEffect(() => {
    if (typeof value === 'string') {
      const matchingLocation = FLORIDA_LOCATIONS.find(loc => loc.coordinates === value);
      if (matchingLocation) {
        setInputValue(matchingLocation.name);
      } else if (!value.includes(',')) {
        setInputValue(value);
      }
    }
  }, [value]);

  // Filtrar sugerencias basadas en la entrada
  const filterSuggestions = (input) => {
    if (!input.trim()) return [];
    
    const lowerInput = input.toLowerCase();
    return FLORIDA_LOCATIONS.filter(location => 
      location.name.toLowerCase().includes(lowerInput)
    );
  };

  // Manejar cambios de entrada
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Actualizar sugerencias
    const filtered = filterSuggestions(newValue);
    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  // Manejar selección de sugerencia
  const handleSelectSuggestion = (location) => {
    setInputValue(location.name);
    setShowSuggestions(false);
    
    onChange(location.coordinates, {
      displayName: location.name,
      coordinates: {
        lng: parseFloat(location.coordinates.split(',')[0]),
        lat: parseFloat(location.coordinates.split(',')[1])
      }
    });
  };

  // Cerrar las sugerencias al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  // Al perder el foco del input
  const handleBlur = () => {
    // Pequeño retraso para permitir clics en las sugerencias
    setTimeout(() => {
      if (!focused) {
        // Si no hay sugerencia seleccionada, intentar encontrar una ubicación que coincida
        const matchingLocation = FLORIDA_LOCATIONS.find(
          loc => loc.name.toLowerCase() === inputValue.toLowerCase()
        );
        
        if (matchingLocation) {
          handleSelectSuggestion(matchingLocation);
        }
      }
    }, 200);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        type="text"
        className="w-full p-2 border text-gray-800 rounded"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 shadow-lg max-h-60 overflow-auto">
          {suggestions.map((location, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-company"
              onClick={() => handleSelectSuggestion(location)}
              onMouseDown={() => setFocused(true)}
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SimplePlacesAutocomplete;