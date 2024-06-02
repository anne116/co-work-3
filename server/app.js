import express from "express";
import searchRouter from "./routes/search.js";

const app = express();

app.use("/api/search", searchRouter);

app.route("/").get((req, res) => {
  res.send("ok");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
