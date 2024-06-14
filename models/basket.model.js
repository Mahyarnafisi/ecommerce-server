import mongoose from "mongoose";

const basketSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  basketList: [Object],
});

const Basket = mongoose.model("Basket", basketSchema);

export default Basket;
