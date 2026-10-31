# Price APIs

Each file here is one price source. The aggregator (`../services/priceService.js`)
calls every provider listed in `PRICE_PROVIDERS` in parallel, merges the results,
caches them, and the USSD menu shows the top few.

Add a source:
1. `cp _template.js myApi.js` and implement `getPrices()`
2. Register it in `index.js`
3. Put its id in `.env` → `PRICE_PROVIDERS=myApi,mock`

Record shape: `{ cropId, regionId, market, price, unit, date }` (price in TZS).
