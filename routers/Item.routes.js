import express from "express";
const router = express.Router();
import { getItem } from "./../controllers/item.controller.js";

router.get("/:title", getItem);

export default router;
