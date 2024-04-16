import express from "express";
import { getFilter } from "../controllers/filters.controller.js";

const router = express.Router();

router.get("/:product", getFilter);

export default router;
