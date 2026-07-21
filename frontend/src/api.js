async function request(path, options) {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return data;
}

export const api = {
  listPlayers: () => request("/players"),
  createPlayer: (name) =>
    request("/players", { method: "POST", body: JSON.stringify({ name }) }),
  randomMovie: () => request("/movie/random"),
  getTrivia: (movieId) => request(`/movie/${movieId}/trivia`),
  answerTrivia: (movieId, { token, answer, playerId, movieTitle }) =>
    request(`/movie/${movieId}/trivia/answer`, {
      method: "POST",
      body: JSON.stringify({ token, answer, playerId, movieTitle }),
    }),
  admitNotWatched: (movieId, { playerId, movieTitle }) =>
    request(`/movie/${movieId}/admit`, {
      method: "POST",
      body: JSON.stringify({ playerId, movieTitle }),
    }),
};
