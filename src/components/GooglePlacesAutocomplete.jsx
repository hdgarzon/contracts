import React, { useEffect, useRef, useState } from 'react';

// Componente para cargar la API de Google Maps
const GoogleMapsScript = ({ onLoad, apiKey }) => {
  useEffect(() => {
    // Ya está cargado
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
      return;
    }

    // Callback cuando la API está cargada
    window.initGoogleMapsAPI = () => {
      onLoad();
    };

    // Crea el script y lo añade al DOM
    const script = document.createElement('script');
    // Insertar tu clave API aquí
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMapsAPI`;
    script.async = true;
    script.defer = true;
    
    document.head.appendChild(script);

    return () => {
      // Limpieza si el componente se desmonta
      window.initGoogleMapsAPI = null;
    };
  }, [onLoad, apiKey]);

  return null; // Este componente no renderiza nada
};

const GooglePlacesAutocomplete = ({ 
  value,
  onChange,
  placeholder = 'Search for a location',
  apiKey = 'TU_CLAVE_API_AQUI' // ¡Reemplaza con tu clave real!
}) => {
  const [inputValue, setInputValue] = useState('');
  const [apiLoaded, setApiLoaded] = useState(false);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Actualizar el valor mostrado basado en el valor recibido por props
  useEffect(() => {
    if (typeof value === 'string') {
      // Si es una coordenada, no actualizamos el input
      if (value.includes(',') && /^[-\d.,]+$/.test(value.replace(/,/g, ''))) {
        if (!inputValue) {
          setInputValue('');
        }
      } else {
        // Es un nombre de lugar, lo mostramos
        setInputValue(value);
      }
    }
  }, [value, inputValue]);

  // Inicializar Google Places Autocomplete cuando la API está cargada
  useEffect(() => {
    if (!apiLoaded || !inputRef.current) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['(cities)'],
      componentRestrictions: { country: 'us' } // Restringir a Estados Unidos
    });

    // Escuchar eventos de selección de lugar
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace();
      
      if (!place.geometry) {
        console.error('No se encontraron detalles para este lugar');
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

    return () => {
      // Limpieza
      if (autocompleteRef.current && window.google) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [apiLoaded, onChange]);

  // Manejar los cambios en el campo de entrada
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <GoogleMapsScript apiKey={apiKey} onLoad={() => setApiLoaded(true)} />
      <input
        ref={inputRef}
        type="text"
        className="w-full p-2 border text-gray-800 rounded"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
    </>
  );
};

export default GooglePlacesAutocomplete;