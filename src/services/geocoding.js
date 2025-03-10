// Datos predefinidos de ubicaciones comunes en Florida
const COMMON_LOCATIONS = [
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
  
  // Función para buscar entre las ubicaciones comunes
  export const searchCommonLocations = (query) => {
    if (!query) return [];
    
    const lowerQuery = query.toLowerCase();
    return COMMON_LOCATIONS
      .filter(location => location.name.toLowerCase().includes(lowerQuery))
      .map(location => ({
        name: location.name,
        coordinates: location.coordinates,
        display: location.name
      }));
  };
  
  // Función para obtener coordenadas por nombre de ubicación
  export const getCoordinatesByName = (locationName) => {
    if (!locationName) return null;
    
    const location = COMMON_LOCATIONS.find(
      loc => loc.name.toLowerCase() === locationName.toLowerCase()
    );
    
    return location ? location.coordinates : '-82.5513709,27.4974141'; // Default to Bradenton, FL
  };
  
  // Función para geocodificar usando Google Maps si está disponible
  export const geocodeAddress = async (address) => {
    if (!address) return null;
    
    // Si Google Maps API está disponible, úsala
    if (window.google && window.google.maps && window.google.maps.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address, region: 'us' }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            const location = results[0].geometry.location;
            resolve({
              coordinates: `${location.lng()},${location.lat()}`,
              displayName: results[0].formatted_address,
              lat: location.lat(),
              lng: location.lng()
            });
          } else {
            // Si falla, recurrimos a nuestros datos predefinidos
            const location = searchCommonLocations(address)[0];
            if (location) {
              resolve({
                coordinates: location.coordinates,
                displayName: location.name
              });
            } else {
              reject(new Error(`Geocoding error: ${status}`));
            }
          }
        });
      });
    } else {
      // Si Google Maps no está disponible, usa datos predefinidos
      const location = searchCommonLocations(address)[0];
      if (location) {
        return {
          coordinates: location.coordinates,
          displayName: location.name
        };
      }
      return null;
    }
  };
  
  export default {
    searchCommonLocations,
    getCoordinatesByName,
    geocodeAddress
  };