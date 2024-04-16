import express from "express";
import Keycap from "../models/keycaps.model.js";

export const getkeycap = async (req, res) => {
  try {
    res.send("keycaps");
  } catch (err) {
    console.log(err, "from getkeycaps");
  }
};
