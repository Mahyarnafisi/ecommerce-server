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

    // Check if there is no query and return all data in keycaps collection in the database ✅
    return res.status(200).json({ status: "Here is all keyboards data", numberOfData: getAllKeycaps.length, data: getAllKeycaps });
  } catch (err) {
    console.log(err, "from getkeycaps");
  }
};
