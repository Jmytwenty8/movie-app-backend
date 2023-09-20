import mongoose from "mongoose";

const schemaObject = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Enter User ID for Booking"],
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Enter Movie ID for Booking"],
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Enter Theater ID for Booking"],
  },
  showtime: {
    type: String,
  },
  seats: {
    type: [mongoose.Schema.Types.ObjectId],
  },
};

const bookingSchema = new mongoose.Schema(schemaObject);
export const bookings = mongoose.model("bookings", bookingSchema);
