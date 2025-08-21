import express from "express";
import updateFavs from "../controllers/userController.js";

const router = express.Router();
router.patch("/:id/favs", updateFavs);

export default router;