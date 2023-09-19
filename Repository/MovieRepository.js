import { movies } from "../Models/Movies.js";

const getOneMovie = async (data) => {
  const movie = await movies.findOne({ name: data.name });
  return movie;
};

const getAllMovie = async () => {
  const moviesList = await movies.find({});
  return moviesList;
};

const createMovie = async (data) => {
  const movie = await movies.create(data);
  return movie;
};

const removeMovie = async (data) => {
  const movie = {
    name: data.name,
  };
  const removedMovie = await movies.deleteOne(movie);
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

export const UserRepository = {
  getOneMovie,
  getAllMovie,
  createMovie,
  removeMovie,
  updateMovie,
  patchMovie,
};
