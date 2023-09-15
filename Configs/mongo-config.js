import mongoose from "mongoose";
import { serverConfigs } from "./server-config.js";

export const connect = async () => {
  try {
    await mongoose.connect(serverConfigs.URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};
