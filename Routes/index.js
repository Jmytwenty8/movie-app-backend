import { userRoutes } from "./UserRoutes.js";
import { movieRoutes } from "./MovieRoutes.js";
import express from "express";
import { bookingRoutes } from "./BookingRoutes.js";
import { showRoutes } from "./ShowRoutes.js";
import { theaterRoutes } from "./TheaterRoutes.js";

const rootRouter = express.Router();
rootRouter.use("/user", userRoutes.userRouter);
rootRouter.use("/movie", movieRoutes.movieRouter);
rootRouter.use("/booking", bookingRoutes.bookingRouter);
rootRouter.use("/show", showRoutes.showRouter);
rootRouter.use("/theater", theaterRoutes.theaterRouter);

export const router = {
  rootRouter,
};
