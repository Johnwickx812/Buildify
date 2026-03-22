export type Brand = 'AMD' | 'Intel';
export type Purpose = 'Gaming' | 'Work' | 'Editing' | 'Budget';
export type BudgetRange = 'budget' | 'mid' | 'high' | 'extreme';

export interface PCPart {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'cpu' | 'gpu' | 'ram' | 'storage' | 'motherboard' | 'psu' | 'case' | 'cooler';
  specs: Record<string, string>;
  image?: string;
}

export interface Peripheral {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'monitor' | 'keyboard' | 'mouse' | 'headset';
  specs: Record<string, string>;
}

// Prices updated to Feb 2026 Indian market rates (INR) — sourced from Amazon.in, Flipkart, MDComputers
export const cpuData: Record<Brand, Record<BudgetRange, PCPart>> = {
  AMD: {
    budget: { id: 'amd-5600', name: 'Ryzen 5 5600', brand: 'AMD', price: 7999, category: 'cpu', specs: { cores: '6', threads: '12', baseClock: '3.5 GHz', boostClock: '4.4 GHz' } },
    mid: { id: 'amd-7600x', name: 'Ryzen 5 7600X', brand: 'AMD', price: 15999, category: 'cpu', specs: { cores: '6', threads: '12', baseClock: '4.7 GHz', boostClock: '5.3 GHz' } },
    high: { id: 'amd-7800x3d', name: 'Ryzen 7 7800X3D', brand: 'AMD', price: 29999, category: 'cpu', specs: { cores: '8', threads: '16', baseClock: '4.2 GHz', boostClock: '5.0 GHz', cache: '96MB' } },
    extreme: { id: 'amd-9800x3d', name: 'Ryzen 7 9800X3D', brand: 'AMD', price: 46999, category: 'cpu', specs: { cores: '8', threads: '16', baseClock: '4.7 GHz', boostClock: '5.2 GHz', cache: '104MB' } },
  },
  Intel: {
    budget: { id: 'intel-12400f', name: 'Core i5-12400F', brand: 'Intel', price: 8799, category: 'cpu', specs: { cores: '6', threads: '12', baseClock: '2.5 GHz', boostClock: '4.4 GHz' } },
    mid: { id: 'intel-14400f', name: 'Core i5-14400F', brand: 'Intel', price: 13999, category: 'cpu', specs: { cores: '10', threads: '16', baseClock: '2.5 GHz', boostClock: '4.7 GHz' } },
    high: { id: 'intel-14700k', name: 'Core i7-14700K', brand: 'Intel', price: 35999, category: 'cpu', specs: { cores: '20', threads: '28', baseClock: '3.4 GHz', boostClock: '5.6 GHz' } },
    extreme: { id: 'intel-14900k', name: 'Core i9-14900K', brand: 'Intel', price: 44999, category: 'cpu', specs: { cores: '24', threads: '32', baseClock: '3.2 GHz', boostClock: '6.0 GHz' } },
  },
};

