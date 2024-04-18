import express from "express";
import Accessory from "../models/accessories.model.js";

export const getAccessories = async (req, res) => {
  try {
    const getAllAccessories = await Accessory.find();
    res.status(200).json({ status: "success", data: getAllAccessories });
  } catch (err) {
    console.log(err, "from getAccessories");
  }
};
