import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routers/auth.routes.js";
import keyboardsRoutes from "./routers/keyboards.routes.js";
import keycapsRoutes from "./routers/keycaps.routes.js";
import switchesRoutes from "./routers/switches.routes.js";
import accessoriesRoutes from "./routers/accessories.routes.js";
import filtersRoutes from "./routers/filter.routes.js";
import searchRoutes from "./routers/search.routes.js";
import itemRoutes from "./routers/Item.routes.js";
import cors from "cors";
import session from "express-session";
import mongoConnect from "connect-mongodb-session";
const MongoDBStore = mongoConnect(session);
import mongoose from "mongoose";
const app = express();
dotenv.config();
//

const store = new MongoDBStore({
  uri: process.env.DATABASE_STRING,
  collection: "sessions",
});

// MIDDLEWARES

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60, // 1 minute
      secure: false,
      sameSite: "none",
    },
    store: store,
  })
);

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
// MIDDLEWARE FOR SESSION
const mongoDBsessionMiddleware = function (req, res, next) {
  req.session.isAuth = true;
  next();
};

// DATABASE CONNECTION
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_STRING);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err, "from dbConnection");
  }
};
// ROUTES FOR LOGIN, SIGNUP, LOGOUT
app.use("/api/auth", authRoutes);

// ROUTES FOR PRODUCTS (Keyboards, Keycaps, Switches, Accessories)
app.use("/api/products", keyboardsRoutes);
app.use("/api/products", keycapsRoutes);
app.use("/api/products", switchesRoutes);
app.use("/api/products", accessoriesRoutes);
app.use("/api", searchRoutes);
app.use("/api/products", itemRoutes);

// ROUTES FOR FILTERS
app.use("/api/filters", filtersRoutes);

// ROUTE FOR TESTING
app.get("/", (req, res) => {
  res.send("<h2>the server is running on port 5555</h2>");
});

// SERVER CONNECTION
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
});
