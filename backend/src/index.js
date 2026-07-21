import "dotenv/config";
import express from "express";
import cors from "cors";
import { playersRouter } from "./routes/players.js";
import { moviesRouter } from "./routes/movies.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/players", playersRouter);
app.use("/api/movie", moviesRouter);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, tmdbConfigured: Boolean(process.env.TMDB_API_KEY) });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Movie honesty game API listening on http://localhost:${port}`);
  if (!process.env.TMDB_API_KEY) {
    console.warn("WARNING: TMDB_API_KEY is not set. Copy .env.example to .env and add your key.");
  }
});
