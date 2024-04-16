import express from "express";
import Switch from "./../models/switches.model.js";

export const getSwitches = async (req, res) => {
  try {
    res.send("switches");
  } catch (err) {
    console.log(err, "from getSwitches");
  }
};
