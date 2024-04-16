import express from "express";
const router = express.Router();
import { getAccessories } from "../controllers/accessories.controller.js";

router.get("/accessories", getAccessories);

export default router;
