import express from "express";
import {
  getAllStores,
  getStoresNearest,
} from "../controllers/storesControllers.js";

// import { isValidId } from "../helpers/isValidId.js";
// import { isValidToken } from "../helpers/isValidToken.js";
// import { isOwnerValid } from "../helpers/isOwnerValid.js";

const storesRouter = express.Router();

storesRouter.get("/", getAllStores);

storesRouter.get("/nearest", getStoresNearest);

// contactsRouter.delete(
//   "/:id",
//   isValidToken,
//   isValidId,
//   isOwnerValid,
//   deleteContact
// );

// contactsRouter.post("/", isValidToken, createContact);

// contactsRouter.put(
//   "/:id",
//   isValidToken,
//   isValidId,
//   isOwnerValid,
//   updateContact
// );

// contactsRouter.patch(
//   "/:id/favorite",
//   isValidToken,
//   isValidId,
//   isOwnerValid,
//   favoriteContact
// );

export default storesRouter;
