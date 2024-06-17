import express from "express";
import morgan from "morgan";
import cors from "cors";
import storesRouter from "./routes/storesRouter.js";
import usersRouter from "./routes/usersRouters.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productsRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import customerRouter from "./routes/customerRouter.js";
import { Review } from "./db/review.js";
// import { avatarsDir } from "./helpers/upload.js";

dotenv.config();
const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = express();
// app.use("/avatars", express.static(avatarsDir));
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use("/api/user", usersRouter);
app.use("/api/stores", storesRouter);
app.use("/api/customer-reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    console.log(reviews);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.message.includes("E11000")) {
    console.log(err.message);
    return res.status(409).json({ Messege: "Email in use" });
  }
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
