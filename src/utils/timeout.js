// Runs fn(signal) and rejects after `ms` even if fn ignores the signal.
export async function withTimeout(fn, ms) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), ms);
  try {
    return await Promise.race([
      fn(ac.signal),
      new Promise((_, reject) =>
        ac.signal.addEventListener('abort', () => reject(new Error(`timeout after ${ms}ms`)))
      ),
    ]);
  } finally {
    clearTimeout(timer);
  }
}
