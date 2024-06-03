import express from "express";
import { updatePage } from "./updateES.js";

const app = express();

app.get("/update", (req, res) => {
  const array = new Array(10).fill(null);
  array.forEach((item, index) => {
    updatePage(index + 1);
  });
  res.status(200).send("update here");
});

app.listen(8000, (req, res) => {
  console.log("Update server is listening on port 8000");
});
