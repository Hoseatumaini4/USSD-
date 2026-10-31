// Stateless USSD flow. Africa's Talking sends the whole path in `text`
// ("1*2*1*3"), so no session storage is needed. First input = language.
import { crops, getCrop } from '../data/crops.js';
import { regions, getRegion } from '../data/regions.js';
import { pick } from '../utils/picker.js';
import { con, end } from '../utils/ussd.js';
import { getPrices } from './priceService.js';
import { resolveIntent } from './aiService.js';
import { LANG_PROMPT, strings } from './i18n.js';

export async function handleUssd({ text }) {
  const inputs = text ? text.split('*') : [];
  if (!inputs.length) return con(LANG_PROMPT);

  const lang = inputs[0] === '1' ? 'sw' : inputs[0] === '2' ? 'en' : null;
  if (!lang) return end('Chaguo si sahihi / Invalid choice');

  const s = strings[lang];
  const rest = inputs.slice(1);
  if (!rest.length) return con(s.main);

  switch (rest[0]) {
    case '1': return pricesFlow(lang, rest.slice(1));
    case '2': return askFlow(lang, rest.slice(1));
    case '0': return end(s.bye);
    default: return end(s.invalid);
  }
}

async function pricesFlow(lang, inputs) {
  const s = strings[lang];
  const c = pick(crops, inputs, { title: s.pickCrop, label: (x) => x[lang], next: s.next });
  if (c.status === 'prompt') return con(c.text);
  if (c.status === 'invalid') return end(s.invalid);

  const r = pick(regions, inputs.slice(c.used), { title: s.pickRegion, label: (x) => x.name, next: s.next });
  if (r.status === 'prompt') return con(r.text);
  if (r.status === 'invalid') return end(s.invalid);

  const records = await getPrices({ cropId: c.item.id, regionId: r.item.id });
  return end(formatPrices(lang, c.item, r.item, records));
}

async function askFlow(lang, inputs) {
  const s = strings[lang];
  if (!inputs.length) return con(s.askPrompt);

  const intent = await resolveIntent(inputs[0], lang);
  if (intent.intent === 'price') {
    const crop = getCrop(intent.cropId);
    const region = getRegion(intent.regionId);
    const records = await getPrices({ cropId: crop.id, regionId: region?.id ?? null });
    return end(formatPrices(lang, crop, region, records));
  }
  return end(intent.answer || s.aiFail);
}

const money = (n) => Math.round(n).toLocaleString('en-US');
const shortDate = (iso = '') => {
  const [, m, d] = iso.split('-');
  return d && m ? `${d}/${m}` : iso;
};

function formatPrices(lang, crop, region, records) {
  const s = strings[lang];
  const where = region?.name ?? 'TZ';
  if (!records.length) return s.noData(crop[lang], where);

  const demo = records.some((r) => r.source === 'mock');
  const head = `${crop[lang]} ${where}${demo ? ` (${s.demo})` : ''}`;
  const top = records.slice(0, 3);
  const lines = top.map((r) => {
    const label = region ? r.market : getRegion(r.regionId)?.name ?? r.market;
    return `${label}: ${s.cur} ${money(r.price)}/${r.unit}`;
  });
  return [head, ...lines, `${s.asOf} ${shortDate(top[0].date)}`].join('\n');
}
