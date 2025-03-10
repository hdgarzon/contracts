// Formateadores para datos

// Formateador de fechas
export const formatDate = (dateValue) => {
  if (!dateValue) return '';
  
  try {
    const date = new Date(dateValue);
    
    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return '';
    }
    
    // Obtener el nombre del día de la semana
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const dayName = dayNames[date.getDay()];
    
    // Formatear como MM/DD/YYYY
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${dayName}, ${month}/${day}/${year}`;
  } catch (error) {
    return '';
  }
};

// Formateador de moneda
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return '0';
  
  try {
    // Convertir a número si es un string
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
    
    // Verificar si es un número válido
    if (isNaN(numValue)) {
      return '0';
    }
    
    // Formatear con separadores de miles
    return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch (error) {
    return '0';
  }
};

// Formateador para números con precisión específica
export const formatNumber = (value, precision = 0) => {
  if (value === undefined || value === null) return '0';
  
  try {
    // Convertir a número si es un string
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
    
    // Verificar si es un número válido
    if (isNaN(numValue)) {
      return '0';
    }
    
    // Formatear con la precisión especificada
    return numValue.toFixed(precision);
  } catch (error) {
    return '0';
  }
};

export default {
  formatDate,
  formatCurrency,
  formatNumber
};