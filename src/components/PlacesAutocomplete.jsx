import React, { useEffect, useRef, useState, useMemo } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../config/env';

// Componente único de carga de Google Maps API
const GoogleMapsLoader = ({ onLoad }) => {
  useEffect(() => {
    // Comprueba si Google Maps ya está cargado
    if (window.google && window.google.maps) {
      onLoad();
      return;
    }

    // Ya hay un script cargándose
    if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
      const checkIfLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkIfLoaded);
          onLoad();
        }
      }, 100);
      return () => clearInterval(checkIfLoaded);
    }

    // Callback cuando la API está cargada
    window.initGoogleMapsAPI = () => {
      onLoad();
    };

    // Crea el script y lo añade al DOM
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMapsAPI`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      window.initGoogleMapsAPI = null;
      // No eliminamos el script para evitar problemas con múltiples cargas
    };
  }, [onLoad]);

  return null;
};

/**
 * Componente de autocompletado de lugares que puede usar la API de Google Places
 * o valores predefinidos cuando la API no está disponible
 */
const PlacesAutocomplete = ({ 
  value,
  onChange,
  placeholder = 'Search for a location',
  restrictTo = 'us', // Restringir por defecto a Estados Unidos
  filterLocationType = 'cities', // Opciones: 'cities', 'all'
}) => {
  // Lista local de ubicaciones para fallback o uso sin API
  const FLORIDA_LOCATIONS = useMemo(() => [
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
  ], []);

  // Estado interno
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focused, setFocused] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [useGoogleApi, setUseGoogleApi] = useState(false);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const wrapperRef = useRef(null);
  
  // Inicializar el valor de entrada cuando cambie el valor externo
  useEffect(() => {
    if (typeof value === 'string') {
      if (value.includes(',') && /^[-\d.,]+$/.test(value.replace(/,/g, ''))) {
        // Es una coordenada, buscar en las ubicaciones predefinidas
        const matchingLocation = FLORIDA_LOCATIONS.find(loc => loc.coordinates === value);
        if (matchingLocation) {
          setInputValue(matchingLocation.name);
        } else if (!inputValue) {
          setInputValue('');
        }
      } else {
        // Es un nombre de lugar
        setInputValue(value);
      }
    }
  }, [value, FLORIDA_LOCATIONS, inputValue]);

  // Configurar Google Places Autocomplete cuando la API esté cargada
  useEffect(() => {
    if (!apiLoaded || !inputRef.current || !useGoogleApi) return;

    try {
      // Crear la instancia de Autocomplete
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: filterLocationType === 'cities' ? ['(cities)'] : [],
        componentRestrictions: restrictTo ? { country: restrictTo } : {}
      });

      // Escuchar eventos de selección de lugar
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        
        if (!place.geometry) {
          console.warn('No se encontraron detalles para este lugar');
          return;
        }

        // Obtener coordenadas
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const coordinates = `${lng},${lat}`; // Formato específico para la API
        
        // Actualizar el valor del input
        setInputValue(place.formatted_address || place.name);
        
        // Llamar al callback con las coordenadas y detalles
        onChange(coordinates, {
          displayName: place.formatted_address || place.name,
          placeId: place.place_id,
          coordinates: { lat, lng }
        });
      });
    } catch (error) {
      console.error('Error al inicializar Google Places Autocomplete:', error);
      setUseGoogleApi(false);
    }

    return () => {
      // Limpieza
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [apiLoaded, filterLocationType, onChange, restrictTo, useGoogleApi]);

  // Filtrar sugerencias locales
  const filteredSuggestions = useMemo(() => {
    if (!inputValue.trim() || useGoogleApi) return [];
    
    const lowerInput = inputValue.toLowerCase();
    return FLORIDA_LOCATIONS.filter(location => 
      location.name.toLowerCase().includes(lowerInput)
    );
  }, [FLORIDA_LOCATIONS, inputValue, useGoogleApi]);

  // Manejar cambios en el campo de entrada
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Si no usamos Google API, actualizar las sugerencias locales
    if (!useGoogleApi) {
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }
  };

  // Manejar selección de sugerencia local
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
        if (!useGoogleApi) {
          // Si no hay sugerencia seleccionada con API local, intentar encontrar una ubicación que coincida
          const matchingLocation = FLORIDA_LOCATIONS.find(
            loc => loc.name.toLowerCase() === inputValue.toLowerCase()
          );
          
          if (matchingLocation) {
            handleSelectSuggestion(matchingLocation);
          }
        }
        setShowSuggestions(false);
      }
    }, 200);
  };

  // Cuando la API de Google Maps se ha cargado
  const handleGoogleMapsLoaded = () => {
    setApiLoaded(true);
    // Verificar si podemos usar la API de Google
    if (window.google && window.google.maps && window.google.maps.places) {
      setUseGoogleApi(true);
    } else {
      console.warn('Google Places API no disponible, usando datos locales');
      setSuggestions(filteredSuggestions);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <GoogleMapsLoader onLoad={handleGoogleMapsLoaded} />
      
      <input
        ref={inputRef}
        type="text"
        className="w-full p-2 border text-gray-800 rounded"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleBlur}
        autoComplete="off"
        aria-label="Location search"
        aria-autocomplete="list"
        aria-controls={showSuggestions && !useGoogleApi ? "location-suggestions" : undefined}
        aria-expanded={showSuggestions && !useGoogleApi}
      />
      
      {showSuggestions && !useGoogleApi && filteredSuggestions.length > 0 && (
        <ul
          id="location-suggestions"
          className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {filteredSuggestions.map((location, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-company"
              onClick={() => handleSelectSuggestion(location)}
              onMouseDown={() => setFocused(true)}
              role="option"
              aria-selected={false}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSelectSuggestion(location);
                }
              }}
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete;