// Datos de ejemplo para la aplicación

// Contratos de ejemplo
export const contracts = [
    {
      id: 'CO325678', //numberContract
      status: 'published', // published || assigned
      type: 'multifamily',
      services: 'turnOver',
      location: 'Tampa, FL',
      startDate: 'Thur, 01/08/2025', //2025-03-01T10:22:49.077Z zona horaria global la zona horaria del que ve la informacion sacarla del Browser
      jobsPerMonth: 4,
      value: '12,000',
      unitCount: 10,
      bidders: 5,
      scopeOfWork: 'is simply dummy text of the printing',
      assignedCleaner: 'John Doe',
    },
    {
      id: 'CO325678',
      status: 'Active',
      type: 'Studio Housing',
      name: 'Turn Over',
      location: 'Tampa, Florida',
      startDate: 'Thur, 01/10/2025',
      jobsPerMonth: 4,
      value: '1115.00',
      unitCount: 8,
      bidders: 10,
      scopeOfWork: 'is simply dummy text of the printing',
    },
    {
      id: 'CO325678',
      status: 'Active',
      type: 'Studio Housing',
      name: 'Turn Over',
      location: 'Tampa, Florida',
      startDate: 'Thur, 01/12/2025',
      jobsPerMonth: 4,
      value: '1505.00',
      unitCount: 10,
      bidders: 25,
      scopeOfWork: 'is simply dummy text of the printing',
    },
    {
      id: 'CO325678',
      type: 'Multifamily',
      name: 'Turn Over',
      location: 'Tampa, Florida',
      startDate: 'Thur, 01/08/2025',
      jobsPerMonth: 4,
      value: '12,000',
      unitCount: 10,
      bidders: 5,
      scopeOfWork: 'is simply dummy text of the printing',
    },
    {
      id: 'CO325678',
      type: 'Studio Housing',
      name: 'Turn Over',
      location: 'Tampa, Florida',
      startDate: 'Thur, 01/10/2025',
      jobsPerMonth: 4,
      value: '1115.00',
      unitCount: 8,
      bidders: 10,
      scopeOfWork: 'is simply dummy text of the printing',
    },
    {
      id: 'CO325678',
      type: 'Studio Housing',
      name: 'Turn Over',
      location: 'Tampa, Florida',
      startDate: 'Thur, 01/12/2025',
      jobsPerMonth: 4,
      value: '1505.00',
      unitCount: 10,
      bidders: 25,
      scopeOfWork: 'is simply dummy text of the printing',
    }
  ];
  
  // Opciones de filtro
  export const filterOptions = {
    // Tokens
    location: {
      lat: 25.774265,
      lng: -80.193666
    },
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