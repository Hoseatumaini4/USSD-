import express from 'express';
import { config } from './config.js';
import ussdRouter from './routes/ussd.js';
import { aiEnabled } from './services/aiService.js';
import { getEnabledProviders } from './apis/index.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/ussd', ussdRouter);

app.listen(config.port, () => {
  console.log(`USSD server on :${config.port}  POST /ussd`);
  console.log(`AI: ${aiEnabled() ? config.ai.provider : 'off (keyword matching only)'}`);
  console.log(`Price providers: ${getEnabledProviders().map((p) => p.id).join(', ') || 'none!'}`);
});
