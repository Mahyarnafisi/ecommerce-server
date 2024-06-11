import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  favoritesList: [Object],
});

const Favorite = mongoose.model("Favorite", favoritesSchema);

export default Favorite;
