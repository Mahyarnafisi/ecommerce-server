import Accessory from "../models/accessories.model.js";
import Keyboard from "../models/keyboards.model.js";
import Keycap from "../models/keycaps.model.js";
import Switch from "../models/switches.model.js";

export const searchProducts = async (req, res) => {
  console.log(req.query.q);
  try {
    if (req.query.q) {
      const findProducts = await Promise.all([
        Keyboard.find({ title: { $regex: req.query.q, $options: "i" } }),
        Switch.find({ title: { $regex: req.query.q, $options: "i" } }),
        Keycap.find({ title: { $regex: req.query.q, $options: "i" } }),
        Accessory.find({ title: { $regex: req.query.q, $options: "i" } }),
      ]).then((result) => {
        return result.flat(3);
      });

      res.status(200).json({
        status:
          findProducts.length > 0
            ? `Here ${findProducts.length > 1 ? "are" : "is"} founded item${findProducts.length > 1 ? "s" : ""}`
            : "We did not find any results matching your search. Please try again.",
        numberOfData: findProducts.length,
        data: findProducts,
      });
    }
  } catch (err) {
    console.log("error from searchProducts");
  }
};
