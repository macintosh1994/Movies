# Have You Actually Seen It?

A little party game for catching people who claim they've watched a movie they haven't.

1. The app shows you a random movie.
2. You say whether you've actually seen it.
   - **No** → no penalty, just admit it and move on.
   - **Yes** → you get a trivia question about the movie. Answer correctly and you're fine. Get it wrong and you take a strike.
3. A shared leaderboard tracks everyone's strikes, correct answers, and honest admissions.

## Stack

- `backend/` — Node + Express API, SQLite (via `better-sqlite3`) for the player/leaderboard data, [OMDb](https://www.omdbapi.com/) for movie data and trivia source material.
- `frontend/` — React + Vite single-page app.

## Setup

### 1. Get an OMDb API key (free)

1. Go to https://www.omdbapi.com/apikey.aspx, pick the free tier, and submit your email
2. OMDb emails you a key immediately, plus an activation link — click that link before using the key
3. Copy the key

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and paste your OMDB_API_KEY
npm run dev
```

The API runs on `http://localhost:3001`. `GET /api/health` reports whether an OMDb key is configured.

### 3. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the printed URL (typically `http://localhost:5173`). The dev server proxies `/api/*` to the backend.

## Where movies come from

OMDb doesn't have a "discover a random movie" endpoint — you can only look up a specific title. So `backend/src/moviePool.js` keeps a curated list of ~150 well-known movies; "give me a movie" picks one at random from that list and fetches its live data (poster, plot, cast, director, genres) from OMDb. Edit that file to add or remove titles.

## How trivia questions work

Each round, the backend picks one of four question types about the current movie (director, release year, cast member, genre) and generates multiple-choice options — real distractors mixed in with the correct answer. The correct answer is kept server-side (a short-lived token identifies the question) so it's never sent to the browser until after you answer.

## Data

Player names, strikes, correct answers, and admissions are stored locally in `backend/data/app.db` (SQLite, gitignored). Delete that file to reset the leaderboard.
