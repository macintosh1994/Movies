import { useCountdown, Timer } from "../useCountdown.jsx";

const DECISION_SECONDS = 15;

export default function WatchedPrompt({ onYes, onNo, loading }) {
  const remaining = useCountdown(DECISION_SECONDS, onNo, !loading);

  return (
    <div className="card" data-tag="Testimony">
      <h3>Have you actually seen this?</h3>
      <Timer label="Decide" remaining={remaining} total={DECISION_SECONDS} />
      <div className="button-row">
        <button className="btn-primary" onClick={onYes} disabled={loading}>
          Yes, I've seen it
        </button>
        <button className="btn-secondary" onClick={onNo} disabled={loading}>
          No, I haven't
        </button>
      </div>
    </div>
  );
}
