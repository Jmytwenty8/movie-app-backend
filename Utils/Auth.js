import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { serverConfigs } from "../Configs/server-config.js";

export const comparePassword = async (databasePassword, suppliedPassword) => {
  try {
    return await bcrypt.compare(databasePassword, suppliedPassword);
  } catch (err) {
    console.error(err);
  }
};

export const createToken = async (email) => {
  const token = Jwt.sign(email, serverConfigs.SECRET_KEY);
  return token;
};
