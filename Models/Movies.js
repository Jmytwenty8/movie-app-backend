import mongoose from "mongoose";

const schemaObject = {
  name: {
    type: "string",
    required: [true, "Enter Movie Name"],
  },
  description: {
    type: "string",
  },
  imdb: {
    type: Number,
  },
  runtime: {
    type: Number,
  },
  actors: {
    type: ["string"],
  },
  imageUrl: {
    type: "string",
  },
};

const movieSchema = new mongoose.Schema(schemaObject);

export const movies = mongoose.model("movies", movieSchema);
