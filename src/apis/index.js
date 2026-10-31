// Registry of price providers. To add a new API:
//   1. copy _template.js to a new file and fill in getPrices()
//   2. import it here and add it to `allProviders`
//   3. add its id to PRICE_PROVIDERS in .env
import { config } from '../config.js';
import mock from './mockPrices.js';
// import myApi from './myApi.js';

export const allProviders = [mock /*, myApi */];

export const getEnabledProviders = () =>
  allProviders.filter((p) => config.prices.providers.includes(p.id));
