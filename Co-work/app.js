import fetch from "node-fetch";
import express from "express";
import { Client } from "@elastic/elasticsearch";
import { recommendMovie, userRecommendation } from "./recommendation.js";
import { searchMovies } from "./auto-complete.js";
const app = express();

app.get("/recommend", async (rea, res) => {
  const result = await recommendMovie();
  res.send(result);
});

app.get("/user_recommend", async (req, res) => {
  const userId = req.query.userId;
  const result = await userRecommendation(userId);
  res.send(result);
});

app.get("/auto_complete", async (req, res) => {
  //   res.send("Welcome");
  const test = await searchMovies("f");
  res.send(test);
});

const port = 6002;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
