import express from "express";
const app = express();
import Keyboard from "./../models/keyboards.model.js";

export const getKeyboard = async (req, res) => {
  try {
    // find all data in keyboards collection in the database
    if (!req.query.filter && !req.query.sort && !req.query.first) {
      const getAllKeyboards = await Keyboard.find();
      return res.status(200).json({ status: "no filter", numberOfData: getAllKeyboards.length, data: getAllKeyboards });
    }
    // find based on queries when sort in POPULAR
    if (req.query.sort === "popular" && !req.query.direction && !req.query.filter) {
      const getAllKeyboards = await Keyboard.find().sort({ popularity: -1 });
      return res.status(200).json({ status: "most popular items", numberOfData: getAllKeyboards.length, data: getAllKeyboards });
    }

    // find based on queries when sort in PRICE and DIRECTION in ASCENDING or DESCENDING
    if (req.query.sort && req.query.direction && !req.query.filter) {
      const getAllKeyboards = await Keyboard.find().sort({ [req.query.sort]: req.query.direction });
      return res.status(200).json({ status: `${req.query.direction}`, numberOfData: getAllKeyboards.length, data: getAllKeyboards });
    }

    // find the first n number of data in keyboards collection in the database
    if (req.query.first) {
      const getAllKeyboards = await Keyboard.find().limit(parseInt(req.query.first));
      return res.status(200).json({ status: "successful", numberOfData: getAllKeyboards.length, data: getAllKeyboards });
    }

    // find based on queries in filter and sort and direction and popular
    if ((req.query.filter = "true")) {
      // find based on queries in filter and sort and direction and popular if THERE IS AN ARRAY
      if (Array.isArray(req.query.filterProperty)) {
        const getAllKeyboards = await Keyboard.find({
          $and: Array.from({ length: req.query.filterProperty.length }, (_, i) => ({
            [req.query.filterProperty[i]]: req.query.value[i],
          })),
        }).sort(req.query.direction ? { price: req.query.direction } : { popularity: -1 });

        return res.status(200).json({
          status: getAllKeyboards.length === 0 ? "There is no result found!" : "success",
          numberOfData: getAllKeyboards.length,
          data: getAllKeyboards,
        });
      }

      // find based on queries in filter and sort and direction and popular if THERE IS NO ARRAY
      if (typeof req.query.filterProperty === "string") {
        const getAllKeyboards = await Keyboard.find({ [req.query.filterProperty]: req.query.value }).sort(
          req.query.direction ? { price: req.query.direction } : { popularity: -1 }
        );

        return res.status(200).json({
          status: getAllKeyboards.length === 0 ? "There is no result found!" : "success",
          numberOfData: getAllKeyboards.length,
          data: getAllKeyboards,
        });
      }
    }
  } catch (err) {
    console.log(err, "from getKeyboard err");
  }
};
