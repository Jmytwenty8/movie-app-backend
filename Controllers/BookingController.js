import SuccessResponse from "../Utils/SuccessResponse.js";
import FailureResponse from "../Utils/FailureResponse.js";
import { BookingService } from "../Services/BookingService.js";

const getVacantSeats = async (req, res) => {
  try {
    const vacantSeatList = await BookingService.getAllVacantSeats({
      movieId: req.body.movieId,
      theaterId: req.body.theaterId,
      showtime: req.body.showtime,
    });
    SuccessResponse.message = "Vacant Seats Found";
    SuccessResponse.data = vacantSeatList;
    res.status(StatusCodes.OK).json(SuccessResponse);
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

export const BookingController = {
  getVacantSeats,
  cancelBooking,
  createBooking,
};
