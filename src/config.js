import 'dotenv/config';

const num = (v, d) => {
  if (v === undefined || v === '') return d;
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};

export const config = {
  port: num(process.env.PORT, 3000),
  ai: {
    provider: (process.env.AI_PROVIDER || 'none').toLowerCase(),
    timeoutMs: num(process.env.AI_TIMEOUT_MS, 3500),
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    },
  },
  prices: {
    providers: (process.env.PRICE_PROVIDERS || 'mock')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    providerTimeoutMs: num(process.env.PROVIDER_TIMEOUT_MS, 3000),
    cacheTtlMs: num(process.env.CACHE_TTL_SECONDS, 600) * 1000,
  },
};
