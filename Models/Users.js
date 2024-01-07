import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { serverConfigs } from "../Configs/server-config.js";

const noSpacesValidator = {
  validator: function (value) {
    return !/^\s|\s$/.test(value);
  },
  message: "Field cannot contain blank spaces at the start or end",
};

const userSchemaObject = {
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
    validate: noSpacesValidator,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
    trim: true,
    lowercase: true,
    required: [true, "Email cannot be empty"],
    validate: noSpacesValidator,
  },
  number: {
    type: String,
    validate: {
      validator: function (number) {
        return /^\+91(?!0)([\d\s.-]{10})$/.test(number);
      },
      message: "Please enter a valid phone number",
    },
  },
  wallet: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value);
      },
      message:
        "Password must be at least 8 characters long and include both letters and digits",
    },
    required: [true, "Password cannot be empty"],
    validate: noSpacesValidator,
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

userSchema.set("validateBeforeSave", true);

export const users = mongoose.model("users", userSchema);
