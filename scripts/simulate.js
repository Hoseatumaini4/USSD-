// Usage: node scripts/simulate.js "2*2*maize Arusha"   (text is the Africa's Talking path)
const text = process.argv[2] ?? '';
const url = process.env.URL || 'http://localhost:3000/ussd';
const res = await fetch(url, {
  method: 'POST',
  body: new URLSearchParams({
    sessionId: 'sim-1',
    serviceCode: '*384*123#',
    phoneNumber: '+255700000000',
    networkCode: '640',
    text,
  }),
});
console.log(await res.text());
