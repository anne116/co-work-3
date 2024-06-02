import { Router } from "express";
import { searchMovies } from "../controllers/search.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const router = Router();

router.route("/movies").get(asyncWrapper(searchMovies));

export default router;
