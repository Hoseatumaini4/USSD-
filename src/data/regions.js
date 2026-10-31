// All 31 regions. Market-level detail lives inside your price providers.
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const extraAliases = {
  'dar-es-salaam': ['dar', 'dsm'],
  pwani: ['coast'],
  'unguja-mjini-magharibi': ['zanzibar'],
};

const names = [
  'Arusha', 'Dar es Salaam', 'Dodoma', 'Geita', 'Iringa', 'Kagera', 'Katavi', 'Kigoma',
  'Kilimanjaro', 'Lindi', 'Manyara', 'Mara', 'Mbeya', 'Morogoro', 'Mtwara', 'Mwanza',
  'Njombe', 'Pwani', 'Rukwa', 'Ruvuma', 'Shinyanga', 'Simiyu', 'Singida', 'Songwe',
  'Tabora', 'Tanga', 'Unguja Mjini Magharibi', 'Unguja Kaskazini', 'Unguja Kusini',
  'Pemba Kaskazini', 'Pemba Kusini',
];

export const regions = names.map((name) => {
  const id = slug(name);
  return { id, name, aliases: [name.toLowerCase(), ...(extraAliases[id] || [])] };
});

export const getRegion = (id) => regions.find((r) => r.id === id) || null;
