import express from "express";
import { SeatController } from "../Controllers/SeatController.js";
import {
  tokenVerification,
  authorizeUserForMovieActions,
} from "../Middlewares/AuthMiddleware.js";

const seatRouter = express.Router();

seatRouter.get(
  "/",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  SeatController.getAllSeats
);

seatRouter.get(
  "/inquiry",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  SeatController.getOneSeat
);

seatRouter.delete(
  "/delete",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  SeatController.removeSeat
);

seatRouter.post(
  "/create",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  SeatController.createSeat
);

seatRouter.patch(
  "/update",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  SeatController.updateSeat
);

export const seatRoutes = {
  seatRouter,
};
