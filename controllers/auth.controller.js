import express from "express";
import User from "./../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenFunc from "../utils/generateToken.js";

// signup user
export const signupUser = async (req, res) => {
  console.log("from signup");
  const { username, password } = req.body;
  try {
    // check if user already exists
    const findUser = await User.find({ username: username });
    console.log(findUser, "from signup");

    // if user exists, return try new username message
    if (findUser.length > 0) {
      return res.status(404).json({ status: "user already exists, please try another username", data: username });
    }

    // if user does not exist, save user to database as new user
    if (findUser.length === 0) {
      // create user picture
      const userPicture = `https://avatar.iran.liara.run/username?username=${username}`;

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create new user
      const newUser = new User({
        username: username,
        password: hashedPassword,
        profilePicture: userPicture,
      });
      generateTokenFunc(newUser._id, res);
      await newUser.save();
      res.status(201).send({
        status: "new user created successfully",
        _id: newUser._id,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      });
    }
  } catch (err) {
    console.log(err, "from signup");
  }
};

//
// login user
export const loginUser = async (req, res) => {
  console.log("from login");
  const { username, password } = req.body;
  try {
    // check if user exists
    const findUser = await User.find({ username });
    const isPasswordValid = await bcrypt.compare(password, findUser[0]?.password || "");

    if (findUser.length === 0) {
      return res.status(404).json({
        status: "Theres no user with that username, please try again",
        data: username,
      });
    }

    if (findUser.length > 0 && !isPasswordValid) {
      // if user exists but password is incorrect, return incorrect password message ⛔
      return res.status(404).json({
        status: "incorrect password or username, please try again!",
        data: username,
      });
    }

    // if user exists, check if password is correct and return login successful message ✅
    if (findUser.length > 0 && isPasswordValid) {
      generateTokenFunc(findUser[0]._id, res);
      return res.status(200).json({
        status: "login successful",
        username: findUser[0].username,
        profilePicture: findUser[0].profilePicture,
      });
    }
  } catch (err) {
    res.status(500).json({ status: `did not find username with name ${username}` });
    console.log("error from login");
  }
};

//
// logout user
export const logoutUser = async (req, res) => {
  console.log("from logout");
  try {
    await res.clearCookie("jwt");
    return res.status(200).json({
      status: "logged out successfully",
    });
  } catch (err) {
    console.log(err, "from logout");
  }
};
