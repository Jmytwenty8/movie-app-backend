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
};

const wishlistSchema = new mongoose.Schema(schemaObject);
export const wishlists = mongoose.model("wishlists", wishlistSchema);
