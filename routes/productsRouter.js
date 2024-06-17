import express from "express";

const productsRouter = express.Router();
productsRouter.get("/");
productsRouter.get("/:id");
export default productsRouter;
