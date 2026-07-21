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
  res.json({ ok: true, omdbConfigured: Boolean(process.env.OMDB_API_KEY), dbConfigured: Boolean(process.env.POSTGRES_URL || process.env.DATABASE_URL) });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

export default app;
