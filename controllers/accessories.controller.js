import express from "express";
import Accessory from "../models/accessories.model.js";

export const getAccessories = async (req, res) => {
  try {
    res.send("accessories");
  } catch (err) {
    console.log(err, "from getAccessories");
  }
};
