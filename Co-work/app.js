import fetch from "node-fetch";
import express from "express";
import { Client } from "@elastic/elasticsearch";
import { recommendMovie } from "./recommendation.js";
const app = express();

app.get("/recommend/api1", async (rea, res) => {
  const result = await recommendMovie();
  res.send(result);
});

app.get("/", async (req, res) => {
  res.send("Welcome");
});

const port = 6002;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
