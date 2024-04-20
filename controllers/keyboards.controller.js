import express from "express";
const app = express();
import Keyboard from "./../models/keyboards.model.js";

export const getKeyboard = async (req, res) => {
  try {
    const getAllKeyboards = await Keyboard.find();

    if (!req.query) {
      return res.status(200).json({ status: "Here is all keyboards data", data: getAllKeyboards });
    }
    if (req.query && req.query.first) {
      const queryFirstNumber = req.query.first;
      const sliceOfData = getAllKeyboards.slice(0, queryFirstNumber);
      return res.status(200).json({
        status: `Here is the first${queryFirstNumber > 1 ? " " + queryFirstNumber : ""} ${queryFirstNumber > 1 ? "keyboards" : "keyboard"}`,
        numberOfData: sliceOfData.length,
        data: sliceOfData,
      });
    }

    res.status(200).json({ status: "success", data: getAllKeyboards });
  } catch (err) {
    console.log(err, "from getKeyboard");
  }
};
