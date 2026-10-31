import { Router } from 'express';
import { handleUssd } from '../services/menu.js';

const router = Router();

// Africa's Talking POSTs form fields: sessionId, serviceCode, phoneNumber, networkCode, text
router.post('/', async (req, res) => {
  const { phoneNumber = '', text = '' } = req.body || {};
  res.type('text/plain');
  try {
    const reply = await handleUssd({ text: String(text) });
    console.log(`[ussd] ${phoneNumber.slice(0, 7)}*** text="${text}" -> ${reply.length} chars`);
    res.send(reply);
  } catch (err) {
    console.error('[ussd] error', err);
    res.send('END Hitilafu. Jaribu tena / Error. Please try again.');
  }
});

export default router;
