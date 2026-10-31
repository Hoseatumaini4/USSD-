// Add crops here. `id` is what price providers receive.
export const crops = [
  { id: 'maize', sw: 'Mahindi', en: 'Maize', aliases: ['mahindi', 'maize', 'corn'] },
  { id: 'rice', sw: 'Mchele', en: 'Rice', aliases: ['mchele', 'mpunga', 'rice', 'paddy'] },
  { id: 'beans', sw: 'Maharage', en: 'Beans', aliases: ['maharage', 'beans', 'haragwe'] },
  { id: 'tomato', sw: 'Nyanya', en: 'Tomatoes', aliases: ['nyanya', 'tomato', 'tomatoes'] },
  { id: 'onion', sw: 'Vitunguu', en: 'Onions', aliases: ['vitunguu', 'kitunguu', 'onion', 'onions'] },
  { id: 'potato', sw: 'Viazi mviringo', en: 'Irish potatoes', aliases: ['viazi', 'potato', 'potatoes'] },
  { id: 'banana', sw: 'Ndizi', en: 'Bananas', aliases: ['ndizi', 'banana', 'bananas'] },
  { id: 'sunflower', sw: 'Alizeti', en: 'Sunflower', aliases: ['alizeti', 'sunflower'] },
  { id: 'cassava', sw: 'Muhogo', en: 'Cassava', aliases: ['muhogo', 'cassava'] },
  { id: 'sorghum', sw: 'Mtama', en: 'Sorghum', aliases: ['mtama', 'sorghum'] },
];

export const getCrop = (id) => crops.find((c) => c.id === id) || null;
