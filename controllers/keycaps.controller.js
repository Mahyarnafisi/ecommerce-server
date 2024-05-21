import express from "express";
import Keycap from "../models/keycaps.model.js";

export const getkeycap = async (req, res) => {
  try {
    // Find all data when no request query is provided 1️⃣
    if (!req.query.filter && !req.query.sort && !req.query.first) {
      const getAllKeycaps = await Keycap.find();
      return res
        .status(200)
        .json({ status: "no filter", numberOfData: getAllKeycaps.length, data: getAllKeycaps });
    }

    // Find based on queries when sort in POPULAR 2️⃣
    if (req.query.sort === "popular" && !req.query.direction && !req.query.filter) {
      const getAllKeycaps = await Keycap.find().sort({ popularity: -1 });
      return res.status(200).json({
        status: "most popular items",
        numberOfData: getAllKeycaps.length,
        data: getAllKeycaps,
      });
    }

    // Find based on queries when sort in PRICE and DIRECTION in ASCENDING or DESCENDING 3️⃣
    if (req.query.sort && req.query.direction && !req.query.filter) {
      const getAllKeycaps = await Keycap.find().sort({
        [req.query.sort]: req.query.direction,
      });
      return res.status(200).json({
        status: `${req.query.direction}`,
        numberOfData: getAllKeycaps.length,
        data: getAllKeycaps,
      });
    }
    // Find the first 5 number of data in keycaps collection in the database 4️⃣
    if (req.query.first) {
      const getAllKeycaps = await Keycap.find().limit(parseInt(req.query.first));
      return res.status(200).json({
        status: "successful",
        numberOfData: getAllKeycaps.length,
        data: getAllKeycaps,
      });
    }

    // find based on queries in filter and sort and direction and popular 5️⃣
    if ((req.query.filter = "true")) {
      // find based on queries in filter and sort and direction and popular if THERE IS AN ARRAY
      if (Array.isArray(req.query.filterProperty)) {
        const getAllKeycaps = await Keycap.find({
          $and: Array.from({ length: req.query.filterProperty.length }, (_, i) => ({
            [req.query.filterProperty[i]]: req.query.value[i],
          })),
        }).sort(req.query.direction ? { price: req.query.direction } : { popularity: -1 });

        return res.status(200).json({
          status: getAllKeycaps.length === 0 ? "There is no result found!" : "success",
          numberOfData: getAllKeycaps.length,
          data: getAllKeycaps,
        });
      }

      // find based on queries in filter and sort and direction and popular if THERE IS NO ARRAY
      if (typeof req.query.filterProperty === "string") {
        const getAllKeycaps = await Keycap.find({
          [req.query.filterProperty]: req.query.value,
        }).sort(req.query.direction ? { price: req.query.direction } : { popularity: -1 });

        return res.status(200).json({
          status: getAllKeycaps.length === 0 ? "There is no result found!" : "success",
          numberOfData: getAllKeycaps.length,
          data: getAllKeycaps,
        });
      }
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};
