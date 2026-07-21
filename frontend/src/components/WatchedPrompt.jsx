export default function WatchedPrompt({ onYes, onNo, loading }) {
  return (
    <div className="card">
      <h3>Have you actually seen this?</h3>
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
