import Accessory from "../models/accessories.model.js";
import Keyboard from "../models/keyboards.model.js";
import Keycap from "../models/keycaps.model.js";
import Switch from "../models/switches.model.js";

export const getItem = async (req, res) => {
  console.log(req.params.title);
  try {
    const item = await Promise.all([
      Keyboard.findOne({ title: req.params.title }),
      Switch.findOne({ title: req.params.title }),
      Keycap.findOne({ title: req.params.title }),
      Accessory.findOne({ title: req.params.title }),
    ]).then((res) => {
      return res.filter((item) => item !== null);
    });
    console.log(item);

    res.status(200).json({
      status: "success",
      data: item,
    });
  } catch (err) {
    console.log(err);
  }
};
