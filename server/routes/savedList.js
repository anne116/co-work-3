import { Router } from "express";
import { savedList } from "../controllers/savedList.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";

const router = Router();

router.route("/list").get(asyncWrapper(savedList));

export default router;
