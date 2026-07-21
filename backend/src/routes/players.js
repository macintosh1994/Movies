import { Router } from "express";
import { query } from "../db.js";

export const playersRouter = Router();

function toPlayer(row) {
  return {
    id: row.id,
    name: row.name,
    correctCount: row.correct_count,
    strikes: row.strikes,
    admittedCount: row.admitted_count,
  };
}

playersRouter.get("/", async (req, res, next) => {
  try {
    const result = await query(
      `SELECT id, name, correct_count, strikes, admitted_count
       FROM players
       ORDER BY strikes ASC, correct_count DESC, name ASC`
    );
    res.json(result.rows.map(toPlayer));
  } catch (err) {
    next(err);
  }
});

playersRouter.post("/", async (req, res, next) => {
  try {
    const name = (req.body?.name || "").trim();
    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }
    if (name.length > 40) {
      return res.status(400).json({ error: "name is too long" });
    }

    const existing = await query(`SELECT * FROM players WHERE name = $1`, [name]);
    let player = existing.rows[0];
    if (!player) {
      const inserted = await query(
        `INSERT INTO players (name) VALUES ($1)
         ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
         RETURNING *`,
        [name]
      );
      player = inserted.rows[0];
    }

    res.json(toPlayer(player));
  } catch (err) {
    next(err);
  }
});
