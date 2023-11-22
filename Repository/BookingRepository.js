import { bookings } from "../Models/Booking.js";

const getOneBooking = async (data) => {
  try {
    const booking = await bookings.findOne({ _id: data.id });
    return booking;
  } catch (err) {
    throw err;
  }
};

const getAllBookings = async () => {
  try {
    const bookingList = await bookings.find({});
    return bookingList;
  } catch (err) {
    throw err;
  }
};

const getAllBookingsByUser = async (data) => {
  try {
    const bookingList = await bookings.find({ userId: data.userId });
    return bookingList;
  } catch (err) {
    throw err;
  }
};
const createBooking = async (data) => {
  try {
    const booking = await bookings.create(data);
    return booking;
  } catch (err) {
    throw err;
  }
};

const removeBooking = async (data) => {
  // console.log(data);
  try {
    const removedBooking = await bookings.findByIdAndDelete(data.id);
    return removedBooking;
  } catch (err) {
    throw err;
  }
};

export const BookingRepository = {
  getOneBooking,
  getAllBookings,
  createBooking,
  removeBooking,
  getAllBookingsByUser,
};
