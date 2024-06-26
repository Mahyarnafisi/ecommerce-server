import Favorite from "../models/favorites.model.js";

export const getFavorites = async (req, res) => {
  const { userID } = req.params;
  try {
    // Get the user's favorite list
    const getFavorites = await Favorite.findOne({ userID: userID });
    res.status(200).json({
      numberOfResult: getFavorites.favoritesList.length,
      data: getFavorites.favoritesList || [],
    });
  } catch (error) {
    console.log(error, "GET Favorite");
  }
};

export const addFavoriteItem = async (req, res) => {
  const { userID } = req.params;
  const getUser = await Favorite.findOne({ userID: userID });
  const findItem = getUser?.favoritesList.find((item) => item._id === req.body._id) || false;

  try {
    // If the user already has a favorite list, update it
    if (getUser && findItem) {
      console.log("1");
      // Update the user's favorite list
      await Favorite.findOneAndUpdate({
        userID: userID,
        $pull: { favoritesList: req.body },
      });

      return res.status(200).json({
        message: "like the item",
      });
    }

    if (getUser && !findItem) {
      console.log("2");
      // Update the user's favorite list
      await Favorite.findOneAndUpdate({
        userID: userID,
        $push: { favoritesList: req.body },
      });

      return res.status(200).json({
        message: "unlike the item",
      });
    }

    // If the user does not have a favorite list, create a new one
    if (!getUser) {
      // Create a new favorite list
      const newFavorite = new Favorite({
        userID: userID,
        favoritesList: req.body,
      });
      await newFavorite.save();
      return res.status(200).json({
        message: "Post Favorite",
      });
    }
  } catch (error) {
    console.log(error, "POST Favorite");
  }
};

export const deleteFavoriteItem = async (req, res) => {
  const { userID } = req.params;

  try {
    // Delete the item from the user's favorite list
    await Favorite.findOneAndUpdate({ userID: userID, $pull: { favoritesList: { _id: req.body.itemID } } });
    return res.status(200).json({
      message: "Delete Favorite ",
    });
  } catch (error) {
    console.log(error, "Delete Favorite");
  }
};
