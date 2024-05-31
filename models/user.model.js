import express from "express";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max: 32,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 32,
    },
    profilePicture: {
      type: String,
    },
    favoriteList: {
      type: [Object],
    },
    basketList: {
      type: [Object],
    },
    purchaseHistory: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
