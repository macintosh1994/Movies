import { Router } from "express";
import { query, withTransaction } from "../db.js";
import { getRandomMovie, getFullMovie } from "../omdb.js";
import { generateTrivia } from "../trivia.js";
import { saveTrivia, takeTrivia } from "../triviaStore.js";

export const moviesRouter = Router();

async function requirePlayer(req, res) {
  const playerId = Number(req.body?.playerId);
  if (!playerId) {
    res.status(400).json({ error: "valid playerId is required" });
    return null;
  }
  const result = await query(`SELECT * FROM players WHERE id = $1`, [playerId]);
  const player = result.rows[0];
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
    const token = await saveTrivia(movie.id, trivia.correctAnswer);
    res.json({ token, question: trivia.question, choices: trivia.choices, movieTitle: movie.title });
  } catch (err) {
    next(err);
  }
});

moviesRouter.post("/:id/trivia/answer", async (req, res, next) => {
  try {
    const player = await requirePlayer(req, res);
    if (!player) return;

    const { token, answer, movieTitle } = req.body || {};
    const entry = await takeTrivia(token);
    if (!entry) {
      return res.status(410).json({ error: "This question has expired. Get a new movie and try again." });
    }

    const correct = entry.correctAnswer === answer;
    const result = correct ? "correct" : "incorrect";
    const counterColumn = correct ? "correct_count" : "strikes";

    await withTransaction(async (client) => {
      await client.query(
        `INSERT INTO rounds (player_id, movie_id, movie_title, result) VALUES ($1, $2, $3, $4)`,
        [player.id, entry.movieId, movieTitle || entry.movieId, result]
      );
      await client.query(
        `UPDATE players SET ${counterColumn} = ${counterColumn} + 1 WHERE id = $1`,
        [player.id]
      );
    });

    res.json({ correct, correctAnswer: entry.correctAnswer });
  } catch (err) {
    next(err);
  }
});

moviesRouter.post("/:id/admit", async (req, res, next) => {
  try {
    const player = await requirePlayer(req, res);
    if (!player) return;

    const movieId = req.params.id;
    const movieTitle = req.body?.movieTitle || movieId;

    await withTransaction(async (client) => {
      await client.query(
        `INSERT INTO rounds (player_id, movie_id, movie_title, result) VALUES ($1, $2, $3, 'admitted')`,
        [player.id, movieId, movieTitle]
      );
      await client.query(`UPDATE players SET admitted_count = admitted_count + 1 WHERE id = $1`, [player.id]);
    });

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});
