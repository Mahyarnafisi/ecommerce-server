import express from "express";
const app = express();
const router = express.Router();
import { getSwitches } from "../controllers/switches.controller.js";

router.get("/switches", getSwitches);

export default router;
