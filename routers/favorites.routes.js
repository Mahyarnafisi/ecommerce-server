import express from "express";
import { getFavorites, postFavorite, deleteFavorite } from "../controllers/favorites.controller.js";

const router = express.Router();

router.get("/", getFavorites);
router.post("/", postFavorite);
router.delete("/", deleteFavorite);

export default router;
