import dotenv from "dotenv";

dotenv.config();

export const serverConfigs = {
  URI: process.env.URI,
  PORT: process.env.PORT,
  SET_ROUNDS: process.env.SET_ROUNDS,
  SECRET_KEY: process.env.SECRET_KEY,
};
