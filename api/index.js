// Vercel serverless entry point. An Express app is itself a valid Node
// request handler ((req, res) => void), so it can be exported directly —
// vercel.json rewrites every /api/* request here and Express's own router
// handles the sub-path matching from there.
import app from "../backend/src/app.js";

export default app;
