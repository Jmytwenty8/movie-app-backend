import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { serverConfigs } from "../Configs/server-config.js";

export const comparePassword = async (suppliedPassword, databasePassword) => {
  try {
    const match = await bcrypt.compare(suppliedPassword, databasePassword);
    if (match) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
  }
};

export const createToken = async (email) => {
  try {
    const token = Jwt.sign(email, serverConfigs.SECRET_KEY);
    return token;
  } catch (err) {
    throw err;
  }
};
