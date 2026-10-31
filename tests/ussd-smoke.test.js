import test from 'node:test';
import assert from 'node:assert/strict';

import { config } from '../src/config.js';
import { handleUssd } from '../src/services/menu.js';
import { resolveIntent } from '../src/services/aiService.js';

const originalProvider = config.ai.provider;
const originalTimeout = config.ai.timeoutMs;

test.after(() => {
  config.ai.provider = originalProvider;
  config.ai.timeoutMs = originalTimeout;
});

test('handleUssd returns a valid price response for the mocked flow', async () => {
  const reply = await handleUssd({ text: '2*1*1*1' });
  assert.match(reply, /^END /);
  assert.match(reply, /Maize Arusha/i);
  assert.match(reply, /Soko/i);
  assert.match(reply, /Tsh/i);
});

test('keyword matching resolves crop and region without AI', async () => {
  config.ai.provider = 'none';
  config.ai.timeoutMs = 1;

  const intent = await resolveIntent('price of maize Arusha', 'en');
  assert.equal(intent.intent, 'price');
  assert.equal(intent.cropId, 'maize');
  assert.equal(intent.regionId, 'arusha');
});
