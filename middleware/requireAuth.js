import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const { authorization } = req.headers;
    const token = authorization && authorization?.split(" ")[1].replace(/"/g, "");

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err, "from requireAuth");
        return res.status(401).json({ message: "Unauthorized" });
      }
      console.log(decoded, "from requireAuth");
      req.user = decoded;
      // const getUser = User.findById(decoded.id);
      // console.log(getUser, "from requireAuth");
    });
    next();
  }
  return;
};
