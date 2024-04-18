import express from "express";
import Keycap from "../models/keycaps.model.js";

export const getkeycap = async (req, res) => {
  try {
    const getAllKeycaps = await Keycap.find();
    res.status(200).json({ status: "success", data: getAllKeycaps });
  } catch (err) {
    console.log(err, "from getkeycaps");
  }
};
