import express from "express";
import { getBasket, postBasket, deleteBasket } from "./../controllers/basket.controller.js";

const router = express.Router();

router.get("/:userID", getBasket);
router.post("/:userID", postBasket);
router.delete("/:userID", deleteBasket);

export default router;
