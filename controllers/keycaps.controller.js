import express from "express";
import Keycap from "../models/keycaps.model.js";

export const getkeycap = async (req, res) => {
  try {
    const getAllKeycaps = await Keycap.find();

    // Check if there is a query and the query is "first" and return the first n number of data in keycaps collection in the database ✅
    if (req.query && req.query.first) {
      const queryFirstNumber = req.query.first;
      const sliceOfData = getAllKeycaps.slice(0, queryFirstNumber);
      return res.status(200).json({
        status: "Here is the first" + (queryFirstNumber > 1 ? " " + queryFirstNumber : "") + (queryFirstNumber > 1 ? "keycaps" : "keycap"),
        numberOfData: sliceOfData.length,
        data: sliceOfData,
      });
    }

    // Check if there is a query and the query in sort and direction to list the data in ASC and DESC direction  ⬇️⬆️
    if (req.query && req.query.sort === "price" && (req.query.direction === "asc" || req.query.direction === "desc")) {
      const sorting = getAllKeycaps.sort((a, b) => {
        if (req.query.direction === "asc") {
          return a.price - b.price;
        }
        if (req.query.direction === "desc") {
          return b.price - a.price;
        }
      });
      return res.status(200).json({
        status: req.query.direction === "asc" ? "asc sorting keycaps" : "desc sorting keycaps",
        numberOfData: sorting.length,
        startingPrice: sorting[0].price,
        data: sorting,
      });
    }

    // Check if there is a query and the query in sort to list the data in POPULAR ITEM  ❤️
    if (req.query && req.query.sort === "popular") {
      const popularSorting = getAllKeycaps.sort((a, b) => b.popularity - a.popularity);
      return res.status(200).json({
        status: "popularity sorting",
        numberOfData: popularSorting.length,
        mostPopular: popularSorting[0].popularity,
        data: popularSorting,
      });
    }
    // Check if there is no query and return all data in keycaps collection in the database ✅
    return res.status(200).json({ status: "Here is all keyboards data", numberOfData: getAllKeycaps.length, data: getAllKeycaps });
  } catch (err) {
    console.log(err, "from getkeycaps");
  }
};
