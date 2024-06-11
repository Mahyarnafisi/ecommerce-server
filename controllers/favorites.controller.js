import express from "express";
import Favorite from "../models/favorites.model.js";

export const getFavorites = async (req, res) => {
  try {
    const getFavorites = await Favorite.findOne();
    res.status(200).json({
      message: "get favorites",
      getFavorites,
    });
  } catch (error) {
    console.log(error, "GET Favorite");
  }
};

export const postFavorite = async (req, res) => {
  const { userID, favoriteItem } = req.body;
  const getUser = await Favorite.findOne({ userID: userID });

  try {
    // If the user already has a favorite list, update it
    if (getUser) {
      const updateFavorite = await Favorite.findOneAndUpdate({
        userID: userID,
        $push: { favoritesList: favoriteItem },
      });

      return res.status(400).json({
        message: "User already has a favorite list and update it",
      });
    }

    // If the user does not have a favorite list, create a new one
    if (!getUser) {
      const newFavorite = new Favorite({
        userID: userID,
        favoritesList: favoriteItem,
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

export const deleteFavorite = async (req, res) => {
  const { userID, itemID } = req.body;

  try {
    const getFavorite = await Favorite.findOne({ userID: userID });
    const updateFavorite = await Favorite.findOneAndUpdate(
      { userID: userID },
      {
        $pull: { favoritesList: { _id: itemID } },
      }
    );
    return res.status(200).json({
      message: "Delete Favorite ",
    });
  } catch (error) {
    console.log(error, "Delete Favorite");
  }
};
