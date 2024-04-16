import express from "express";
const app = express();
const router = express.Router();
import { getkeycap } from "./../controllers/keycaps.controller.js";

router.get("/keycaps", getkeycap);

export default router;
