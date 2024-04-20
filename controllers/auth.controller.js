import express from "express";
import User from "./../models/user.model.js";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";

// signup user
export const signupUser = async (req, res) => {
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

      await newUser.save();
      return res.status(201).send({ status: "new user created successfully", data: username });
    }
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
    const isPasswordValid = await bcrypt.compare(password, findUser[0].password);

    // if user exists but password is incorrect, return incorrect password message ⛔
    if (findUser.length > 0 && !isPasswordValid) {
      return res.status(404).json({
        status: "incorrect password or username, please try again!",
        data: username,
      });
    }

    // if user exists, check if password is correct and return login successful message ✅
    if (findUser.length > 0 && isPasswordValid) {
      return res.status(200).json({
        status: "login successful",
        data: findUser,
      });
    }

    // if all fails, return error message ❌
  } catch (err) {
    res.status(500).json({ status: `did not find username with name ${username}` });
    console.log("error from login");
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
