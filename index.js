import express from "express";
import { serverConfigs } from "./Configs/server-config.js";
import { connect } from "./Configs/mongo-config.js";
import { router } from "./Routes/index.js";
import cookie from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import nodemailer from "nodemailer";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

export const transporter = nodemailer.createTransport({
  service: serverConfigs.MAIL_SERVICE,
  host: serverConfigs.MAIL_HOST,
  port: serverConfigs.MAIL_PORT,
  secure: false,
  auth: {
    user: serverConfigs.MAIL,
    pass: serverConfigs.MAIL_APP_PASSWORD,
  },
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookie());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router.rootRouter);
app.use(morgan("dev"));

app.listen(serverConfigs.PORT, async (err, res) => {
  if (err) {
    console.error(err);
  }
  await connect();
});
