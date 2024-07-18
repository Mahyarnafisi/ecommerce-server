import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({
      error: "You must be logged in",
    });
  }
  const token = authorization?.split(" ")[1];
  console.log(token, "token");

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(_id, "id");

    next();
  } catch (error) {
    res.status(401).json({
      error: "You must be logged in, not valid token",
    });
  }
};
