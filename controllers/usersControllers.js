import { User } from "../db/user.js";
import { createUserSchema, loginUserSchema } from "../schemas/userSchemas.js";
import RegisterHttpError from "../helpers/RegisterHttpError.js";
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";

// import { nanoid } from "nanoid";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
// import { sendEmail } from "../helpers/verifyUser.js";

dotenv.config();
const { SECRET_KEY } = process.env;

export const createUser = async (req, res, next) => {
  try {
    const { error } = createUserSchema.validate(req.body);
    if (error) throw RegisterHttpError(error);
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    next(error);
  }
};
// export const toVerifyUser = async (req, res, next) => {
//   try {
//     const { verificationToken } = req.params;

//     const user = await User.findOne({ verificationToken });

//     if (!user) throw HttpError(401, "Email not found");
//     await User.findByIdAndUpdate(user._id, {
//       verify: true,
//       verificationToken: "",
//     });
//     res.json({ messege: "Verification successful " });
//   } catch (error) {
//     next(error);
//   }
// };
// export const resendVerifyUser = async (req, res, next) => {
//   try {
//     const { error } = emailUserSchema.validate(req.body);

//     if (error) throw RegisterHttpError(error);
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) throw HttpError(401, "Email not found");
//     if (user.verify) throw HttpError(401, "Email alredy verify");
//     const verifyEmail = {
//       to: email,
//       subject: "Verify email",
//       html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
//     };
//     await sendEmail(verifyEmail);
//     res.json({ messege: "Verify email send success" });
//   } catch (error) {
//     next(error);
//   }
// };

export const loginUser = async (req, res, next) => {
  try {
    const { error } = loginUserSchema.validate(req.body);
    if (error) throw RegisterHttpError(error);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) throw HttpError(401, "Email or password is wrong");
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) throw HttpError(401, "Email or password is wrong");

    const payload = { id: user._id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3d" });
    console.log(token);
    console.log(SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "No Content" });
};

export const getUser = async (req, res, next) => {
  const { email, name } = req.user;
  res.status(200).json({ email, name });
};

// export const changeSubscription = async (req, res, next) => {
//   try {
//     const { _id } = req.user;

//     if (Object.keys(req.body).length === 0)
//       throw HttpError(400, "missing field Subscription");

//     const { error } = updateSubscription.validate(req.body);
//     if (error)
//       throw HttpError(
//         400,
//         "Choose one of three values: 'starter', 'pro', 'business'"
//       );

//     const update = await User.findByIdAndUpdate(_id, req.body, { new: true });
//     if (!update) throw HttpError(404);

//     res.json({ message: "Subscription updated successfully" });
//   } catch (error) {
//     next(error);
//   }
// };
