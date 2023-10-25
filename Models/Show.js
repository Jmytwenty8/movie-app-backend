import mongoose from "mongoose";

const schemaObject = {
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  showtime: {
    type: String,
    enum: ["morning", "afternoon", "evening", "night"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
};

const showSchema = new mongoose.Schema(schemaObject);
export const shows = mongoose.model("shows", showSchema);
