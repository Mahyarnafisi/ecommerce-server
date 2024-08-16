import express from "express";
import {
  getBasket,
  addBasketItem,
  deleteBasketItem,
  decrementBasketItem,
  incrementBasketItem,
} from "./../controllers/basket.controller.js";
import { createCheckoutSession } from "../controllers/createCheckoutSession.controller.js";

const router = express.Router();

router.get("/:userID", getBasket);
router.post("/add/:userID", addBasketItem);
router.post("/increment/:userID", incrementBasketItem);
router.post("/decrement/:userID", decrementBasketItem);
router.delete("/del/:userID", deleteBasketItem);

// Stripe end point / new route to create strip new checkout session
router.post("/create-checkout-session", createCheckoutSession);

export default router;
