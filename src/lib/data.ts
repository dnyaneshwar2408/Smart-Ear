// Mock data for BOM Visualization
export const bomTree = {
  id: 'BOM-001',
  name: 'Skateboard Assembly',
  quantity: 1,
  children: [
    {
      id: 'COMP-001',
      name: 'Deck',
      quantity: 1,
      children: [],
    },
    {
      id: 'SUB-ASM-001',
      name: 'Truck Assembly',
      quantity: 2,
      children: [
        { id: 'COMP-002', name: 'Axle', quantity: 1, children: [] },
        { id: 'COMP-003', name: 'Hanger', quantity: 1, children: [] },
        { id: 'COMP-004', name: 'Kingpin', quantity: 1, children: [] },
        {
          id: 'SUB-ASM-002',
          name: 'Wheel Sub-Assembly',
          quantity: 2,
          children: [
            { id: 'COMP-005', name: 'Wheel', quantity: 1, children: [] },
            { id: 'COMP-006', name: 'Bearing', quantity: 2, children: [] },
            { id: 'COMP-007', name: 'Spacer', quantity: 1, children: [] },
          ],
        },
      ],
    },
    {
      id: 'COMP-008',
      name: 'Hardware Kit',
      quantity: 1,
      children: [],
    },
  ],
};

// Mock data for Dashboard Charts
export const bomsStatus = [
  { status: 'Draft', count: 150 },
  { status: 'In Review', count: 75 },
  { status: 'Approved', count: 980 },
  { status: 'Archived', count: 49 },
];

export const componentCosts = [
    { component: 'CPU-i9', cost: 450.00 },
    { component: 'GPU-RTX4090', cost: 1200.00 },
    { component: 'RAM-32GB', cost: 150.00 },
    { component: 'SSD-2TB', cost: 250.00 },
    { component: 'PSU-1000W', cost: 200.00 },
];

// Mock data for Change Management
export const changeLog = [
    { id: 'CHG-001', date: '2024-07-20', user: 'Alice', componentId: 'COMP-005', version: '1.1', description: 'Changed material from Polyurethane to Silicone.' },
    { id: 'CHG-002', date: '2024-07-18', user: 'Bob', componentId: 'COMP-006', version: '1.2', description: 'Updated bearing tolerance specifications.' },
    { id: 'CHG-003', date: '2024-07-15', user: 'Alice', componentId: 'SUB-ASM-001', version: '1.1', description: 'Increased quantity of Truck Assembly to 2.' },
    { id: 'CHG-004', date: '2024-07-11', user: 'Charlie', componentId: 'BOM-001', version: '1.0', description: 'Initial BOM creation.' },
    { id: 'CHG-005', date: '2024-07-21', user: 'David', componentId: 'COMP-002', version: '1.1', description: 'Switched supplier for Axle component.' },
    { id: 'CHG-006', date: '2024-07-22', user: 'Alice', componentId: 'COMP-001', version: '1.2', description: 'Modified deck dimensions for new model.' },
];

// Mock data for Smart Sourcing
export const sourcingData = [
    { componentId: 'COMP-001', name: 'Deck', required: 50, internalStock: 120, status: 'In Stock' },
    { componentId: 'COMP-002', name: 'Axle', required: 100, internalStock: 80, status: 'Partial Stock' },
    { componentId: 'COMP-003', name: 'Hanger', required: 100, internalStock: 150, status: 'In Stock' },
    { componentId: 'COMP-005', name: 'Wheel', required: 200, internalStock: 0, status: 'Out of Stock' },
    { componentId: 'COMP-006', name: 'Bearing', required: 400, internalStock: 400, status: 'In Stock' },
    { componentId: 'COMP-008', name: 'Hardware Kit', required: 50, internalStock: 25, status: 'Partial Stock' },
];

// Mock data for inventory forecasting
export const forecastData = [
  { month: "Jan", footprint: 200 },
  { month: "Feb", footprint: 220 },
  { month: "Mar", footprint: 250 },
  { month: "Apr", footprint: 230 },
  { month: "May", footprint: 270 },
  { month: "Jun", footprint: 300 },
  { month: "Jul", footprint: 310 },
  { month: "Aug", footprint: 330 },
  { month: "Sep", footprint: 320 },
  { month: "Oct", footprint: 350 },
  { month: "Nov", footprint: 400 },
  { month: "Dec", footprint: 450 },
];
