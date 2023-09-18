import express from "express";
import { serverConfigs } from "./Configs/server-config.js";
import { connect } from "./Configs/mongo-config.js";
import { router } from "./Routes/index.js";
import cookie from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router.rootRouter);

app.listen(serverConfigs.PORT, async (err, res) => {
  if (err) {
    console.error(err);
  }
  await connect();
});
