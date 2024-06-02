import { Router } from "express";
import { movieDetail } from "../controllers/movieDetail.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const router = Router();

router.route("/").get(asyncWrapper(movieDetail));

export default router;
