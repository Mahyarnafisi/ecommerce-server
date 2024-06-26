import express from "express";
import { getFavorites, addFavoriteItem } from "../controllers/favorites.controller.js";

const router = express.Router();

router.get("/:userID", getFavorites);
router.post("/add/:userID", addFavoriteItem);

export default router;
