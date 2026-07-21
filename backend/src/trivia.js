const GENRES = [
  "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
  "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery",
  "Romance", "Science Fiction", "Thriller", "War", "Western",
];

const DIRECTOR_POOL = [
  "Steven Spielberg", "Martin Scorsese", "Christopher Nolan", "Quentin Tarantino",
  "James Cameron", "Ridley Scott", "David Fincher", "Peter Jackson",
  "Denis Villeneuve", "Greta Gerwig", "Wes Anderson", "Guillermo del Toro",
  "Alfonso Cuaron", "Bong Joon Ho", "Kathryn Bigelow", "Sofia Coppola",
  "Coen Brothers", "Francis Ford Coppola", "Stanley Kubrick", "Tim Burton",
  "Ron Howard", "Michael Bay", "Taika Waititi", "Jordan Peele",
  "Edgar Wright", "Paul Thomas Anderson", "Spike Lee", "Ang Lee",
];

const ACTOR_POOL = [
  "Tom Hanks", "Meryl Streep", "Leonardo DiCaprio", "Denzel Washington",
  "Scarlett Johansson", "Brad Pitt", "Jennifer Lawrence", "Robert Downey Jr.",
  "Emma Stone", "Will Smith", "Natalie Portman", "Morgan Freeman",
  "Charlize Theron", "Ryan Gosling", "Viola Davis", "Samuel L. Jackson",
  "Cate Blanchett", "Matt Damon", "Anne Hathaway", "Christian Bale",
  "Margot Robbie", "Idris Elba", "Zendaya", "Timothee Chalamet",
  "Saoirse Ronan", "Michael B. Jordan", "Florence Pugh", "Keanu Reeves",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleExcluding(pool, excludeSet, count) {
  const candidates = pool.filter((item) => !excludeSet.has(item));
  return shuffle(candidates).slice(0, count);
}

function buildDirectorQuestion(movie) {
  if (!movie.director) return null;
  const distractors = sampleExcluding(DIRECTOR_POOL, new Set([movie.director]), 3);
  if (distractors.length < 3) return null;
  return {
    question: `Who directed "${movie.title}"?`,
    correctAnswer: movie.director,
    choices: shuffle([movie.director, ...distractors]),
  };
}

function buildYearQuestion(movie) {
  if (!movie.releaseYear) return null;
  const offsets = shuffle([-6, -4, -3, -2, -1, 1, 2, 3, 4, 6]).slice(0, 3);
  const distractors = offsets.map((o) => String(movie.releaseYear + o));
  return {
    question: `What year was "${movie.title}" released?`,
    correctAnswer: String(movie.releaseYear),
    choices: shuffle([String(movie.releaseYear), ...distractors]),
  };
}

function buildCastQuestion(movie) {
  if (!movie.cast || movie.cast.length === 0) return null;
  const correct = movie.cast[Math.floor(Math.random() * Math.min(5, movie.cast.length))];
  const excludeSet = new Set(movie.cast);
  const distractors = sampleExcluding(ACTOR_POOL, excludeSet, 3);
  if (distractors.length < 3) return null;
  return {
    question: `Which of these actors is actually in "${movie.title}"?`,
    correctAnswer: correct,
    choices: shuffle([correct, ...distractors]),
  };
}

function buildGenreQuestion(movie) {
  if (!movie.genres || movie.genres.length === 0) return null;
  const correct = movie.genres[Math.floor(Math.random() * movie.genres.length)];
  const excludeSet = new Set(movie.genres);
  const distractors = sampleExcluding(GENRES, excludeSet, 3);
  if (distractors.length < 3) return null;
  return {
    question: `Which genre applies to "${movie.title}"?`,
    correctAnswer: correct,
    choices: shuffle([correct, ...distractors]),
  };
}

// Returns { question, choices, correctAnswer } — caller is responsible for
// keeping correctAnswer server-side and never sending it to the client.
export function generateTrivia(movie) {
  const builders = shuffle([
    buildDirectorQuestion,
    buildYearQuestion,
    buildCastQuestion,
    buildGenreQuestion,
  ]);

  for (const build of builders) {
    const result = build(movie);
    if (result) return result;
  }

  return null;
}
