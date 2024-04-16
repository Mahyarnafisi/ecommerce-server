import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routers/auth.routes.js";
import keyboardsRoutes from "./routers/keyboards.routes.js";
import keycapsRoutes from "./routers/keycaps.routes.js";
import switchesRoutes from "./routers/switches.routes.js";
import accessoriesRoutes from "./routers/accessories.routes.js";
import mongoose from "mongoose";
const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// ROUTES FOR LOGIN, SIGNUP, LOGOUT
app.use("/api/auth", authRoutes);

// ROUTES FOR PRODUCTS (Keyboards, Keycaps, Switches, Accessories)
app.use("/api/products", keyboardsRoutes);
app.use("/api/products", keycapsRoutes);
app.use("/api/products", switchesRoutes);
app.use("/api/products", accessoriesRoutes);

// ROUTE FOR TESTING
app.get("/", (req, res) => {
  res.send("<h2>the server is running on port 5555</h2>");
});

// DATABASE CONNECTION
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_STRING);
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err, "from dbConnection");
  }
};

// SERVER CONNECTION
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
});
