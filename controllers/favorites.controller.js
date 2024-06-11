import express from "express";
import Favorite from "../models/favorites.model.js";

export const getFavorites = async (req, res) => {
  try {
    res.status(200).json({
      message: "get favorites",
    });
  } catch (error) {
    console.log(error, "GET Favorite");
  }
};

export const postFavorite = async (req, res) => {
  const { userID, favoriteItem } = req.body;
  console.log(req.body);
  try {
    res.status(200).json({
      message: "Post Favorite",
    });
  } catch (error) {
    console.log(error, "POST Favorite");
  }
};

export const deleteFavorite = async (req, res) => {
  const { userID, itemID } = req.body;

  try {
    const getOnlineUser = await Favorite.findOne({ userID: userID }).then((data) => {
      return data.favoritesList.filter((item) => item.itemID !== itemID);
    });

    res.status(200).json({
      message: "Delete Favorite",
    });
  } catch (error) {
    console.log(error, "Delete Favorite");
  }
};
