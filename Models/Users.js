import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { serverConfigs } from "../Configs/server-config.js";

const userSchemaObject = {
  name: {
    type: "String",
    required: [true, "Name cannot be empty"],
  },
  userType: {
    type: "String",
    enum: ["user", "admin"],
    default: "user",
  },
  email: {
    type: "String",
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    trim: true,
    lowercase: true,
    required: [true, "Email cannot be empty"],
  },
  number: {
    type: Number,
    required: [true, "Number cannot be empty"],
  },
  wallet: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty"],
  },
};

const userSchema = new mongoose.Schema(userSchemaObject);

userSchema.pre("save", async function (next) {
  try {
    const rounds = parseInt(serverConfigs.SET_ROUNDS);
    const salt = await bcrypt.genSalt(rounds);
    const encrypted_password = bcrypt.hashSync(this.password, salt);
    this.password = encrypted_password;
    return next();
  } catch (err) {
    console.error(err);
  }
});

export const users = mongoose.model("users", userSchema);
