import express from "express";
import { addToCart, addToOrders } from "../controllers/cardControllers.js";
import { isValidToken } from "../helpers/isValidToken.js";

const cartRouter = express.Router();
cartRouter.get("/");
cartRouter.put("/update", isValidToken, addToCart);
cartRouter.post("/checkout", addToOrders);
export default cartRouter;
