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

    // Check if there is a query and the query in sort and direction to list the data in ASC direction  ⬆️
    if (req.query && req.query.sort === "price" && req.query.direction === "asc") {
      // Sort the data in ASC direction
      const ascSorting = getAllKeyboards.sort((a, b) => a.price - b.price);
      return res.status(200).json({
        status: "asc sorting",
        numberOfData: ascSorting.length,
        startingPrice: ascSorting[0].price,
        data: ascSorting,
      });
    }

    // Check if there is a query and the query in sort and direction to list the data in DESC direction  ⬇️
    if (req.query && req.query.sort === "price" && req.query.direction === "desc") {
      // Sort the data in DESC direction
      const descSorting = getAllKeyboards.sort((a, b) => b.price - a.price);
      return res.status(200).json({
        status: "desc sorting",
        numberOfData: descSorting.length,
        startingPrice: descSorting[0].price,
        data: descSorting,
      });
    }

    // Check if there is a query and the query in sort and direction to list the data in POPULAR ITEM  ❤️
    if (req.query && req.query.sort === "popular") {
      // Sort the data in POPULAR ITEM
      const popularSorting = getAllKeyboards.sort((a, b) => b.popularity - a.popularity);
      return res.status(200).json({
        status: "popularity sorting",
        numberOfData: popularSorting.length,
        mostPopular: popularSorting[0].popularity,
        data: popularSorting,
      });
    }

    // Check if there is no query and return all data in keyboards collection in the database ✅
    return res.status(200).json({ status: "Here is all keyboards data", numberOfData: getAllKeyboards.length, data: getAllKeyboards });
  } catch (err) {
    console.log(err, "from getKeyboard");
  }
};
