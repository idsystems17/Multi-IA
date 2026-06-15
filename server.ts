// Servidor local para desenvolvimento. Em produção, o Vercel usa api/generate-ebook.ts.
import express from "express";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import handler from "./api/generate-ebook";

dotenv.config();

const app  = express();
const PORT = 3000;

app.use(express.json());
app.post("/api/generate-ebook", (req, res) => handler(req, res));

async function start() {
  const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
  app.use(vite.middlewares);
  app.listen(PORT, "0.0.0.0", () => console.log(`Dev server: http://localhost:${PORT}`));
}

start().catch(console.error);
