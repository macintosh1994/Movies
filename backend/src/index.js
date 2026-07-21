import app from "./app.js";

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Movie honesty game API listening on http://localhost:${port}`);
  if (!process.env.OMDB_API_KEY) {
    console.warn("WARNING: OMDB_API_KEY is not set. Copy .env.example to .env and add your key.");
  }
  if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
    console.warn("WARNING: POSTGRES_URL is not set. Copy .env.example to .env and add your database connection string.");
  }
});
