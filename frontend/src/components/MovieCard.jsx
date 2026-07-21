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
          {movie.imdbLink && (
            <p>
              <a className="imdb-link" href={movie.imdbLink} target="_blank" rel="noreferrer">
                View on IMDb
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
