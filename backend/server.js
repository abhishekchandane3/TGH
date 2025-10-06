import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import inventoryRouter from "./routes/inventoryRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// ✅ Serve uploaded images
app.use("/images", express.static("uploads"));  // For food
app.use("/uploads", express.static("uploads")); // For category

// API Routes
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/category", categoryRouter);

app.get("/", (req, res) => {
  res.send("API IS WORKING");
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
