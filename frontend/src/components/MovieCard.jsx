export default function MovieCard({ movie }) {
  return (
    <div className="card movie-card">
      <div className="movie-card-body">
        {movie.poster && <img className="poster" src={movie.poster} alt={movie.title} />}
        <div>
          <h2>
            {movie.title}{" "}
            {movie.releaseYear && <span className="muted">({movie.releaseYear})</span>}
          </h2>
          {movie.genres?.length > 0 && <p className="genres">{movie.genres.join(" · ")}</p>}
          <p>{movie.overview}</p>
          {movie.watchProviders?.length > 0 && (
            <div className="providers">
              <span className="muted">Watch on: </span>
              {movie.watchProviders.map((p) => (
                <span key={p.name} className="provider-badge">
                  {p.logo && <img src={p.logo} alt={p.name} title={p.name} />}
                  {!p.logo && p.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