export const gpuData: Record<Purpose, Record<BudgetRange, PCPart>> = {
  Gaming: {
    budget: { id: 'rtx-4060', name: 'RTX 4060', brand: 'NVIDIA', price: 24999, category: 'gpu', specs: { vram: '8GB GDDR6', cores: '3072', boostClock: '2.46 GHz' } },
    mid: { id: 'rtx-4070s', name: 'RTX 4070 Super', brand: 'NVIDIA', price: 49999, category: 'gpu', specs: { vram: '12GB GDDR6X', cores: '7168', boostClock: '2.51 GHz' } },
    high: { id: 'rtx-4080s', name: 'RTX 4080 Super', brand: 'NVIDIA', price: 84999, category: 'gpu', specs: { vram: '16GB GDDR6X', cores: '10240', boostClock: '2.55 GHz' } },
    extreme: { id: 'rtx-5080', name: 'RTX 5080', brand: 'NVIDIA', price: 114999, category: 'gpu', specs: { vram: '16GB GDDR7', cores: '10752', boostClock: '2.62 GHz' } },
  },
  Editing: {
    budget: { id: 'rtx-4060-edit', name: 'RTX 4060', brand: 'NVIDIA', price: 24999, category: 'gpu', specs: { vram: '8GB GDDR6', cores: '3072', boostClock: '2.46 GHz' } },
    mid: { id: 'rtx-4070ti-s', name: 'RTX 4070 Ti Super', brand: 'NVIDIA', price: 64999, category: 'gpu', specs: { vram: '16GB GDDR6X', cores: '8448', boostClock: '2.61 GHz' } },
    high: { id: 'rtx-4080s-edit', name: 'RTX 4080 Super', brand: 'NVIDIA', price: 84999, category: 'gpu', specs: { vram: '16GB GDDR6X', cores: '10240', boostClock: '2.55 GHz' } },
    extreme: { id: 'rtx-5080-edit', name: 'RTX 5080', brand: 'NVIDIA', price: 114999, category: 'gpu', specs: { vram: '16GB GDDR7', cores: '10752', boostClock: '2.62 GHz' } },
  },
  Work: {
    budget: { id: 'rx-7600', name: 'RX 7600', brand: 'AMD', price: 19999, category: 'gpu', specs: { vram: '8GB GDDR6', cores: '2048', boostClock: '2.66 GHz' } },
    mid: { id: 'rtx-4060ti', name: 'RTX 4060 Ti', brand: 'NVIDIA', price: 32999, category: 'gpu', specs: { vram: '8GB GDDR6', cores: '4352', boostClock: '2.54 GHz' } },
    high: { id: 'rtx-4070s-work', name: 'RTX 4070 Super', brand: 'NVIDIA', price: 49999, category: 'gpu', specs: { vram: '12GB GDDR6X', cores: '7168', boostClock: '2.48 GHz' } },
    extreme: { id: 'rtx-4080s-work', name: 'RTX 4080 Super', brand: 'NVIDIA', price: 84999, category: 'gpu', specs: { vram: '16GB GDDR6X', cores: '10240', boostClock: '2.55 GHz' } },
  },
  Budget: {
    budget: { id: 'rx-6600', name: 'RX 6600', brand: 'AMD', price: 12999, category: 'gpu', specs: { vram: '8GB GDDR6', cores: '1792', boostClock: '2.49 GHz' } },
    mid: { id: 'rx-7600-budget', name: 'RX 7600', brand: 'AMD', price: 19999, category: 'gpu', specs: { vram: '8GB GDDR6', cores: '2048', boostClock: '2.66 GHz' } },
    high: { id: 'rtx-4060-budget', name: 'RTX 4060', brand: 'NVIDIA', price: 24999, category: 'gpu', specs: { vram: '8GB GDDR6', cores: '3072', boostClock: '2.46 GHz' } },
    extreme: { id: 'rtx-4070s-b', name: 'RTX 4070 Super', brand: 'NVIDIA', price: 49999, category: 'gpu', specs: { vram: '12GB GDDR6X', cores: '7168', boostClock: '2.51 GHz' } },
  },
};

export const ramData: Record<BudgetRange, PCPart> = {
  budget: { id: 'ram-16gb', name: 'Corsair Vengeance 16GB DDR4', brand: 'Corsair', price: 2799, category: 'ram', specs: { capacity: '16GB (2x8GB)', speed: 'DDR4-3200', latency: 'CL16' } },
  mid: { id: 'ram-32gb', name: 'Corsair Vengeance 32GB DDR5', brand: 'Corsair', price: 5999, category: 'ram', specs: { capacity: '32GB (2x16GB)', speed: 'DDR5-5600', latency: 'CL36' } },
  high: { id: 'ram-32gb-high', name: 'G.Skill Trident Z5 RGB 32GB', brand: 'G.Skill', price: 9999, category: 'ram', specs: { capacity: '32GB (2x16GB)', speed: 'DDR5-6000', latency: 'CL30' } },
  extreme: { id: 'ram-64gb', name: 'G.Skill Trident Z5 64GB', brand: 'G.Skill', price: 17999, category: 'ram', specs: { capacity: '64GB (2x32GB)', speed: 'DDR5-6000', latency: 'CL30' } },
};

