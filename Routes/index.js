import { userRoutes } from "./UserRoutes.js";
import express from "express";

const rootRouter = express.Router();
rootRouter.use("/user", userRoutes.userRouter);

export const router = {
  rootRouter,
};
