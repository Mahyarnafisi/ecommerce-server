import express from "express";
import { getFavorites, addFavoriteItem, deleteFavoriteItem } from "../controllers/favorites.controller.js";

const router = express.Router();

router.get("/:userID", getFavorites);
router.post("/add/:userID", addFavoriteItem);
router.delete("/del/:userID", deleteFavoriteItem);

export default router;
