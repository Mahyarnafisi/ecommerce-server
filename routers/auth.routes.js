import express from "express";
const app = express();
const router = express.Router();
import { signupUser, loginUser, logoutUser } from "./../controllers/auth.controller.js";

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

export default router;
