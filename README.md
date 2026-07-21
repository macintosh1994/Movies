# Have You Actually Seen It?

A little party game for catching people who claim they've watched a movie they haven't.

1. The app shows you a random movie.
2. You say whether you've actually seen it.
   - **No** → no penalty, just admit it and move on.
   - **Yes** → you get a trivia question about the movie. Answer correctly and you're fine. Get it wrong and you take a strike.
3. A shared leaderboard tracks everyone's strikes, correct answers, and honest admissions.

## Stack

- `backend/` — Node + Express API, SQLite (via `better-sqlite3`) for the player/leaderboard data, [TMDB](https://www.themoviedb.org/) for movie data and trivia source material.
- `frontend/` — React + Vite single-page app.

## Setup

### 1. Get a TMDB API key (free)

1. Create an account at https://www.themoviedb.org/signup
2. Go to https://www.themoviedb.org/settings/api and request a free "API Read Access" / v3 API key
3. Copy the "API Key (v3 auth)" value

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and paste your TMDB_API_KEY
npm run dev
```

The API runs on `http://localhost:3001`. `GET /api/health` reports whether a TMDB key is configured.

### 3. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the printed URL (typically `http://localhost:5173`). The dev server proxies `/api/*` to the backend.

## How trivia questions work

Each round, the backend picks one of four question types about the current movie (director, release year, cast member, genre) and generates multiple-choice options — real distractors mixed in with the correct answer. The correct answer is kept server-side (a short-lived token identifies the question) so it's never sent to the browser until after you answer.

## Data

Player names, strikes, correct answers, and admissions are stored locally in `backend/data/app.db` (SQLite, gitignored). Delete that file to reset the leaderboard.
