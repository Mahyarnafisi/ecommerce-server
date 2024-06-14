import Basket from "../models/basket.model.js";

export const getBasket = async (req, res) => {
  const { userID } = req.params;
  try {
    res.status(200).json({
      message: "GET Basket",
    });
  } catch (error) {
    console.log(error, "GET Basket");
  }
};

export const postBasket = async (req, res) => {
  const { userID } = req.params;
  const getUser = await Basket.findOne({ userID: userID });

  try {
    // If the user already has a basket list, update it
    if (getUser) {
      const item = getUser.basketList?.find((item) => item.itemID === req.body.itemObject.itemID);

      // If the item already exists in the basket list, update the quantity +1
      if (item) {
        item.quantity += 1;
        await Basket.findOneAndUpdate({ userID: userID }, { $set: { basketList: getUser.basketList } });
        return res.status(400).json({
          data: getUser.basketList,
        });
      }

      // If the item does not exist in the basket list, add it
      if (!item) {
        await Basket.findOneAndUpdate({ userID: userID }, { $push: { basketList: { ...req.body.itemObject, quantity: 1 } } });
        return res.status(200).json({
          data: getUser.basketList,
        });
      }

      // Update the user's basket list
      // await Basket.findOneAndUpdate({ userID: userID }, { $push: { basketList: req.body.itemObject } }, { new: true });

      return res.status(200).json({
        message: "POST Basket",
      });
    }

    // If the user does not have a basket list, create a new one
    if (!getUser) {
      // Create a new basket list
      const newBasket = new Basket({
        userID: userID,
        basketList: { ...req.body.itemObject, quantity: 1 },
      });
      await newBasket.save();
      return res.status(200).json({
        message: "POST Basket",
      });
    }
  } catch (error) {
    console.log(error, "POST Basket");
  }
};

export const deleteBasket = async (req, res) => {
  const { userID } = req.params;
  try {
    // Delete the item from the user's basket list
    await Basket.findOneAndUpdate({
      userID: userID,
      $pull: { basketList: { itemID: req.body.itemID } },
    });
    return res.status(200).json({
      message: "DELETE Basket",
    });
  } catch (error) {
    console.log(error, "DELETE Basket");
  }
};
