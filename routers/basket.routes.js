import express from "express";
<<<<<<< HEAD
import { getBasket, addBasketItem, deleteBasketItem, decrementBasketItem, incrementBasketItem } from "./../controllers/basket.controller.js";
=======
import {
  getBasket,
  addBasketItem,
  deleteBasketItem,
  decrementBasketItem,
  incrementBasketItem,
} from "./../controllers/basket.controller.js";
import { createCheckoutSession } from "../controllers/createCheckoutSession.controller.js";
>>>>>>> 515be15e4bd454e0174fd34c2d87fdea0cef0d0f

const router = express.Router();

router.get("/:userID", getBasket);
router.post("/add/:userID", addBasketItem);
router.post("/increment/:userID", incrementBasketItem);
router.post("/decrement/:userID", decrementBasketItem);
router.delete("/del/:userID", deleteBasketItem);

<<<<<<< HEAD
=======
// Stripe end point / new route to create strip new checkout session
router.post("/create-checkout-session", createCheckoutSession);

>>>>>>> 515be15e4bd454e0174fd34c2d87fdea0cef0d0f
export default router;
