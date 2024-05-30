import express from "express";
import Accessory from "../models/accessories.model.js";

export const getAccessories = async (req, res) => {
  try {
    const getAllAccessories = await Accessory.find();
    console.log(req.query);

    // Check if there is a query and the query is "first" and return the first n number of data in accessories collection in the database ✅
    if (req.query && req.query.first) {
      const queryFirstNumber = req.query.first;
      const sliceOfData = getAllAccessories.slice(0, queryFirstNumber);
      return res.status(200).json({
        status:
          "Here is the first" +
          (queryFirstNumber > 1 ? " " + queryFirstNumber : "") +
          (queryFirstNumber > 1 ? "accessories" : "accessory"),
        numberOfData: sliceOfData.length,
        data: sliceOfData,
      });
    }

    // find based on queries when sort in PRICE and DIRECTION in ASCENDING or DESCENDING
    if (req.query.sort && req.query.direction && !req.query.filter) {
      const getAllAccessories = await Accessory.find().sort({ [req.query.sort]: req.query.direction });
      return res.status(200).json({
        status: `${req.query.direction}`,
        numberOfData: getAllAccessories.length,
        data: getAllAccessories,
      });
    }

    // find the first n number of data in Accessories collection in the database
    if (req.query.first) {
      const getAllAccessories = await Accessory.find().limit(parseInt(req.query.first));
      return res.status(200).json({
        status: "popularity sorting",
        numberOfData: popularSorting.length,
        mostPopular: popularSorting[0].popularity,
        data: popularSorting,
      });
    }

    // Check if there is no query and return all data in accessories collection in the database ✅
    return res
      .status(200)
      .json({ status: "Here is all keyboards data", numberOfData: getAllAccessories.length, data: getAllAccessories });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};
