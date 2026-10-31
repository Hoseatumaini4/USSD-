// Africa's Talking: reply must start with CON (continue) or END (finish),
// and the whole string should stay within 182 characters.
export const MAX_LEN = 182;

function fit(text) {
  if (text.length <= MAX_LEN) return text;
  const lines = text.split('\n');
  while (lines.length > 2 && lines.join('\n').length > MAX_LEN) lines.pop();
  return lines.join('\n').slice(0, MAX_LEN);
}

export const con = (text) => fit(`CON ${text}`);
export const end = (text) => fit(`END ${text}`);
