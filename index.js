import express from "express";
import { serverConfigs } from "./Configs/server-config.js";
import { connect } from "./Configs/mongo-config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(serverConfigs.PORT, async (err, res) => {
  if (err) {
    console.error(err);
  }
  await connect();
});
