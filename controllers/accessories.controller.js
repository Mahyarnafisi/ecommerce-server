import express from "express";
import Accessory from "../models/accessories.model.js";

export const getAccessories = async (req, res) => {
  try {
    const getAllAccessories = await Accessory.find();

    // Check if there is a query and the query is "first" and return the first n number of data in accessories collection in the database ✅
    if (req.query && req.query.first) {
      const queryFirstNumber = req.query.first;
      const sliceOfData = getAllAccessories.slice(0, queryFirstNumber);
      return res.status(200).json({
        status: "Here is the first" + (queryFirstNumber > 1 ? " " + queryFirstNumber : "") + (queryFirstNumber > 1 ? "accessories" : "accessory"),
        numberOfData: sliceOfData.length,
        data: sliceOfData,
      });
    }

    // Check if there is no query and return all data in accessories collection in the database ✅
    return res.status(200).json({ status: "Here is all keyboards data", numberOfData: getAllAccessories.length, data: getAllAccessories });
  } catch (err) {
    console.log(err, "from getAccessories");
  }
};
