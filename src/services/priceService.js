import { config } from '../config.js';
import { getEnabledProviders } from '../apis/index.js';
import { withTimeout } from '../utils/timeout.js';

const cache = new Map();

export async function getPrices({ cropId, regionId = null }) {
  const key = `${cropId}:${regionId || '*'}`;
  const hit = cache.get(key);
  if (hit && hit.expires > Date.now()) return hit.records;

  const providers = getEnabledProviders();
  const results = await Promise.allSettled(
    providers.map((p) =>
      withTimeout((signal) => p.getPrices({ cropId, regionId, signal }), config.prices.providerTimeoutMs)
    )
  );

  const records = [];
  results.forEach((res, i) => {
    const id = providers[i].id;
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      for (const r of res.value) {
        if (Number.isFinite(r.price)) records.push({ source: id, ...r });
      }
    } else {
      console.error(`[provider:${id}]`, res.reason?.message || 'bad response');
    }
  });

  // newest first, then highest price first
  records.sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.price - a.price);

  if (records.length) cache.set(key, { records, expires: Date.now() + config.prices.cacheTtlMs });
  return records;
}
