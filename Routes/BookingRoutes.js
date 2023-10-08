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

bookingRouter.get("/allbookings", BookingController.getAllBookings);

bookingRouter.post(
  "/cancel",
  tokenVerification,
  BookingController.cancelBooking
);

bookingRouter.post(
  "/create",
  tokenVerification,
  BookingController.createBooking
);
bookingRouter.post("/vacantseats", BookingController.getVacantSeats);

bookingRouter.post(
  "/bookinginquiry",
  tokenVerification,
  authorizeUserForMovieActions("admin"),
  BookingController.getOneBooking
);
export const bookingRoutes = {
  bookingRouter,
};
