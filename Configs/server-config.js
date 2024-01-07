import dotenv from "dotenv";

dotenv.config();

export const serverConfigs = {
  URI: process.env.URI,
  PORT: process.env.PORT,
  SET_ROUNDS: process.env.SET_ROUNDS,
  SECRET_KEY: process.env.SECRET_KEY,
  MAIL: process.env.MAIL,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_APP_PASSWORD: process.env.MAIL_APP_PASSWORD,
  URL: process.env.URL,
};
