const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

function apiKey() {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    const err = new Error(
      "TMDB_API_KEY is not set. Add it to backend/.env (see .env.example)."
    );
    err.status = 503;
    throw err;
  }
  return key;
}

async function tmdbGet(pathname, params = {}) {
  const url = new URL(TMDB_BASE + pathname);
  url.searchParams.set("api_key", apiKey());
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url);
  if (!res.ok) {
    const err = new Error(`TMDB request failed: ${res.status} ${res.statusText}`);
    err.status = res.status === 401 ? 503 : 502;
    throw err;
  }
  return res.json();
}

export function posterUrl(posterPath, size = "w500") {
  if (!posterPath) return null;
  return `${IMAGE_BASE}/${size}${posterPath}`;
}

export function logoUrl(logoPath, size = "w92") {
  if (!logoPath) return null;
  return `${IMAGE_BASE}/${size}${logoPath}`;
}

// Pull a random, reasonably well-known movie via /discover, then fetch
// its full details (credits + watch providers) in one follow-up call.
export async function getRandomMovie() {
  const page = 1 + Math.floor(Math.random() * 100);
  const discover = await tmdbGet("/discover/movie", {
    sort_by: "popularity.desc",
    "vote_count.gte": 200,
    page,
  });

  const results = discover.results || [];
  if (results.length === 0) {
    // fall back to page 1, which is always populated
    const fallback = await tmdbGet("/discover/movie", {
      sort_by: "popularity.desc",
      "vote_count.gte": 200,
      page: 1,
    });
    return getFullMovie(fallback.results[Math.floor(Math.random() * fallback.results.length)].id);
  }

  const pick = results[Math.floor(Math.random() * results.length)];
  return getFullMovie(pick.id);
}

export async function getFullMovie(movieId) {
  const data = await tmdbGet(`/movie/${movieId}`, {
    append_to_response: "credits,watch/providers",
  });

  const director = (data.credits?.crew || []).find((c) => c.job === "Director");
  const cast = (data.credits?.cast || []).slice(0, 8).map((c) => c.name);
  const usProviders = data["watch/providers"]?.results?.US;
  const providers = [
    ...(usProviders?.flatrate || []),
    ...(usProviders?.rent || []),
    ...(usProviders?.buy || []),
  ]
    .filter((p, i, arr) => arr.findIndex((x) => x.provider_id === p.provider_id) === i)
    .slice(0, 6)
    .map((p) => ({ name: p.provider_name, logo: logoUrl(p.logo_path) }));

  return {
    id: data.id,
    title: data.title,
    overview: data.overview,
    releaseDate: data.release_date,
    releaseYear: data.release_date ? Number(data.release_date.slice(0, 4)) : null,
    poster: posterUrl(data.poster_path),
    genres: (data.genres || []).map((g) => g.name),
    director: director ? director.name : null,
    cast,
    watchProviders: providers,
    watchLink: usProviders?.link || null,
  };
}
