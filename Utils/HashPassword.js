import { serverConfigs } from "../Configs/server-config.js";
import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const rounds = parseInt(serverConfigs.SET_ROUNDS);
  const salt = await bcrypt.genSalt(rounds);
  const encrypted_password = bcrypt.hash(password, salt);
  return encrypted_password;
};
