import express from "express";
import {
  getProductToId,
  getProducts,
  getProductsCategory,
} from "../controllers/productsControllers.js";

const productsRouter = express.Router();
productsRouter.get("/", getProducts);
productsRouter.get("/categories", getProductsCategory);
// productsRouter.get("/:id", getProductToId);
productsRouter.post("/getByIds", getProductToId);

export default productsRouter;
