import { userRoutes } from "./UserRoutes.js";
import { movieRoutes } from "./MovieRoutes.js";
import express from "express";
import { bookingRoutes } from "./BookingRoutes.js";

const rootRouter = express.Router();
rootRouter.use("/user", userRoutes.userRouter);
rootRouter.use("/movie", movieRoutes.movieRouter);
rootRouter.use("/booking", bookingRoutes.bookingRouter);

export const router = {
  rootRouter,
};
