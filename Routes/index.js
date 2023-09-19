import { userRoutes } from "./UserRoutes.js";
import { movieRoutes } from "./MovieRoutes.js";
import express from "express";

const rootRouter = express.Router();
rootRouter.use("/user", userRoutes.userRouter);
rootRouter.use("/movie", movieRoutes.movieRouter);

export const router = {
  rootRouter,
};
