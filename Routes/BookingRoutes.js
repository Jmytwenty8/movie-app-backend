import express from "express";
import { BookingController } from "../Controllers/BookingController.js";
import {
  tokenVerification,
  authorizeUserForMovieActions,
} from "../Middlewares/AuthMiddleware.js";

const bookingRouter = express.Router();

bookingRouter.get("/booked", BookingController.getAllBookingsByUser);

bookingRouter.get(
  "/allbookings",
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
  "/createbooking",
  tokenVerification,
  BookingController.createBooking
);
bookingRouter.post(
  "/vacantseats",
  tokenVerification,
  BookingController.getVacantSeats
);

bookingRouter.post(
  "/bookinginquiry",
  tokenVerification,
  authorizeUserForMovieActions("admin"),
  BookingController.getOneBooking
);
export const bookingRoutes = {
  bookingRouter,
};
