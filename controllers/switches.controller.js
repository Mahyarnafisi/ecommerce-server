import express from "express";
import Switch from "./../models/switches.model.js";

export const getSwitches = async (req, res) => {
  try {
    const getAllSwitches = await Switch.find();
    res.status(200).json({ status: "success", data: getAllSwitches });
  } catch (err) {
    console.log(err, "from getSwitches");
  }
};
