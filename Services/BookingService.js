import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { BookingRepository } from "../Repository/BookingRepository.js";
import { TheaterRepository } from "../Repository/TheaterRepository.js";
import { SeatService } from "../Services/SeatService.js";
import { UserRepository } from "../Repository/UserRepository.js";

const getOneBooking = async (data) => {
  try {
    const booking = await BookingRepository.getOneBooking(data);
    if (!booking) {
      throw new AppError("Couldn't find the booking", StatusCodes.BAD_REQUEST);
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
      throw new AppError("No bookings Found", StatusCodes.NOT_FOUND);
    }
    return bookingList;
  } catch (err) {
    throw err;
  }
};

const getAllBookingsByUser = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail({ email: data.email });
    const bookingList = await BookingRepository.getAllBookingsByUser({
      id: user._id,
    });
    if (!bookingList) {
      throw new AppError(
        "Couldn't get any bookings by the user",
        StatusCodes.NO_CONTENT
      );
    }
    return bookingList;
  } catch (err) {
    throw err;
  }
};

const bookedSeats = async (theaterId, showtime, movieId) => {
  try {
    let seats = [];
    const allBookingData = await BookingRepository.getAllBookings();
    if (!allBookingData) {
      throw new AppError("No bookings", StatusCodes.BAD_REQUEST);
    }
    const filteredBookings = allBookingData.filter((seat) => {
      return (
        seat.movieId.toString() == movieId &&
        seat.theaterId.toString() == theaterId &&
        seat.showtime.toString() == showtime
      );
    });
    filteredBookings.map((seat) => {
      seats.push(
        seat.seats.map((s) => {
          return s.toString();
        })
      );
    });
    seats = seats.flat();
    return seats;
  } catch (err) {
    throw err;
  }
};

const getAllVacantSeats = async (theaterId, showtime, movieId) => {
  try {
    const filledSeatIds = await BookingService.bookedSeats(
      theaterId,
      showtime,
      movieId
    );
    const vacantSeats = await SeatService.getAllVacantSeats(filledSeatIds);
    if (!vacantSeats) {
      throw new AppError(
        "All seats are booked for this show",
        StatusCodes.BAD_REQUEST
      );
    }
    return vacantSeats;
  } catch (err) {
    throw err;
  }
};
const createBooking = async (data) => {
  try {
    const seats = data.seats;
    const seatIdPromise = seats.map(async (seat) => {
      const [row, column] = seat.split("");
      const id = await SeatService.getSeatIdByRowAndColumn(row, column);
      return id;
    });

    const seatIds = await Promise.all(seatIdPromise);
    const vacantSeats = await BookingService.getAllVacantSeats(
      data.theaterId,
      data.movieId,
      data.showtime
    );
    const checkAllowedSeats = vacantSeats.filter((seat) => {
      return seatIds.includes(seat._id.toString());
    });

    if (checkAllowedSeats.length < seatIds.length) {
      throw new AppError(
        "Chosen seats are already booked",
        StatusCodes.BAD_REQUEST
      );
    }
    delete data.seats;
    data.seats = seatIds;
    const user = await UserRepository.getUserByEmail({ email: data.email });
    const theater = await TheaterRepository.getOneTheater({
      id: data.theaterId,
    });
    const amountToBeCharged = theater.price * data.seats.length;
    if (amountToBeCharged > user.wallet) {
      throw new AppError(
        "Booking is not created due to low balance",
        StatusCodes.BAD_REQUEST
      );
    }
    data.userId = user._id;
    delete data.email;
    const booking = await BookingRepository.createBooking(data);
    if (!booking) {
      throw new AppError("Booking is not created", StatusCodes.BAD_REQUEST);
    }
    await UserRepository.patchUser(user, {
      wallet: user.wallet - amountToBeCharged,
    });
    return booking;
  } catch (err) {
    throw err;
  }
};

const removeBooking = async (data) => {
  try {
    const booking = await BookingRepository.getOneBooking(data);
    const theater = await TheaterRepository.getOneTheater({
      id: booking.theaterId,
    });
    const amountToBeRefunded = theater.price * booking.seats.length;
    const user = await UserRepository.getUserByEmail({ email: data.email });
    const removedBooking = await BookingRepository.removeBooking(data);
    await UserRepository.patchUser(user, {
      wallet: user.wallet + amountToBeRefunded,
    });
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
  getAllVacantSeats,
};
