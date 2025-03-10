import React, { useEffect, useState } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../config/api-keys';

const GoogleMapsScript = ({ onLoad }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setLoaded(true);
      if (onLoad) onLoad();
      return;
    }

    // Callback cuando la API está cargada
    window.initGoogleMapsAPI = () => {
      setLoaded(true);
      if (onLoad) onLoad();
    };

    // Crea el script y lo añade al DOM
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGoogleMapsAPI`;
    script.async = true;
    script.defer = true;
    
    document.head.appendChild(script);

    return () => {
      // Limpieza si el componente se desmonta
      window.initGoogleMapsAPI = null;
      document.head.removeChild(script);
    };
  }, [onLoad]);

  return null; // Este componente no renderiza nada
};

export default GoogleMapsScript;