export const storageData: Record<BudgetRange, PCPart> = {
  budget: { id: 'ssd-500gb', name: 'Samsung 980 500GB', brand: 'Samsung', price: 2999, category: 'storage', specs: { capacity: '500GB', type: 'NVMe M.2', read: '3500 MB/s', write: '3000 MB/s' } },
  mid: { id: 'ssd-1tb', name: 'Samsung 990 Evo 1TB', brand: 'Samsung', price: 6499, category: 'storage', specs: { capacity: '1TB', type: 'NVMe M.2 Gen4', read: '5000 MB/s', write: '4200 MB/s' } },
  high: { id: 'ssd-2tb', name: 'Samsung 990 Pro 2TB', brand: 'Samsung', price: 12999, category: 'storage', specs: { capacity: '2TB', type: 'NVMe M.2 Gen4', read: '7450 MB/s', write: '6900 MB/s' } },
  extreme: { id: 'ssd-4tb', name: 'Samsung 990 Pro 4TB', brand: 'Samsung', price: 24999, category: 'storage', specs: { capacity: '4TB', type: 'NVMe M.2 Gen4', read: '7450 MB/s', write: '6900 MB/s' } },
};

export const motherboardData: Record<Brand, Record<BudgetRange, PCPart>> = {
  AMD: {
    budget: { id: 'mb-b550', name: 'MSI B550 Gaming Plus', brand: 'MSI', price: 8999, category: 'motherboard', specs: { socket: 'AM4', chipset: 'B550', formFactor: 'ATX' } },
    mid: { id: 'mb-b650', name: 'MSI MAG B650 Tomahawk', brand: 'MSI', price: 16999, category: 'motherboard', specs: { socket: 'AM5', chipset: 'B650', formFactor: 'ATX' } },
    high: { id: 'mb-x670e', name: 'ASUS ROG Strix X670E-F', brand: 'ASUS', price: 31999, category: 'motherboard', specs: { socket: 'AM5', chipset: 'X670E', formFactor: 'ATX' } },
    extreme: { id: 'mb-x670e-ext', name: 'ASUS ROG Crosshair X670E Hero', brand: 'ASUS', price: 47999, category: 'motherboard', specs: { socket: 'AM5', chipset: 'X670E', formFactor: 'ATX' } },
  },
  Intel: {
    budget: { id: 'mb-b660', name: 'MSI PRO B660M-A', brand: 'MSI', price: 7999, category: 'motherboard', specs: { socket: 'LGA1700', chipset: 'B660', formFactor: 'mATX' } },
    mid: { id: 'mb-b760', name: 'MSI MAG B760 Tomahawk', brand: 'MSI', price: 15999, category: 'motherboard', specs: { socket: 'LGA1700', chipset: 'B760', formFactor: 'ATX' } },
    high: { id: 'mb-z790', name: 'ASUS ROG Strix Z790-A', brand: 'ASUS', price: 27999, category: 'motherboard', specs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX' } },
    extreme: { id: 'mb-z790-ext', name: 'ASUS ROG Maximus Z790 Hero', brand: 'ASUS', price: 43999, category: 'motherboard', specs: { socket: 'LGA1700', chipset: 'Z790', formFactor: 'ATX' } },
  },
};

export const psuData: Record<BudgetRange, PCPart> = {
  budget: { id: 'psu-550w', name: 'Corsair CV550', brand: 'Corsair', price: 3499, category: 'psu', specs: { wattage: '550W', efficiency: '80+ Bronze', modular: 'Non-Modular' } },
  mid: { id: 'psu-650w', name: 'Corsair RM650', brand: 'Corsair', price: 6499, category: 'psu', specs: { wattage: '650W', efficiency: '80+ Gold', modular: 'Full' } },
  high: { id: 'psu-850w', name: 'Corsair RM850x', brand: 'Corsair', price: 10499, category: 'psu', specs: { wattage: '850W', efficiency: '80+ Gold', modular: 'Full' } },
  extreme: { id: 'psu-1000w', name: 'Corsair RM1000x', brand: 'Corsair', price: 13999, category: 'psu', specs: { wattage: '1000W', efficiency: '80+ Gold', modular: 'Full' } },
};

export const caseData: Record<BudgetRange, PCPart> = {
  budget: { id: 'case-h510', name: 'NZXT H510 Flow', brand: 'NZXT', price: 4999, category: 'case', specs: { formFactor: 'Mid Tower', fans: '2', color: 'Black' } },
  mid: { id: 'case-4000d', name: 'Corsair 4000D Airflow', brand: 'Corsair', price: 7499, category: 'case', specs: { formFactor: 'Mid Tower', fans: '2', color: 'Black' } },
  high: { id: 'case-o11d', name: 'Lian Li O11 Dynamic', brand: 'Lian Li', price: 10999, category: 'case', specs: { formFactor: 'Mid Tower', fans: '0', color: 'White' } },
  extreme: { id: 'case-o11d-xl', name: 'Lian Li O11 Dynamic EVO XL', brand: 'Lian Li', price: 15999, category: 'case', specs: { formFactor: 'Full Tower', fans: '0', color: 'Black' } },
};

export const coolerData: Record<BudgetRange, PCPart> = {
  budget: { id: 'cooler-hyper212', name: 'Cooler Master Hyper 212', brand: 'Cooler Master', price: 1999, category: 'cooler', specs: { type: 'Air', fans: '1', tdp: '150W' } },
  mid: { id: 'cooler-ak620', name: 'DeepCool AK620', brand: 'DeepCool', price: 4499, category: 'cooler', specs: { type: 'Air', fans: '2', tdp: '260W' } },
  high: { id: 'cooler-h150i', name: 'Corsair iCUE H150i Elite', brand: 'Corsair', price: 11999, category: 'cooler', specs: { type: 'AIO 360mm', fans: '3', tdp: '350W' } },
  extreme: { id: 'cooler-kraken', name: 'NZXT Kraken Z73', brand: 'NZXT', price: 21999, category: 'cooler', specs: { type: 'AIO 360mm', fans: '3', tdp: '400W' } },
};

export const peripherals: Peripheral[] = [
  // Monitors — low to high
  { id: 'mon-basic', name: 'Acer KG221Q 21.5"', brand: 'Acer', price: 6499, category: 'monitor', specs: { resolution: '1080p', refresh: '75Hz', panel: 'VA' } },
  { id: 'mon-1080p-lg', name: 'LG 24MP400 24"', brand: 'LG', price: 8999, category: 'monitor', specs: { resolution: '1080p', refresh: '75Hz', panel: 'IPS' } },
  { id: 'mon-1080p', name: 'ASUS VG248QG 24"', brand: 'ASUS', price: 12999, category: 'monitor', specs: { resolution: '1080p', refresh: '165Hz', panel: 'TN' } },
  { id: 'mon-1440p-27', name: 'MSI G274QPF-E2 27"', brand: 'MSI', price: 19999, category: 'monitor', specs: { resolution: '1440p', refresh: '170Hz', panel: 'IPS' } },
  { id: 'mon-1440p', name: 'LG 27GP850-B 27"', brand: 'LG', price: 24999, category: 'monitor', specs: { resolution: '1440p', refresh: '180Hz', panel: 'IPS' } },
  { id: 'mon-4k', name: 'Samsung Odyssey G7 32"', brand: 'Samsung', price: 44999, category: 'monitor', specs: { resolution: '4K', refresh: '144Hz', panel: 'VA' } },
  { id: 'mon-ultrawide', name: 'LG 34WP65G-B 34"', brand: 'LG', price: 29999, category: 'monitor', specs: { resolution: '2560x1080', refresh: '75Hz', panel: 'IPS' } },
  // Keyboards — low to high
  { id: 'kb-entry', name: 'Zebronics Zeb-Max Plus', brand: 'Zebronics', price: 699, category: 'keyboard', specs: { type: 'Membrane', switches: 'Rubber Dome', rgb: 'No' } },
  { id: 'kb-basic', name: 'Logitech MK215 Combo', brand: 'Logitech', price: 1299, category: 'keyboard', specs: { type: 'Membrane', switches: 'Rubber Dome', rgb: 'No' } },
  { id: 'kb-mid-entry', name: 'Redragon K552 Kumara', brand: 'Redragon', price: 2499, category: 'keyboard', specs: { type: 'Mechanical', switches: 'Outemu Blue', rgb: 'Single Zone' } },
  { id: 'kb-budget', name: 'Logitech G413', brand: 'Logitech', price: 4999, category: 'keyboard', specs: { type: 'Mechanical', switches: 'Tactile', rgb: 'Single Zone' } },
  { id: 'kb-mid', name: 'Keychron K2 Pro', brand: 'Keychron', price: 7999, category: 'keyboard', specs: { type: 'Mechanical', switches: 'Gateron G Pro', rgb: 'Per-Key RGB' } },
  { id: 'kb-high', name: 'Keychron Q1', brand: 'Keychron', price: 11999, category: 'keyboard', specs: { type: 'Mechanical', switches: 'Gateron', rgb: 'Per-Key RGB' } },
  // Mice — low to high
  { id: 'mouse-entry', name: 'Logitech B100', brand: 'Logitech', price: 349, category: 'mouse', specs: { sensor: 'Optical', dpi: '800', weight: '90g' } },
  { id: 'mouse-basic', name: 'Zebronics Zeb-Transformer-M', brand: 'Zebronics', price: 699, category: 'mouse', specs: { sensor: 'Optical', dpi: '3200', weight: '85g' } },
  { id: 'mouse-mid-entry', name: 'Redragon M711 Cobra', brand: 'Redragon', price: 1499, category: 'mouse', specs: { sensor: 'Optical', dpi: '10000', weight: '110g' } },
  { id: 'mouse-budget', name: 'Logitech G102 Lightsync', brand: 'Logitech', price: 1999, category: 'mouse', specs: { sensor: 'Mercury', dpi: '8000', weight: '75g' } },
  { id: 'mouse-mid-plus', name: 'Logitech G502 X', brand: 'Logitech', price: 3999, category: 'mouse', specs: { sensor: 'HERO 25K', dpi: '25600', weight: '89g' } },
  { id: 'mouse-high', name: 'Razer DeathAdder V3', brand: 'Razer', price: 5999, category: 'mouse', specs: { sensor: 'Focus Pro 30K', dpi: '30000', weight: '59g' } },
  { id: 'mouse-top', name: 'Logitech G Pro X Superlight 2', brand: 'Logitech', price: 11999, category: 'mouse', specs: { sensor: 'HERO 2', dpi: '32000', weight: '60g' } },
  // Headsets — low to high
  { id: 'headset-entry', name: 'Zebronics Zeb-Thunder', brand: 'Zebronics', price: 699, category: 'headset', specs: { driver: '40mm', surround: 'Stereo', mic: 'Fixed' } },
  { id: 'headset-basic', name: 'Logitech H111', brand: 'Logitech', price: 999, category: 'headset', specs: { driver: '40mm', surround: 'Stereo', mic: 'Integrated' } },
  { id: 'headset-mid-entry', name: 'Redragon H510 Zeus', brand: 'Redragon', price: 2299, category: 'headset', specs: { driver: '50mm', surround: '7.1 Virtual', mic: 'Detachable' } },
  { id: 'headset-budget', name: 'HyperX Cloud III', brand: 'HyperX', price: 6499, category: 'headset', specs: { driver: '53mm', surround: '7.1 Virtual', mic: 'Detachable' } },
  { id: 'headset-mid', name: 'SteelSeries Arctis Nova 7', brand: 'SteelSeries', price: 12999, category: 'headset', specs: { driver: '40mm', surround: 'DTS', mic: 'Retractable' } },
  { id: 'headset-high', name: 'Sony WH-1000XM5', brand: 'Sony', price: 22999, category: 'headset', specs: { driver: '40mm', surround: 'Stereo', mic: 'Built-in' } },
];

export const budgetRanges: Record<BudgetRange, { label: string; min: number; max: number }> = {
  budget: { label: 'Budget Build', min: 35000, max: 55000 },
  mid: { label: 'Mid-Range', min: 70000, max: 120000 },
  high: { label: 'High-End', min: 150000, max: 250000 },
  extreme: { label: 'Extreme', min: 280000, max: 450000 },
};

// Helper: find the best budget tier for a custom amount
export const getBudgetTierForAmount = (amount: number): BudgetRange => {
  if (amount <= 60000) return 'budget';
  if (amount <= 130000) return 'mid';
  if (amount <= 260000) return 'high';
  return 'extreme';
};
