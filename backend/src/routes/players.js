import { Router } from "express";
import { db } from "../db.js";

export const playersRouter = Router();

const listStmt = db.prepare(
  `SELECT id, name, correct_count AS correctCount, strikes, admitted_count AS admittedCount
   FROM players
   ORDER BY strikes ASC, correct_count DESC, name ASC`
);

const findByNameStmt = db.prepare(`SELECT * FROM players WHERE name = ?`);
const insertStmt = db.prepare(`INSERT INTO players (name) VALUES (?)`);

playersRouter.get("/", (req, res) => {
  res.json(listStmt.all());
});

playersRouter.post("/", (req, res) => {
  const name = (req.body?.name || "").trim();
  if (!name) {
    return res.status(400).json({ error: "name is required" });
  }
  if (name.length > 40) {
    return res.status(400).json({ error: "name is too long" });
  }

  let player = findByNameStmt.get(name);
  if (!player) {
    const info = insertStmt.run(name);
    player = findByNameStmt.get(name) || { id: info.lastInsertRowid, name };
  }

  res.json({
    id: player.id,
    name: player.name,
    correctCount: player.correct_count,
    strikes: player.strikes,
    admittedCount: player.admitted_count,
  });
});
