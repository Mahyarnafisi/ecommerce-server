import express from "express";
import { getBasket, addBasketItem, deleteBasketItem, decrementBasketItem, incrementBasketItem } from "./../controllers/basket.controller.js";

const router = express.Router();

router.get("/:userID", getBasket);
router.post("/add/:userID", addBasketItem);
router.post("/increment/:userID", incrementBasketItem);
router.post("/decrement/:userID", decrementBasketItem);
router.delete("/del/:userID", deleteBasketItem);

export default router;
