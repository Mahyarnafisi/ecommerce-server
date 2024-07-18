import express from "express";
import { getKeyboard } from "./../controllers/keyboards.controller.js";
const app = express();
const router = express.Router();

router.get("/keyboards", getKeyboard);

export default router;
