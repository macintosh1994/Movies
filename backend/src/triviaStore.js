import crypto from "node:crypto";

const TTL_MS = 10 * 60 * 1000;
const store = new Map();

function sweep() {
  const now = Date.now();
  for (const [token, entry] of store) {
    if (entry.expiresAt < now) store.delete(token);
  }
}

export function saveTrivia(movieId, correctAnswer) {
  sweep();
  const token = crypto.randomUUID();
  store.set(token, { movieId, correctAnswer, expiresAt: Date.now() + TTL_MS });
  return token;
}

// Consumes the token so it can only be answered once.
export function takeTrivia(token) {
  const entry = store.get(token);
  if (!entry) return null;
  store.delete(token);
  if (entry.expiresAt < Date.now()) return null;
  return entry;
}
