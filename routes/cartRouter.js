import express from "express";

const cartRouter = express.Router();
cartRouter.get("/");
cartRouter.put("/update");
cartRouter.post("/checkout");
export default cartRouter;
