import fs from "fs";
import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
// import Keyboard from "./models/keyboards.model.js";
// import Accessory from "./models/accessories.model.js";
// import Switch from "./models/switches.model.js";
// import Keycap from "./models/keycaps.model.js";
// import Filter from "./models/filters.model.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_STRING);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err, "from dbConnection");
  }
};
connectToMongoDB();

const keyboards = JSON.parse(fs.readFileSync(`./keyboards.json`, "utf-8"));
const accessories = JSON.parse(fs.readFileSync(`./accessories.json`, "utf-8"));
const switches = JSON.parse(fs.readFileSync(`./switches.json`, "utf-8"));
const keycaps = JSON.parse(fs.readFileSync(`./keycaps.json`, "utf-8"));
const filters = JSON.parse(fs.readFileSync(`./filters.json`, "utf-8"));

const importData = async () => {
  try {
    await Filter.create(filters);
    console.log("Data imported successfully");
  } catch (err) {
    console.log(err);
  }
};
importData();

// const deleteData = async () => {
//   try {
//     await Keyboard.deleteMany();
//     console.log("Data deleted successfully");
//   } catch (err) {
//     console.log(err);
//   }
// };

// deleteData();
