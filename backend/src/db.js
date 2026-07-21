import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

function getPool() {
  if (!connectionString) {
    const err = new Error(
      "No database connection string set. Add POSTGRES_URL (or DATABASE_URL) to backend/.env, or connect a Postgres database to this project on Vercel."
    );
    err.status = 503;
    throw err;
  }
  // Cache the pool on globalThis so serverless warm invocations and
  // dev's --watch reloads reuse one pool instead of leaking connections.
  if (!globalThis.__moviesPgPool) {
    globalThis.__moviesPgPool = new Pool({ connectionString });
  }
  return globalThis.__moviesPgPool;
}

let schemaReady = null;

function ensureSchema() {
  if (!schemaReady) {
    schemaReady = getPool().query(`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        correct_count INTEGER NOT NULL DEFAULT 0,
        strikes INTEGER NOT NULL DEFAULT 0,
        admitted_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS rounds (
        id SERIAL PRIMARY KEY,
        player_id INTEGER NOT NULL REFERENCES players(id),
        movie_id TEXT NOT NULL,
        movie_title TEXT NOT NULL,
        result TEXT NOT NULL CHECK (result IN ('correct', 'incorrect', 'admitted')),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS trivia_tokens (
        token TEXT PRIMARY KEY,
        movie_id TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL
      );
    `);
  }
  return schemaReady;
}

export async function query(text, params) {
  await ensureSchema();
  return getPool().query(text, params);
}

export async function withTransaction(fn) {
  await ensureSchema();
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
