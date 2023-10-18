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
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
  reservationDate: {
    type: Date,
  },
  isPending: {
    type: Boolean,
  },
};

const reviewSchema = new mongoose.Schema(schemaObject);
export const reviews = mongoose.model("reviews", reviewSchema);
