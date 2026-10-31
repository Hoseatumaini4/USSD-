// DEMO DATA ONLY. Deterministic fake prices so you can test the USSD flow
// before a real API is connected. The bot labels these answers "(demo)".
import { regions } from '../data/regions.js';

const BASE = {
  maize: 900, rice: 2600, beans: 2800, tomato: 1500, onion: 1800,
  potato: 1200, banana: 900, sunflower: 1300, cassava: 700, sorghum: 1000,
};

const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

export default {
  id: 'mock',
  name: 'Demo prices',

  async getPrices({ cropId, regionId }) {
    const base = BASE[cropId];
    if (!base) return [];
    const date = new Date().toISOString().slice(0, 10);
    const list = regionId ? regions.filter((r) => r.id === regionId) : regions;
    return list.flatMap((r) =>
      ['Soko Kuu', 'Soko la Mazao'].map((market) => {
        const factor = 0.85 + (hash(`${cropId}${r.id}${market}`) % 30) / 100;
        return {
          cropId, regionId: r.id, market,
          price: Math.round((base * factor) / 50) * 50,
          unit: 'kg', date,
        };
      })
    );
  },
};
