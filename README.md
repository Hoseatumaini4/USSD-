# ussd-ai-response

USSD service for checking crop prices across Tanzanian regions/markets.
Africa's Talking handles the USSD session; Gemini or OpenAI understands free-text questions.

## Run

```bash
npm install
cp .env.example .env      # add GEMINI_API_KEY or OPENAI_API_KEY, set AI_PROVIDER
npm run dev
npm run sim -- "2*1*1*1"  # simulate a dial path without Africa's Talking
```

## Connect Africa's Talking

1. Create a USSD service code in the Africa's Talking dashboard (sandbox first).
2. Expose your server publicly (ngrok, or deploy) and set the callback URL to `https://<host>/ussd`.
3. Test with the AT simulator before going live on real networks.

## Flow

```
(dial) -> language -> 1. Check prices -> crop -> region -> prices
                      2. Ask AI       -> type a question -> prices / short answer
```

- Stateless: AT sends the whole path in `text` ("2*1*1*3"), so no session store is needed.
- Replies are capped at 182 chars (`src/utils/ussd.js`).
- AI only identifies crop + region (or answers general questions briefly). **Prices come only from providers**, never from the model.
- If AI is off, slow (`AI_TIMEOUT_MS`) or errors, keyword matching takes over.

## Add a price API

See `src/apis/README.md`. Copy `src/apis/_template.js`, register it in `src/apis/index.js`, add its id to `PRICE_PROVIDERS`.

## Structure

```
src/
  index.js              Express server
  config.js             env settings
  routes/ussd.js        POST /ussd (Africa's Talking callback)
  services/
    menu.js             USSD menu flow
    aiService.js        Gemini / OpenAI + keyword fallback
    priceService.js     calls providers in parallel, caches, sorts
    i18n.js             Swahili / English strings
  apis/                 <- add price APIs here
  data/                 crops.js, regions.js
  utils/                ussd.js, picker.js, timeout.js
scripts/simulate.js
```

## Notes

- The bundled `mock` provider returns **demo data**, labelled "(demo)" in replies. Replace it with real sources before launch.
- Free-text input over USSD can behave differently per network; test on each one you target.
