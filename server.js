import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "AIzaSyAFmms_JJrVmmv-rPP4INamToX9xmuVyJY";

app.get("/yt", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json([]);

  const url = `https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=6&q=${encodeURIComponent(q)}&key=${API_KEY}`;

  const r = await fetch(url);
  const data = await r.json();

  res.json(data);
});

app.listen(3000, () => console.log("YouTube proxy aktif: http://localhost:3000"));
