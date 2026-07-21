import { useState } from "react";
import { api } from "../api.js";

export default function PlayerGate({ onPlayerSet }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    try {
      const player = await api.createPlayer(name.trim());
      onPlayerSet(player);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card player-gate">
      <h2>Who's playing?</h2>
      <p className="muted">Enter your name to start racking up (or avoiding) strikes.</p>
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={40}
        />
        <button type="submit" disabled={loading || !name.trim()}>
          {loading ? "..." : "Let's go"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
