import { Router } from "express";
import { getRecommendByMovie } from "../controllers/recommend.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const router = Router();

router.route("/movie").get(asyncWrapper(getRecommendByMovie));

export default router;
