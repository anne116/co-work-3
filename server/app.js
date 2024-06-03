import express from "express";
import cors from "cors";
import searchRouter from "./routes/search.js";
import savedListRouter from "./routes/savedList.js";
import movieDetailRouter from "./routes/movieDetail.js";
import recommendRouter from "./routes/recommend.js";

const app = express();
app.use(cors());

app.use("/api/search", searchRouter);
app.use("/api/savedList", savedListRouter);
app.use("/api/movie/detail", movieDetailRouter);
app.use("/api/recommend", recommendRouter);

app.route("/").get((req, res) => {
  res.send("ok");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
