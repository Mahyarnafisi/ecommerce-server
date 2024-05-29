import express from "express";
import Accessory from "../models/accessories.model.js";

export const getAccessories = async (req, res) => {
  try {
    // find all data in Accessories collection in the database
    if (!req.query.filter && !req.query.sort && !req.query.first) {
      const getAllAccessories = await Accessory.find();
      return res.status(200).json({ status: "no filter", numberOfData: getAllAccessories.length, data: getAllAccessories });
    }

    // find based on queries when sort in POPULAR
    if (req.query.sort === "popular" && !req.query.direction && !req.query.filter) {
      const getAllAccessories = await Accessory.find().sort({ popularity: -1 });
      return res.status(200).json({
        status: "most popular items",
        numberOfData: getAllAccessories.length,
        data: getAllAccessories,
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
        status: "successful",
        numberOfData: getAllAccessories.length,
        data: getAllAccessories,
      });
    }

    // find based on queries in filter and sort and direction and popular
    if ((req.query.filter = "true")) {
      // find based on queries in filter and sort and direction and popular if THERE IS AN ARRAY
      if (Array.isArray(req.query.filterProperty)) {
        const getAllAccessories = await Accessory.find({
          $and: Array.from({ length: req.query.filterProperty.length }, (_, i) => ({
            [req.query.filterProperty[i]]: req.query.value[i],
          })),
        }).sort(req.query.direction ? { price: req.query.direction } : { popularity: -1 });

        return res.status(200).json({
          status: getAllAccessories.length === 0 ? "There is no result found!" : "success",
          numberOfData: getAllAccessories.length,
          data: getAllAccessories,
        });
      }

      // find based on queries in filter and sort and direction and popular if THERE IS NO ARRAY
      if (typeof req.query.filterProperty === "string") {
        const getAllAccessories = await Accessory.find({
          [req.query.filterProperty]: req.query.value,
        }).sort(req.query.direction ? { price: req.query.direction } : { popularity: -1 });

        return res.status(200).json({
          status: getAllAccessories.length === 0 ? "There is no result found!" : "success",
          numberOfData: getAllAccessories.length,
          data: getAllAccessories,
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
