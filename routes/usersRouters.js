import express from "express";
import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} from "../controllers/usersControllers.js";
import { isValidToken } from "../helpers/isValidToken.js";
// import { getNewAvatar, upload } from "../helpers/upload.js";

const usersRouter = express.Router();
// usersRouter.patch("/", isValidToken, changeSubscription);
usersRouter.post("/register", createUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/logout", isValidToken, logoutUser);
usersRouter.get("/user-info", isValidToken, getUser);
// usersRouter.patch(
//   "/avatars",
//   isValidToken,
//   upload.single("avatar"),
//   getNewAvatar
// );
// usersRouter.get("/verify/:verificationToken", toVerifyUser);
// usersRouter.post("/verify", resendVerifyUser);

export default usersRouter;
