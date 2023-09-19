import { movies } from "../Models/Movies.js";

const getOneMovie = async (data) => {
  const movie = await movies.findOne({ _id: data.id });
  return movie;
};

const getAllMovies = async () => {
  const moviesList = await movies.find({});
  return moviesList;
};

const createMovie = async (data) => {
  const movie = await movies.create(data);
  return movie;
};

const removeMovie = async (data) => {
  const removedMovie = await movies.deleteOne(data);
  return removedMovie;
};

const updateMovie = async (movie, data) => {
  await movies.deleteOne(movie);
  const newMovie = await movies.create(data);
  return newMovie;
};

const patchMovie = async (movie, data) => {
  const newMovie = await movies.findOneAndUpdate(movie, data);
  return newMovie;
};

export const MovieRepository = {
  getOneMovie,
  getAllMovies,
  createMovie,
  removeMovie,
  updateMovie,
  patchMovie,
};
