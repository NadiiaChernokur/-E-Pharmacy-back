import { Schema, model } from "mongoose";

const userSchems = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },

  token: {
    type: String,
    default: "",
  },
});

export const User = model("user", userSchems);
