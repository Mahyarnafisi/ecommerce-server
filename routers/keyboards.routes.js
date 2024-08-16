import express from "express";
<<<<<<< HEAD
const app = express();
const router = express.Router();
import { getKeyboard } from "./../controllers/keyboards.controller.js";
=======
import { getKeyboard } from "./../controllers/keyboards.controller.js";
const app = express();
const router = express.Router();
>>>>>>> 515be15e4bd454e0174fd34c2d87fdea0cef0d0f

router.get("/keyboards", getKeyboard);

export default router;
