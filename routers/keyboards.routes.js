import express from "express";
const app = express();
const router = express.Router();
import { getKeyboard } from "./../controllers/keyboards.controller.js";

router.get("/keyboards", getKeyboard);

export default router;
