import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { BookingRepository } from "../Repository/BookingRepository.js";
import { TheaterRepository } from "../Repository/TheaterRepository.js";
import { SeatService } from "../Repository/SeatService.js";
import { UserRepository } from "../Repository/UserRepository.js";
import { TheaterRepository } from "../Repository/TheaterRepository.js";

const getOneBooking = async (data) => {
  try {
    const booking = await BookingRepository.getOneBooking(data);
    if (!booking) {
      throw new AppError({
        message: "Couldn't find the booking",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      return booking.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const getAllBookings = async () => {
  try {
    const bookingList = await BookingRepository.getAllBookings();
    if (!bookingList) {
      throw new AppError({
        message: "No bookings Found",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return bookingList;
  } catch (err) {
    throw err;
  }
};

const getAllBookingsByUser = async (data) => {
  try {
    const bookingList = await BookingRepository.getAllBookingsByUser(data);
    if (!bookingList) {
      throw new AppError({
        message: "Couldn't get any bookings by the user",
        statusCode: StatusCodes.NO_CONTENT,
      });
    }
    return bookingList;
  } catch (err) {
    throw err;
  }
};

const bookedSeats = async (theaterId, showtime, movieId) => {
  let seats = [];
  const allBookingData = await BookingRepository.getAllBookings();
  const filteredBookings = allBookingData.filter((filter) => {
    return (
      filter.movieId === movieId &&
      filter.theaterId === theaterId &&
      filter.showtime === showtime
    );
  });
  filteredBookings.map((seat) => {
    seats.push(seat);
  });
  seats = seats.flat();
  return seats;
};

const createBooking = async (data) => {
  try {
    const seats = data.seats;
    const seatIds = seats.map((seat) => {
      const [row, column] = seat.split("");
      return SeatService.getSeatIdByRowAndColumn(row, column);
    });
    delete data.seats;
    data.seats = seatIds;
    const user = await UserRepository.getUserByEmail({ email: data.email });
    const theater = await TheaterRepository.getOneTheater(data.theaterId);
    const cost = theater.cost * data.seats.length;
    if (cost > user.wallet) {
      throw new AppError({
        message: "Booking is not created due to low balance",
        statusCode: StatusCodes.NOT_IMPLEMENTED,
      });
    }
    const booking = await BookingRepository.createBooking(data);
    if (!booking) {
      throw new AppError({
        message: "Booking is not created",
        statusCode: StatusCodes.NOT_IMPLEMENTED,
      });
    }
    return booking;
  } catch (err) {
    throw err;
  }
};

const removeBooking = async (data) => {
  try {
    const removedBooking = await BookingRepository.removeBooking(data);
    return removedBooking;
  } catch (err) {
    throw err;
  }
};

export const BookingService = {
  getOneBooking,
  getAllBookings,
  createBooking,
  removeBooking,
  bookedSeats,
  getAllBookingsByUser,
};
