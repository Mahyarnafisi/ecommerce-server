import express from "express";
import User from "./../models/user.model.js";

// signup user
export const signupUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = new User({
      username: username,
      password: password,
    });
    // check if user already exists
    const findUser = await User.find({ username: username });
    console.log(findUser, "from signup");

    // if user exists, return try new username message
    if (findUser.length > 0) {
      return res.status(404).json({ status: "user already exists, please try another username", data: username });
    }

    // if user does not exist, save user to database as new user
    await newUser.save();
    res.status(201).send({ status: "new user created successfully", data: username });
  } catch (err) {
    console.log(err, "from signup");
  }
};

//
// login user
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if user exists
    const findUser = await User.find({ username: username });

    // if user does not exist, return user not found message ⛔
    if (findUser.length === 0) {
      return res.status(404).json({
        status: "user not found",
        data: username,
      });
    }

    // if user exists, check if password is correct and return login successful message ✅
    if (findUser.length > 0 && findUser[0].password === password) {
      return res.status(200).json({
        status: "login successful",
        data: findUser,
      });
    }

    // if user exists but password is incorrect, return incorrect password message ⛔
    if (findUser.length > 0 && findUser[0].password !== password) {
      return res.status(404).json({
        status: "incorrect password, please try again with correct password",
        data: username,
      });
    }
  } catch (err) {
    console.log(object, "from login");
  }
};

//
// logout user
export const logoutUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    res.send("logout route");
  } catch (err) {
    console.log(err, "from logout");
  }
};
