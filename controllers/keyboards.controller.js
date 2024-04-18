import express from "express";
const app = express();
import Keyboard from "./../models/keyboards.model.js";

export const getKeyboard = async (req, res) => {
  try {
    const getAllKeyboards = await Keyboard.find();
    res.status(200).json({ status: "success", data: getAllKeyboards });
  } catch (err) {
    console.log(err, "from getKeyboard");
  }
};
