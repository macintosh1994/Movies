import crypto from "node:crypto";
import { query } from "./db.js";

const TTL_MS = 10 * 60 * 1000;

// Stored in Postgres rather than in-memory: serverless invocations don't
// share process memory, so the token written by GET /trivia must still be
// readable by the later POST /trivia/answer even if it lands on a
// different function instance.
export async function saveTrivia(movieId, correctAnswer) {
  await query(`DELETE FROM trivia_tokens WHERE expires_at < now()`);
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + TTL_MS);
  await query(
    `INSERT INTO trivia_tokens (token, movie_id, correct_answer, expires_at) VALUES ($1, $2, $3, $4)`,
    [token, String(movieId), correctAnswer, expiresAt]
  );
  return token;
}

// Consumes the token atomically so it can only be answered once.
export async function takeTrivia(token) {
  if (!token) return null;
  const result = await query(
    `DELETE FROM trivia_tokens WHERE token = $1 AND expires_at > now() RETURNING movie_id, correct_answer`,
    [token]
  );
  const row = result.rows[0];
  if (!row) return null;
  return { movieId: row.movie_id, correctAnswer: row.correct_answer };
}
