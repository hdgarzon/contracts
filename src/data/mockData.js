// Datos de ejemplo para la aplicación

// Contratos de ejemplo
export const contracts = [
    {
      id: 'CO325678',
      type: 'Multifamily',
      name: 'Turn Over',
      location: 'Tampa, Florida',
      startDate: 'Thur, 01/08/2025',
      jobsPerMonth: 4,
      value: '12,000',
      unitCount: 10,
      bidders: 5
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
      bidders: 10
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
      bidders: 25
    }
  ];
  
  // Opciones de filtro
  export const filterOptions = {
    location: 'Tampa',
    date: 'This Week',
    dateRange: '01/08/2025 - 01/15/2025',
    types: ['Multifamily', 'Studio Housing'],
    bids: ['With bids', 'Without Bids']
  };
  
  // Detalles de contrato ampliados (para vista detallada)
  export const contractDetails = {
    'CO325678': {
      scopeOfWork: [
        'is simply dummy text of the printing',
        'is simply dummy text of the printing',
        'is simply dummy text of the printing',
        'is simply dummy text of the printing',
        'is simply dummy text of the printing'
      ],
      additionalInfo: 'Please note that the annual contract amount only includes Turn Over services. If you win this contract, you\'ll have the opportunity to earn more with Common Areas. During your first visit to the property, you can set your price and coordinate all additional payment details with our PINCH team.'
    }
  };
  
  // Tipos de membresía
  export const membershipTypes = {
    QUICK_PAY: 'quickpay',
    ELITE: 'elite',
    MAX: 'max'
  };