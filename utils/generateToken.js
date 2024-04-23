import JWT from "jsonwebtoken";

const generateTokenFunc = (userID, res) => {
  const token = JWT.sign({ userID }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3m",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    maxAge: 1000 * 60 * 3 * 0,
  });
};

export default generateTokenFunc;
