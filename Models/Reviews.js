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
    validate: {
      validator: (v) => {
        if (v < 1 || v > 5) {
          return false;
        }
        return true;
      },
      message: "Rating must be between 1 and 5",
    },
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
