import mongoose from "mongoose";

const schemaObject = {
  row: {
    type: String,
    required: [true, "Enter Row for Seat"],
  },
  column: {
    type: Number,
    required: [true, "Enter Column for Seat"],
  },
};

const seatSchema = new mongoose.Schema(schemaObject);

export const seats = mongoose.model("seats", seatSchema);
