import express from "express";
import Filter from "./../models/filters.model.js";
import Keyboard from "../models/keyboards.model.js";
import Keycap from "../models/keycaps.model.js";
import Switch from "../models/switches.model.js";
import Accessory from "../models/accessories.model.js";

export const getFilter = async (req, res) => {
  const { product } = req.params;
  try {
    const getFilterOfProduct = await Filter.find({ product: product });
    // const getAllFiltersOptions = getFilterOfProduct[0].filters.map((filter) => {
    //   return filter;
    // });
    // const array = getAllFiltersOptions.flatMap((item) => {
    //   return item.options;
    // });

    // console.log(array);
    // const test = {
    //   [array.filter((item) => {
    //     return { [item]: 1 };
    //   })]: array,
    // };
    return res.status(200).json({ status: "success", data: getFilterOfProduct });
  } catch (err) {
    console.log(err, "from getFilter");
  }
};
