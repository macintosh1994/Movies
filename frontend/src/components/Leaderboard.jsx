import { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Leaderboard({ refreshKey }) {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .listPlayers()
      .then(setPlayers)
      .catch((err) => setError(err.message));
  }, [refreshKey]);

  return (
    <div className="card leaderboard" data-tag="Case Registry">
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      {players.length === 0 ? (
        <p className="muted">No players yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Strikes</th>
              <th>Correct</th>
              <th>Admitted</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td className={p.strikes > 0 ? "error" : ""}>{p.strikes}</td>
                <td>{p.correctCount}</td>
                <td>{p.admittedCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
