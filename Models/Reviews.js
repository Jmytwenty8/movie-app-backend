import mongoose from "mongoose";

const schemaObject = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true],
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true],
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true],
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
