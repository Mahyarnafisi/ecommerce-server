import express from "express";
import Filter from "./../models/filters.model.js";
import Keyboard from "../models/keyboards.model.js";
import Keycap from "../models/keycaps.model.js";
import Switch from "../models/switches.model.js";
import Accessory from "../models/accessories.model.js";

export const getFilter = async (req, res) => {
  const { product } = req.params;

  try {
    if (product === "keyboards") {
      const getKeyboardsFilterPanelData = [
        {
          title: "connectivity",
          options: [
            {
              title: "Tri-mode wireless",
              number: await Keyboard.find({ connectivity: "Tri-mode wireless" }).countDocuments(),
            },
            {
              title: "wired",
              number: await Keyboard.find({ connectivity: "wired" }).countDocuments(),
            },
          ],
        },
        {
          title: "profile_type",
          options: [
            {
              title: "low-profile",
              number: await Keyboard.find({ profile_type: "low-profile" }).countDocuments(),
            },
            {
              title: "normal-profile",
              number: await Keyboard.find({ profile_type: "normal-profile" }).countDocuments(),
            },
          ],
        },
        {
          title: "series",
          options: [
            {
              title: "gem",
              number: await Keyboard.find({ series: "gem" }).countDocuments(),
            },
            {
              title: "air",
              number: await Keyboard.find({ series: "air" }).countDocuments(),
            },
            {
              title: "halo",
              number: await Keyboard.find({ series: "halo" }).countDocuments(),
            },
            {
              title: "field",
              number: await Keyboard.find({ series: "field" }).countDocuments(),
            },
          ],
        },
        {
          title: "size",
          options: [
            {
              title: "60",
              number: await Keyboard.find({ size: "60" }).countDocuments(),
            },
            {
              title: "65",
              number: await Keyboard.find({ size: "65" }).countDocuments(),
            },
            {
              title: "75",
              number: await Keyboard.find({ size: "75" }).countDocuments(),
            },
            {
              title: "96",
              number: await Keyboard.find({ size: "96" }).countDocuments(),
            },
          ],
        },
      ];

      return res.status(200).json({ status: "success", data: getKeyboardsFilterPanelData });
    }
    if (product === "keycaps") {
      const getKeycapsFilterPanelData = [
        {
          title: "profile_type",
          options: [
            {
              title: "low-profile",
              number: await Keycap.find({ profile_type: "low-profile" }).countDocuments(),
            },
            {
              title: "normal-profile",
              number: await Keycap.find({ profile_type: "normal-profile" }).countDocuments(),
            },
          ],
        },
        {
          title: "series",
          options: [
            {
              title: "pbt",
              number: await Keycap.find({ series: "pbt" }).countDocuments(),
            },
            {
              title: "kds",
              number: await Keycap.find({ series: "kds" }).countDocuments(),
            },
            {
              title: "msa",
              number: await Keycap.find({ series: "msa" }).countDocuments(),
            },
          ],
        },
      ];

      return res.status(200).json({
        status: "success",
        data: getKeycapsFilterPanelData,
      });
    }
  } catch (err) {
    console.log(err, "from getFilter");
  }
};
