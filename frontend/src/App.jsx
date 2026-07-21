import { useEffect, useState } from "react";
import { api } from "./api.js";
import PlayerGate from "./components/PlayerGate.jsx";
import MovieCard from "./components/MovieCard.jsx";
import WatchedPrompt from "./components/WatchedPrompt.jsx";
import TriviaQuestion from "./components/TriviaQuestion.jsx";
import MansplainReveal from "./components/MansplainReveal.jsx";
import Leaderboard from "./components/Leaderboard.jsx";

const PHASE = {
  IDLE: "idle",
  MOVIE: "movie",
  TRIVIA: "trivia",
  ADMITTED: "admitted",
  BUSTED: "busted",
};

export default function App() {
  const [player, setPlayer] = useState(null);
  const [view, setView] = useState("play");
  const [phase, setPhase] = useState(PHASE.IDLE);
  const [movie, setMovie] = useState(null);
  const [trivia, setTrivia] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    if (savedName) {
      api
        .createPlayer(savedName)
        .then(setPlayer)
        .catch(() => localStorage.removeItem("playerName"));
    }
  }, []);

  function handlePlayerSet(p) {
    localStorage.setItem("playerName", p.name);
    setPlayer(p);
  }

  async function refreshPlayer() {
    try {
      const fresh = await api.createPlayer(player.name);
      setPlayer(fresh);
    } catch {
      // leaderboard/header will just show slightly stale counts until next refresh
    }
  }

  async function fetchMovie() {
    setLoading(true);
    setError("");
    setTrivia(null);
    try {
      const m = await api.randomMovie();
      setMovie(m);
      setPhase(PHASE.MOVIE);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdmit() {
    setLoading(true);
    setError("");
    try {
      await api.admitNotWatched(movie.id, { playerId: player.id, movieTitle: movie.title });
      setPhase(PHASE.ADMITTED);
      setRefreshKey((k) => k + 1);
      refreshPlayer();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleWatched() {
    setLoading(true);
    setError("");
    try {
      const t = await api.getTrivia(movie.id);
      setTrivia(t);
      setPhase(PHASE.TRIVIA);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleTriviaResolved(result) {
    setRefreshKey((k) => k + 1);
    refreshPlayer();
    if (result.correct) {
      fetchMovie();
    } else {
      setPhase(PHASE.BUSTED);
    }
  }

  if (!player) {
    return (
      <div className="app">
        <header className="app-header">
          <div className="eyebrow">Case Files · Confessions Unit</div>
          <h1>Have You Actually Seen It?</h1>
        </header>
        <PlayerGate onPlayerSet={handlePlayerSet} />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="eyebrow">Case Files · Confessions Unit</div>
        <h1>Have You Actually Seen It?</h1>
        <div className="stats-bar">
          <span>
            <b>{player.strikes}</b>strikes
          </span>
          <span>
            <b>{player.correctCount}</b>verified
          </span>
          <span>
            <b>{player.admittedCount}</b>confessed
          </span>
        </div>
        <div className="header-right">
          <span className="muted">Playing as {player.name}</span>
          <nav>
            <button className={view === "play" ? "active" : ""} onClick={() => setView("play")}>
              Play
            </button>
            <button
              className={view === "leaderboard" ? "active" : ""}
              onClick={() => setView("leaderboard")}
            >
              Leaderboard
            </button>
          </nav>
        </div>
      </header>

      {view === "leaderboard" ? (
        <Leaderboard refreshKey={refreshKey} />
      ) : (
        <main>
          {phase === PHASE.IDLE && (
            <div className="card center" data-tag="Standing By">
              <p>Ready to find out what you've actually watched?</p>
              <button className="btn-primary" onClick={fetchMovie} disabled={loading}>
                {loading ? "Finding a movie..." : "Give me a movie"}
              </button>
            </div>
          )}

          {movie && phase !== PHASE.IDLE && (
            <MovieCard movie={movie} />
          )}

          {phase === PHASE.MOVIE && (
            <WatchedPrompt onYes={handleWatched} onNo={handleAdmit} loading={loading} />
          )}

          {phase === PHASE.TRIVIA && trivia && (
            <TriviaQuestion
              movie={movie}
              trivia={trivia}
              playerId={player.id}
              onResolved={handleTriviaResolved}
            />
          )}

          {(phase === PHASE.ADMITTED || phase === PHASE.BUSTED) && movie && (
            <MansplainReveal
              movie={movie}
              variant={phase === PHASE.BUSTED ? "busted" : "confessed"}
              onNext={fetchMovie}
              loading={loading}
            />
          )}

          {error && <p className="error">{error}</p>}
        </main>
      )}
    </div>
  );
}
