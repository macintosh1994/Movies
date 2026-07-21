import { Router } from "express";
import { db } from "../db.js";
import { getRandomMovie, getFullMovie } from "../omdb.js";
import { generateTrivia } from "../trivia.js";
import { saveTrivia, takeTrivia } from "../triviaStore.js";

export const moviesRouter = Router();

const getPlayerStmt = db.prepare(`SELECT * FROM players WHERE id = ?`);
const insertRoundStmt = db.prepare(
  `INSERT INTO rounds (player_id, movie_id, movie_title, result) VALUES (?, ?, ?, ?)`
);
const bumpCorrectStmt = db.prepare(
  `UPDATE players SET correct_count = correct_count + 1 WHERE id = ?`
);
const bumpStrikeStmt = db.prepare(
  `UPDATE players SET strikes = strikes + 1 WHERE id = ?`
);
const bumpAdmittedStmt = db.prepare(
  `UPDATE players SET admitted_count = admitted_count + 1 WHERE id = ?`
);

function requirePlayer(req, res) {
  const playerId = Number(req.body?.playerId);
  const player = playerId ? getPlayerStmt.get(playerId) : null;
  if (!player) {
    res.status(400).json({ error: "valid playerId is required" });
    return null;
  }
  return player;
}

moviesRouter.get("/random", async (req, res, next) => {
  try {
    const movie = await getRandomMovie();
    res.json(movie);
  } catch (err) {
    next(err);
  }
});

moviesRouter.get("/:id/trivia", async (req, res, next) => {
  try {
    const movie = await getFullMovie(req.params.id);
    const trivia = generateTrivia(movie);
    if (!trivia) {
      return res.status(422).json({ error: "Could not generate a trivia question for this movie." });
    }
    const token = saveTrivia(movie.id, trivia.correctAnswer);
    res.json({ token, question: trivia.question, choices: trivia.choices, movieTitle: movie.title });
  } catch (err) {
    next(err);
  }
});

moviesRouter.post("/:id/trivia/answer", (req, res) => {
  const player = requirePlayer(req, res);
  if (!player) return;

  const { token, answer, movieTitle } = req.body || {};
  const entry = takeTrivia(token);
  if (!entry) {
    return res.status(410).json({ error: "This question has expired. Get a new movie and try again." });
  }

  const correct = entry.correctAnswer === answer;
  const result = correct ? "correct" : "incorrect";

  const tx = db.transaction(() => {
    insertRoundStmt.run(player.id, entry.movieId, movieTitle || String(entry.movieId), result);
    if (correct) {
      bumpCorrectStmt.run(player.id);
    } else {
      bumpStrikeStmt.run(player.id);
    }
  });
  tx();

  res.json({ correct, correctAnswer: entry.correctAnswer });
});

moviesRouter.post("/:id/admit", (req, res) => {
  const player = requirePlayer(req, res);
  if (!player) return;

  const movieId = req.params.id;
  const movieTitle = req.body?.movieTitle || movieId;

  const tx = db.transaction(() => {
    insertRoundStmt.run(player.id, movieId, movieTitle, "admitted");
    bumpAdmittedStmt.run(player.id);
  });
  tx();

  res.json({ ok: true });
});
