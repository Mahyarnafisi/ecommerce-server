import express from "express";
import { getFavorites, postFavorite, deleteFavorite } from "../controllers/favorites.controller.js";

const router = express.Router();

router.get("/:userID", getFavorites);
router.post("/:userID", postFavorite);
router.delete("/:userID", deleteFavorite);

export default router;
