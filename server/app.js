import express from "express";
import recommendRouter from "./routes/recommend.js";

const app = express();

app.use("/api/recommend", recommendRouter);

app.route("/").get((req, res) => {
  res.send("ok");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
