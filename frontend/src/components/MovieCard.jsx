export default function MovieCard({ movie, revealPlot }) {
  return (
    <div className="card movie-card" data-tag="Exhibit A">
      <div className="movie-card-body">
        {movie.poster && <img className="poster" src={movie.poster} alt={movie.title} />}
        <div>
          <h2>
            {movie.title}{" "}
            {movie.releaseYear && <span className="muted">({movie.releaseYear})</span>}
          </h2>
          {movie.genres?.length > 0 && (
            <div className="genre-row">
              {movie.genres.map((g) => (
                <span key={g} className="genre-chip">
                  {g}
                </span>
              ))}
            </div>
          )}
          {revealPlot && (
            <>
              <p className="overview">{movie.overview}</p>
              {movie.imdbLink && (
                <p>
                  <a className="imdb-link" href={movie.imdbLink} target="_blank" rel="noreferrer">
                    View on IMDb
                  </a>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
