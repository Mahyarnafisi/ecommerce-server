import express from "express";
import { subscriptionController } from "../controllers/subscription.controller.js";

const router = express.Router();

router.post("/", subscriptionController);

export default router;
