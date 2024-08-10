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
import favoritesRoutes from "./routers/favorites.routes.js";
import basketRoutes from "./routers/basket.routes.js";
import subscriptionRoutes from "./routers/subscriptions.routes.js";

import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import mongoConnect from "connect-mongodb-session";

const MongoDBStore = mongoConnect(session);
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;
//

app.use(express.json());

// SESSION STORE
const store = new MongoDBStore({
  uri: process.env.DATABASE_STRING,
  collection: "sessions",
});
store.on("error", function (err) {
  console.log("error", err);
});

// MIDDLEWARES
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: store,
  })
);

app.use(
  cors({
    // optionsSuccessStatus: 200,
    credentials: true,
    origin: "https://ecommerce-server-j2oy.onrender.com",
  })
);

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

// Router to email subscription
app.use("/api/subscribe", subscriptionRoutes);

// ROUTES FOR FILTERS
app.use("/api/filters", filtersRoutes);

// ROUTES FOR Favorites
app.use("/api/favorites", favoritesRoutes);

// ROUTES FOR Basket
app.use("/api/basket", basketRoutes);

// ROUTE FOR TESTING
app.get("/", (req, res) => {
  res.send("<h2>the server is running on port 5555</h2>");
});

// SERVER CONNECTION
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
});
