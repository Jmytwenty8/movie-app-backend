import mongoose from "mongoose";

const schemaObject = {
  name: {
    type: String,
    required: [true, "Enter Theater Name"],
  },
  location: {
    type: String,
    required: [true, "Enter Location"],
  },
  totalSeats: {
    type: Number,
    default: 200,
  },
  movies: {
    type: [mongoose.Schema.Types.ObjectId],
  },
};

const theaterSchema = new mongoose.Schema(schemaObject);

export const theaters = mongoose.model("theaters", theaterSchema);
