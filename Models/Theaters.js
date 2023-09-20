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
  seats: {
    type: Number,
    default: 100,
  },
  price: {
    type: Number,
    default: 200,
  },
};

const theaterSchema = new mongoose.Schema(schemaObject);

export const theaters = mongoose.model("theaters", theaterSchema);
