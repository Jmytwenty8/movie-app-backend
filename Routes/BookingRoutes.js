import express from "express";
import { BookingController } from "../Controllers/BookingController.js";
import {
  tokenVerification,
  authorizeUserForMovieActions,
} from "../Middlewares/AuthMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.get(
  "/booked",
  tokenVerification,
  BookingController.getAllBookingsByUser
);

bookingRouter.get(
  "/allBookings",
  tokenVerification,
  authorizeUserForMovieActions("admin"),
  BookingController.getAllBookings
);

bookingRouter.post(
  "/cancel",
  tokenVerification,
  authorizeUserForMovieActions("admin"),
  BookingController.cancelBooking
);

bookingRouter.post(
  "/createBooking",
  tokenVerification,
  BookingController.createBooking
);
bookingRouter.post(
  "/vacantSeats",
  tokenVerification,
  BookingController.getVacantSeats
);

bookingRouter.post(
  "/bookingInquiry",
  tokenVerification,
  authorizeUserForMovieActions("admin"),
  BookingController.getOneBooking
);
export const bookingRoutes = {
  bookingRouter,
};
