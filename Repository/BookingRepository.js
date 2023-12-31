import { bookings } from "../Models/Booking.js";

const getOneBooking = async (data) => {
  const booking = await bookings.findOne({ _id: data.id });
  return booking;
};

const getAllBookings = async () => {
  const bookingList = await bookings.find({});
  return bookingList;
};

const getAllBookingsByUser = async (data) => {
  const bookingList = await bookings.find({ userId: data.userId });
  return bookingList;
};
const createBooking = async (data) => {
  const booking = await bookings.create(data);
  return booking;
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
