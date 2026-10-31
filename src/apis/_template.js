// Copy this file, rename it, and register it in ./index.js
//
// getPrices() must resolve to an array of records like:
//   { cropId: 'maize', regionId: 'arusha', market: 'Kilombero',
//     price: 1200, unit: 'kg', date: '2026-10-30' }
//
// - cropId / regionId use the ids in src/data/crops.js and src/data/regions.js
// - regionId === null means "all regions"
// - throw on failure; the aggregator catches it and uses other providers
// - honour `signal` in fetch() so slow APIs are cancelled
export default {
  id: 'my-source',
  name: 'My price source',

  async getPrices({ cropId, regionId, signal }) {
    // const res = await fetch(`https://api.example.com/prices?crop=${cropId}`, {
    //   headers: { Authorization: `Bearer ${process.env.MY_SOURCE_KEY}` },
    //   signal,
    // });
    // if (!res.ok) throw new Error(`HTTP ${res.status}`);
    // const rows = await res.json();
    // return rows.map((r) => ({
    //   cropId, regionId: toRegionId(r.region), market: r.market,
    //   price: Number(r.price_per_kg), unit: 'kg', date: r.date.slice(0, 10),
    // }));
    return [];
  },
};
