import express from "express";
import gotTeamsOrNot from "../controllers/teamsController.js";

const router = express.Router();
router.get("/", gotTeamsOrNot);

export default router;