import SuccessResponse from "../Utils/SuccessResponse.js";
import FailureResponse from "../Utils/FailureResponse.js";
import { AppError } from "../Utils/AppError.js";
import { StatusCodes } from "http-status-codes";
import { BookingService } from "../Services/BookingService.js";
import Jwt from "jsonwebtoken";
import { serverConfigs } from "../Configs/server-config.js";

const getVacantSeats = async (req, res) => {
  try {
    const vacantSeatList = await BookingService.getAllVacantSeats({
      theaterId: req.body.theaterId,
      showtime: req.body.showtime,
      movieId: req.body.movieId,
      reservationDate: req.body.reservationDate,
    });
    SuccessResponse.message = "Vacant Seats Found";
    SuccessResponse.data = vacantSeatList;
    SuccessResponse.availableSeats = vacantSeatList.length;
    res.status(StatusCodes.OK).json(SuccessResponse);
    delete SuccessResponse.availableSeats;
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Seats not Found due to some internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const cancelBooking = async (req, res) => {
  try {
    const tokenizedEmail = Jwt.verify(
      req.cookies.auth,
      serverConfigs.SECRET_KEY
    );
    const removedBooking = await BookingService.removeBooking({
      id: req.body.id,
      email: tokenizedEmail,
    });
    SuccessResponse.message = "Booking canceled";
    SuccessResponse.data = removedBooking;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "Booking not canceled due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const createBooking = async (req, res) => {
  try {
    const tokenizedEmail = Jwt.verify(
      req.cookies.auth,
      serverConfigs.SECRET_KEY
    );
    const createdBooking = await BookingService.createBooking({
      movieId: req.body.movieId,
      theaterId: req.body.theaterId,
      showtime: req.body.showtime,
      seats: req.body.seats,
      reservationDate: req.body.reservationDate,
      email: tokenizedEmail,
    });
    SuccessResponse.message = "Booking created successfully";
    SuccessResponse.data = createdBooking;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Booking not completed due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getAllBookingsByUser = async (req, res) => {
  try {
    const tokenizedEmail = Jwt.verify(
      req.cookies.auth,
      serverConfigs.SECRET_KEY
    );
    const bookingList = await BookingService.getAllBookingsByUser({
      email: tokenizedEmail,
    });

    SuccessResponse.message =
      "All Bookings By the LoggedIn User successfully retrieved";
    SuccessResponse.data = bookingList;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message =
        "Bookings by the user not completed due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getOneBooking = async (req, res) => {
  try {
    const response = await BookingService.getOneBooking({ id: req.body.id });
    SuccessResponse.message = "Booking successfully retrieved";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Booking not found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getAllBookings = async (req, res) => {
  try {
    const response = await BookingService.getAllBookings();
    SuccessResponse.message = "All Bookings successfully retrieved";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Bookings not found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

export const BookingController = {
  getVacantSeats,
  cancelBooking,
  createBooking,
  getOneBooking,
  getAllBookings,
  getAllBookingsByUser,
};
