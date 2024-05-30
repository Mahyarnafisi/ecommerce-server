import express from "express";
const app = express();
import Switch from "./../models/switches.model.js";

export const getSwitches = async (req, res) => {
  try {
    //find all data in switches collection in database
    if (!req.query.filter && !req.query.sort && !req.query.first) {
      const getAllSwitches = await Switch.find();
      return res.status(200).json({ status: "no filter", numberOfData: getAllSwitches.length, data: getAllSwitches });
    }

    //find the first number of data in Switches collection in the database
    if (req.query.first) {
      const getAllSwitches = await Switch.find().limit(parseInt(req.query.first));
      return res.status(200).json({ status: "successful", numberOfData: getAllSwitches.length, data: getAllSwitches });
    }

    // find based on queries when sort in POPULAR
    if (req.query.sort === "popular" && !req.query.direction && !req.query.filter) {
      const getAllSwitches = await Switch.find().sort({ popularity: -1 });
      return res.status(200).json({
        status: "most popular items",
        numberOfData: getAllSwitches.length,
        data: getAllSwitches,
      });
    }
    
    //find based on queries when sort in PRICE and DIRECTION in ASCENDING or DESCENDING
    if (req.query.sort && req.query.direction && !req.query.filter) {
      const  getAllSwitches = await Switch.find().sort({ [req.query.sort]: req.query.direction });
      return res.status(200).json({
        status: `${req.query.direction}`,
        numberOfData:  getAllSwitches.length,
        data:  getAllSwitches,
      });
    }

     // find based on queries in filter and sort and direction and popular
     if ((req.query.filter = "true")) {
      // find based on queries in filter and sort and direction and popular if THERE IS AN ARRAY
      if (Array.isArray(req.query.filterProperty)) {
        const getAllSwitches = await Switch.find({
          $and: Array.from({ length: req.query.filterProperty.length }, (_, i) => ({
            [req.query.filterProperty[i]]: req.query.value[i],
          })),
        }).sort(req.query.direction ? { price: req.query.direction } : { popularity: -1 });

        return res.status(200).json({
          status: getAllSwitches.length === 0 ? "There is no result found!" : "success",
          numberOfData: getAllSwitches.length,
          data: getAllSwitches,
        });
      }

      // find based on queries in filter and sort and direction and popular if THERE IS NO ARRAY
      if (typeof req.query.filterProperty === "string") {
        const getAllSwitches = await Switch.find({
          [req.query.filterProperty]: req.query.value,
        }).sort(req.query.direction ? { price: req.query.direction } : { popularity: -1 });

        return res.status(200).json({
          status: getAllSwitches.length === 0 ? "There is no result found!" : "success",
          numberOfData: getAllSwitches.length,
          data: getAllSwitches,
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
