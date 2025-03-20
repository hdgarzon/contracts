// Estos datos SOLO deben utilizarse en desarrollo y para pruebas,
// nunca como fallback en producción

import { ENV } from '../config/env';

// Verificar si estamos en modo desarrollo (dev o local)
export const isDevMode = ['dev', 'local'].includes(ENV);

// Advertencia si se intenta importar en producción
if (!isDevMode) {
  console.warn('ADVERTENCIA: mockData.js se está importando en un entorno no-desarrollo. Esto no debería ocurrir.');
}

// Contratos de ejemplo para desarrollo y pruebas
export const contracts = [
  {
    id: 'CO325678',
    status: 'published',
    type: 'Multifamily',
    name: 'Turn Over / Common Area',
    location: 'Tampa, FL',
    startDate: 'Thur, 01/08/2025',
    jobsPerMonth: 4,
    value: '12,000',
    unitCount: 10,
    bidders: 5,
    scopeOfWork: 'Clean all units after tenant move-out. This includes deep cleaning of bathrooms, kitchens, living areas, and bedrooms. All appliances must be cleaned inside and out. Carpets must be professionally cleaned.',
  },
  {
    id: 'CO425679',
    status: 'Active',
    type: 'Studio Housing',
    name: 'Turn Over / Common Area',
    location: 'Miami, FL',
    startDate: 'Thur, 01/10/2025',
    jobsPerMonth: 6,
    value: '15,000',
    unitCount: 15,
    bidders: 10,
    scopeOfWork: 'Complete cleaning of studio apartments including kitchen, bathroom, and living/sleeping area. All surfaces must be sanitized and floors mopped and vacuumed.',
  },
  {
    id: 'CO525680',
    status: 'Active',
    type: 'Multifamily',
    name: 'Turn Over / Common Area',
    location: 'Orlando, FL',
    startDate: 'Thur, 01/12/2025',
    jobsPerMonth: 5,
    value: '18,500',
    unitCount: 12,
    bidders: 8,
    scopeOfWork: 'Clean apartment units between tenants. Tasks include cleaning all surfaces, appliances, bathrooms, and floors. Windows must be cleaned inside and out. All trash must be removed.',
  },
  {
    id: 'CO625681',
    type: 'Studio Housing',
    name: 'Turn Over / Common Area',
    location: 'Jacksonville, FL',
    startDate: 'Thur, 01/15/2025',
    jobsPerMonth: 3,
    value: '9,500',
    unitCount: 8,
    bidders: 4,
    scopeOfWork: 'Clean studio apartments after tenant move-out. Deep cleaning required for all surfaces. Special attention to kitchen appliances and bathroom fixtures.',
  },
  {
    id: 'CO725682',
    type: 'Multifamily',
    name: 'Turn Over / Common Area',
    location: 'St. Petersburg, FL',
    startDate: 'Thur, 01/20/2025',
    jobsPerMonth: 7,
    value: '21,000',
    unitCount: 20,
    bidders: 12,
    scopeOfWork: 'Complete cleaning of family units. Tasks include sanitizing all surfaces, deep cleaning of bathrooms and kitchens, carpet cleaning, and window washing.',
  },
  {
    id: 'CO825683',
    type: 'Studio Housing',
    name: 'Turn Over / Common Area',
    location: 'Clearwater, FL',
    startDate: 'Thur, 01/25/2025',
    jobsPerMonth: 4,
    value: '11,200',
    unitCount: 10,
    bidders: 7,
    scopeOfWork: 'Clean studio apartments between tenants. All surfaces must be cleaned and sanitized. Bathroom fixtures and kitchen appliances require special attention.',
  }
];

// Opciones de filtro sin incluir location
export const filterOptions = {
  // Se omite location intencionalmente para que no se incluya en el primer llamado
  date: 'This Week',
  dateRange: '01/08/2025 - 01/15/2025',
  types: ['Multifamily', 'Studio Housing'],
  bids: ['With bids', 'Without Bids']
};

// Tipos de membresía
export const membershipTypes = {
  QUICK_PAY: 'quickpay',
  ELITE: 'elite',
  MAX: 'max'
};

// Función para obtener datos de prueba solo si estamos en desarrollo
export const getMockData = (dataType) => {
  if (!isDevMode) {
    console.warn('Intentando acceder a datos mock en producción');
    return null;
  }
  
  switch (dataType) {
    case 'contracts':
      return [...contracts];
    case 'filterOptions':
      return {...filterOptions};
    case 'membershipTypes':
      return {...membershipTypes};
    default:
      return null;
  }
};

export default {
  isDevMode,
  getMockData,
  contracts,
  filterOptions,
  membershipTypes
};