# Have You Actually Seen It?

A little party game for catching people who claim they've watched a movie they haven't.

1. The app shows you a random movie.
2. You say whether you've actually seen it.
   - **No** → no penalty, just admit it and move on.
   - **Yes** → you get a trivia question about the movie. Answer correctly and you're fine. Get it wrong and you take a strike.
3. A shared leaderboard tracks everyone's strikes, correct answers, and honest admissions.

## Stack

- `backend/` — Node + Express API, Postgres (via `pg`) for the player/leaderboard data, [OMDb](https://www.omdbapi.com/) for movie data and trivia source material.
- `frontend/` — React + Vite single-page app.
- `api/index.js` + root `package.json`/`vercel.json` — wraps the same Express app as a single Vercel serverless function, so the whole thing deploys as one Vercel project (static frontend + `/api/*` functions, same origin, no CORS juggling).

## Local setup

### 1. Get an OMDb API key (free)

1. Go to https://www.omdbapi.com/apikey.aspx, pick the free tier, and submit your email
2. OMDb emails you a key immediately, plus an activation link — click that link before using the key
3. Copy the key

### 2. Get a Postgres database

Any Postgres connection string works. Easiest options:
- **Vercel Postgres** (recommended if you're deploying there anyway) — see the deploy section below; you can reuse the same connection string locally.
- **Neon** (https://neon.tech) — free tier, works standalone too.
- A local Postgres install, or `docker run -e POSTGRES_PASSWORD=devpass -p 5432:5432 postgres:16`.

Tables (`players`, `rounds`, `trivia_tokens`) are created automatically on first request — no migration step needed.

### 3. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: paste OMDB_API_KEY and POSTGRES_URL
npm run dev
```

The API runs on `http://localhost:3001`. `GET /api/health` reports whether the OMDb key and database are configured.

### 4. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the printed URL (typically `http://localhost:5173`). The dev server proxies `/api/*` to the backend.

## Deploying to Vercel

This repo is already set up to deploy as a single Vercel project (static frontend + `/api/*` serverless functions). Steps to do in the Vercel dashboard:

1. **Import the repo**: New Project → import `macintosh1994/movies` → pick the branch you want deployed (e.g. `claude/hello-6y9ha6`, or `main` once merged).
   - Leave **Root Directory** as the repo root (don't point it at `frontend/`).
   - Vercel should auto-detect `vercel.json`, which sets the build command, output directory (`frontend/dist`), and the `/api/*` rewrite for you.
2. **Add a Postgres database**: in the project, go to **Storage → Create Database → Postgres** (or connect an existing Neon/Postgres database). Connecting it via the dashboard auto-injects `POSTGRES_URL` into your project's environment variables — no copy-pasting needed.
3. **Add your OMDb key**: **Settings → Environment Variables** → add `OMDB_API_KEY` with the value from omdbapi.com, for Production (and Preview, if you want preview deploys to work too).
4. **Deploy**: trigger a deploy (pushing to the connected branch triggers one automatically, or hit **Deploy** in the dashboard).
5. Once it's live, hit `https://<your-project>.vercel.app/api/health` — it should report `{"ok":true,"omdbConfigured":true,"dbConfigured":true}`. If either is `false`, double check the environment variables landed on the right environment (Production vs Preview) and redeploy.

## Where movies come from

OMDb doesn't have a "discover a random movie" endpoint — you can only look up a specific title. So `backend/src/moviePool.js` keeps a curated list of ~150 well-known movies; "give me a movie" picks one at random from that list and fetches its live data (poster, plot, cast, director, genres) from OMDb. Edit that file to add or remove titles.

## How trivia questions work

Each round, the backend picks one of four question types about the current movie (director, release year, cast member, genre) and generates multiple-choice options — real distractors mixed in with the correct answer. The correct answer is kept server-side (a short-lived token identifies the question) so it's never sent to the browser until after you answer.

## Data

Player names, strikes, correct answers, and admissions are stored in Postgres. Trivia answer tokens (used to validate answers server-side without ever sending the correct choice to the browser) live in the `trivia_tokens` table with a 10-minute expiry, rather than in server memory — this matters on Vercel specifically, since serverless function instances don't share memory between invocations, so an in-memory store would randomly fail to find tokens written by a different instance. To reset the leaderboard, truncate the `players` and `rounds` tables.
