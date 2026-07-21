import { MOVIE_POOL } from "./moviePool.js";

const OMDB_BASE = "https://www.omdbapi.com/";

function apiKey() {
  const key = process.env.OMDB_API_KEY;
  if (!key) {
    const err = new Error(
      "OMDB_API_KEY is not set. Add it to backend/.env (see .env.example)."
    );
    err.status = 503;
    throw err;
  }
  return key;
}

async function omdbGet(params) {
  const url = new URL(OMDB_BASE);
  url.searchParams.set("apikey", apiKey());
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url);
  if (!res.ok) {
    const err = new Error(`OMDb request failed: ${res.status} ${res.statusText}`);
    err.status = res.status === 401 ? 503 : 502;
    throw err;
  }
  const data = await res.json();
  if (data.Response === "False") {
    const err = new Error(data.Error || "OMDb returned an error");
    err.status = 502;
    throw err;
  }
  return data;
}

function splitList(value) {
  if (!value || value === "N/A") return [];
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

function normalize(raw) {
  const year = parseInt(raw.Year, 10);
  return {
    id: raw.imdbID,
    title: raw.Title,
    overview: raw.Plot && raw.Plot !== "N/A" ? raw.Plot : "",
    releaseDate: raw.Released && raw.Released !== "N/A" ? raw.Released : null,
    releaseYear: Number.isFinite(year) ? year : null,
    poster: raw.Poster && raw.Poster !== "N/A" ? raw.Poster : null,
    genres: splitList(raw.Genre),
    director: raw.Director && raw.Director !== "N/A" ? raw.Director : null,
    cast: splitList(raw.Actors),
    imdbLink: `https://www.imdb.com/title/${raw.imdbID}/`,
  };
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// OMDb's title+year lookup is an exact match, so a handful of pool entries
// occasionally miss (formatting quirks, alternate titles, etc). Retry with
// different picks rather than surfacing a raw "Movie not found!" to players.
export async function getRandomMovie() {
  const candidates = shuffle(MOVIE_POOL).slice(0, 6);
  let lastErr;
  for (const pick of candidates) {
    try {
      const raw = await omdbGet({ t: pick.title, y: pick.year, type: "movie", plot: "full" });
      return normalize(raw);
    } catch (err) {
      if (err.status !== 502) throw err; // not a "not found" — a real config/network error
      lastErr = err;
    }
  }
  const err = new Error("Couldn't find a movie to show you just now — try again.");
  err.status = 502;
  err.cause = lastErr;
  throw err;
}

export async function getFullMovie(imdbId) {
  const raw = await omdbGet({ i: imdbId, plot: "full" });
  return normalize(raw);
}
