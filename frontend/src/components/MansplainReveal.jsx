export default function MansplainReveal({ movie, onNext, loading, variant = "confessed" }) {
  const busted = variant === "busted";

  return (
    <div className="card mansplain" data-tag={busted ? "Perjury" : "Confession"}>
      <div className={"stamp " + (busted ? "perjury" : "logged")}>
        {busted ? "Perjury Confirmed" : "Confession Logged"}
      </div>
      <h3>
        {busted ? (
          <>Caught you — you haven't seen {movie.title}.</>
        ) : (
          <>You haven't seen {movie.title}??</>
        )}
      </h3>
      <p>{movie.mansplainSummary || movie.overview}</p>
      <button className="btn-primary" onClick={onNext} disabled={loading}>
        {loading ? "Finding a movie..." : "Get another movie"}
      </button>
    </div>
  );
}
