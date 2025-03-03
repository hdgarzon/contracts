/**
 * Funciones utilitarias para formatear datos
 */

/**
 * Formatea una fecha en el formato "Día, MM/DD/AAAA"
 * @param {string|Date} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatDate = (date) => {
    if (!date) return '';
    
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return '';
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const day = days[dateObj.getDay()];
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const dayOfMonth = dateObj.getDate().toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    
    return `${day}, ${month}/${dayOfMonth}/${year}`;
  };
  
  /**
   * Formatea un rango de fechas para el filtro
   * @param {Date} startDate - Fecha de inicio
   * @param {Date} endDate - Fecha de fin
   * @returns {string} Rango de fechas formateado
   */
  export const formatDateRange = (startDate, endDate) => {
    const formatShortDate = (date) => {
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };
    
    return `${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;
  };
  
  /**
   * Formatea un valor monetario con separadores de miles
   * @param {number|string} value - Valor a formatear
   * @returns {string} Valor formateado
   */
  export const formatCurrency = (value) => {
    if (!value) return '0';
    
    // Si es string, intentar convertir a número
    let numValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;
    
    // Si no es un número válido, devolver 0
    if (isNaN(numValue)) return '0';
    
    // Formatear con separadores de miles
    return numValue.toLocaleString('en-US');
  };
  
  /**
   * Formatea una lista en un string separado por comas
   * @param {Array} list - Lista a formatear
   * @returns {string} Lista formateada
   */
  export const formatList = (list) => {
    if (!list || !Array.isArray(list)) return '';
    return list.join(', ');
  };
  
  /**
   * Formatea el tipo de propiedad para mostrar
   * @param {string} type - Tipo de propiedad
   * @returns {string} Tipo formateado
   */
  export const formatPropertyType = (type) => {
    if (!type) return '';
    
    // Capitalizar primera letra de cada palabra
    return type.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  };