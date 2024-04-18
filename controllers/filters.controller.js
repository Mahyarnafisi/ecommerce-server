import express from "express";
import Filter from "./../models/filters.model.js";

export const getFilter = async (req, res) => {
  const { product } = req.params;
  try {
    const getFilterOfProduct = await Filter.find({ product: product });
    res.status(200).json({ status: "success", data: getFilterOfProduct });
  } catch (err) {
    console.log(err, "from getFilter");
  }
};
