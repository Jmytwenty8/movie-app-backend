import { userRoutes } from "./UserRoutes.js";
import { movieRoutes } from "./MovieRoutes.js";
import express from "express";
import { bookingRoutes } from "./BookingRoutes.js";
import { showRoutes } from "./ShowRoutes.js";
import { theaterRoutes } from "./TheaterRoutes.js";
import { seatRoutes } from "./SeatRoutes.js";
import { wishlistRoutes } from "./WishlistRoutes.js";

const rootRouter = express.Router();
rootRouter.use("/user", userRoutes.userRouter);
rootRouter.use("/movie", movieRoutes.movieRouter);
rootRouter.use("/booking", bookingRoutes.bookingRouter);
rootRouter.use("/show", showRoutes.showRouter);
rootRouter.use("/theater", theaterRoutes.theaterRouter);
rootRouter.use("/seat", seatRoutes.seatRouter);
rootRouter.use("/wishlist", wishlistRoutes.wishlistRouter);

export const router = {
  rootRouter,
};
