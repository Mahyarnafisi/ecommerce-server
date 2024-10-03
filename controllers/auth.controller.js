import bcrypt from "bcryptjs";
import express from "express";
import generateTokenFunc from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import User from "./../models/user.model.js";
const app = express();

// signup user
export const signupUser = async (req, res) => {
  console.log("from signup");
  const { username, password } = req.body;
  try {
    // check if user already exists.
    const findUser = await User.find({ username: username });

    // if user exists, return try new username message.
    if (findUser.length > 0) {
      return res.status(404).json({ status: "user already exists, please try another username", data: username });
    }

    // if user does not exist, save user to database as new user.
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

      // generate token

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "60" });

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
  const { username, password } = req.body;

  try {
    // check if user exists
    const findUser = await User.find({ username });
    const isPasswordValid = await bcrypt.compare(password, findUser[0]?.password || "");

    if (findUser.length === 0) {
      console.log("1");
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
      console.log(findUser[0]._id, "from login");

      const token = jwt.sign({ id: findUser[0]._id }, process.env.JWT_SECRET_KEY, { expiresIn: "60" });

      // res.cookie("token", token, {
      //   expire: new Date(Date.now() + 3 * 60),
      // });

      return res.status(200).json({
        token,
        status: "login successful",
        profilePicture: findUser[0].profilePicture,
        username: findUser[0].username,
        userId: findUser[0]._id,
      });
    }

    // if user does not exist , return user not found message.
    if (findUser.length === 0) {
      return res.status(404).json({
        status: "user not found",
        data: username,
      });
    }
  } catch (err) {
    res.status(500).json({ status: `ERROR ${username}` });
    console.log("error from login");
  }
};

//

// logout user
export const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({
      status: "logged out successfully",
    });
  } catch (err) {
    console.log(err, "from logout");
  }
};
