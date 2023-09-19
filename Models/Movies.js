import mongoose from "mongoose";

const schemaObject = {
  name: {
    type: "string",
    required: [true, "Enter Movie Name"],
  },
  image: {
    type: "string",
  },
  description: {
    type: "string",
  },
  imdb: {
    type: number,
  },
  runtime: {
    type: number,
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
