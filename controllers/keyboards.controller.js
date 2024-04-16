import express from "express";
const app = express();
import Keyboard from "./../models/keyboards.model.js";

export const getKeyboard = async (req, res) => {
  try {
    res.send("keyboards");
  } catch (err) {
    console.log(err, "from getKeyboard");
  }
};
