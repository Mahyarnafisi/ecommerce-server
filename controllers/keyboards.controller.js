import express from "express";
const app = express();
import Keyboard from "./../models/keyboards.model.js";

export const getKeyboard = async (req, res) => {
  try {
    const getAllKeyboards = await Keyboard.find();

    // Check if there is a query and the query is "first" and return the first n number of data in keyboards collection in the database ✅
    if (req.query && req.query.first) {
      const queryFirstNumber = req.query.first;
      const sliceOfData = getAllKeyboards.slice(0, queryFirstNumber);
      return res.status(200).json({
        status: `Here is the first${queryFirstNumber > 1 ? " " + queryFirstNumber : ""} ${queryFirstNumber > 1 ? "keyboards" : "keyboard"}`,
        numberOfData: sliceOfData.length,
        data: sliceOfData,
      });
    }

    // Check if there is no query and return all data in keyboards collection in the database ✅
    return res.status(200).json({ status: "Here is all keyboards data", numberOfData: getAllKeyboards.length, data: getAllKeyboards });
  } catch (err) {
    console.log(err, "from getKeyboard");
  }
};
