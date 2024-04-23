import express from "express";
import Switch from "./../models/switches.model.js";

export const getSwitches = async (req, res) => {
  try {
    if (!req.query.direction && !req.query.filter && !req.query.first) {
      const getAllSwitches = await Switch.find();
      return res.status(200).json({ status: "successful", numberOfData: getAllSwitches.length, data: getAllSwitches });
    }

    if (req.query.first) {
      const getAllSwitches = await Switch.find().limit(parseInt(req.query.first));
      return res.status(200).json({ status: "successful", numberOfData: getAllSwitches.length, data: getAllSwitches });
    }

    if (req.query.filter || req.query.sort) {
      const getAllSwitches = (await Switch.find().sort(req.query.direction ? { price: req.query.direction } : { popularity: -1 })).find({
        $and: Array.from({ length: 20 }, (_, i) => ({ [req.query.filter[i]]: req.query.value[i] })),
      });
      return res.status(200).json({
        status: getAllSwitches.length === 0 ? "There is no result founded!" : "success",
        numberOfData: getAllSwitches.length,
        data: getAllSwitches,
      });
    }

    // Check if there is a query and the query in sort and direction to list the data in ASC and DESC direction  ⬇️⬆️
    if (req.query && req.query.sort === "price" && (req.query.direction === "asc" || req.query.direction === "desc")) {
      // Sort the data in ASC and DESC direction
      const sorting = getAllSwitches.sort((a, b) => {
        if (req.query.direction === "asc") {
          return a.price - b.price;
        }
        if (req.query.direction === "desc") {
          return b.price - a.price;
        }
      });
      return res.status(200).json({
        status: req.query.direction === "asc" ? "asc sorting switches" : "desc sorting swithces",
        numberOfData: sorting.length,
        startingPrice: sorting[0].price,
        data: sorting,
      });
    }

    // Check if there is a query and the query in sort to list the data in POPULAR ITEM  ❤️
    if (req.query && req.query.sort === "popular") {
      // Sort the data in POPULAR ITEM
      const popularSorting = getAllSwitches.sort((a, b) => b.popularity - a.popularity);
      return res.status(200).json({
        status: "popularity sorting",
        numberOfData: popularSorting.length,
        mostPopular: popularSorting[0].popularity,
        data: popularSorting,
      });
    }

    return res.status(200).json({ status: "Here is all keyboards data", numberOfData: getAllSwitches.length, data: getAllSwitches });
  } catch (err) {
    console.log(err, "from getSwitches");
  }
};
