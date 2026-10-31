export const LANG_PROMPT = 'Chagua lugha / Choose language\n1. Kiswahili\n2. English';

export const strings = {
  sw: {
    main: 'Bei za Mazao\n1. Angalia bei\n2. Uliza AI\n0. Toka',
    bye: 'Asante. Karibu tena.',
    invalid: 'Chaguo si sahihi. Jaribu tena.',
    pickCrop: 'Chagua zao:',
    pickRegion: 'Chagua mkoa:',
    next: 'Zaidi',
    askPrompt: 'Andika swali lako.\nMfano: bei ya mahindi Arusha',
    aiFail: 'Samahani, sijaelewa. Andika mf: bei ya nyanya Mbeya',
    noData: (c, r) => `Hakuna bei ya ${c} (${r}) kwa sasa. Jaribu mkoa mwingine.`,
    demo: 'majaribio',
    asOf: 'Tarehe',
    cur: 'Tsh',
  },
  en: {
    main: 'Crop Prices\n1. Check prices\n2. Ask AI\n0. Exit',
    bye: 'Thank you. Come again.',
    invalid: 'Invalid choice. Try again.',
    pickCrop: 'Select crop:',
    pickRegion: 'Select region:',
    next: 'More',
    askPrompt: 'Type your question.\nE.g. price of maize Arusha',
    aiFail: "Sorry, I didn't understand. Try: price of tomatoes Mbeya",
    noData: (c, r) => `No price for ${c} (${r}) right now. Try another region.`,
    demo: 'demo',
    asOf: 'As of',
    cur: 'Tsh',
  },
};
