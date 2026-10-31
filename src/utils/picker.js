// Paged numbered menu that works with Africa's Talking's cumulative `text`
// (e.g. "2*1*0*3"). "0" = next page while more pages exist.
export function pick(items, inputs, { title, label, next, pageSize = 5 }) {
  const pages = Math.ceil(items.length / pageSize);
  const slice = (p) => items.slice(p * pageSize, (p + 1) * pageSize);
  const render = (p) =>
    [title, ...slice(p).map((it, i) => `${i + 1}. ${label(it)}`), ...(p < pages - 1 ? [`0. ${next}`] : [])].join('\n');

  let page = 0;
  let i = 0;
  while (true) {
    if (i >= inputs.length) return { status: 'prompt', text: render(page) };
    const v = inputs[i].trim();
    if (v === '0' && page < pages - 1) {
      page++;
      i++;
      continue;
    }
    const n = Number(v);
    const current = slice(page);
    if (Number.isInteger(n) && n >= 1 && n <= current.length) {
      return { status: 'chosen', item: current[n - 1], used: i + 1 };
    }
    return { status: 'invalid' };
  }
}
