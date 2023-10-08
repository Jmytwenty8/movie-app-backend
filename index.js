import express from "express";
import { serverConfigs } from "./Configs/server-config.js";
import { connect } from "./Configs/mongo-config.js";
import { router } from "./Routes/index.js";
import cookie from "cookie-parser";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookie());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router.rootRouter);

app.listen(serverConfigs.PORT, async (err, res) => {
  if (err) {
    console.error(err);
  }
  await connect();
});
