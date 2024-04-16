import express from "express";
import Filter from "./../models/filters.model.js";

export const getFilter = async (req, res) => {
  try {
    res.send("filter works!");
  } catch (err) {
    console.log(err, "from getFilter");
  }
};
