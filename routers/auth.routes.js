import express from "express";
<<<<<<< HEAD
const router = express.Router();
import { signupUser, loginUser, logoutUser } from "./../controllers/auth.controller.js";
=======
import { loginUser, logoutUser, signupUser } from "./../controllers/auth.controller.js";
const router = express.Router();
>>>>>>> 515be15e4bd454e0174fd34c2d87fdea0cef0d0f

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

export default router;
