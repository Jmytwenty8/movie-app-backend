import { movies } from "../Models/Movies.js";

const getOneMovie = async (data) => {
  try {
    const movie = await movies.findOne({ _id: data.id });
    return movie;
  } catch (err) {
    throw err;
  }
};

const getAllMovies = async () => {
  try {
    const moviesList = await movies.find({});
    return moviesList;
  } catch (err) {
    throw err;
  }
};

const createMovie = async (data) => {
  try {
    const movie = await movies.create(data);
    return movie;
  } catch (err) {
    throw err;
  }
};

const removeMovie = async (data) => {
  try {
    const removedMovie = await movies.deleteOne(data);
    return removedMovie;
  } catch (err) {
    throw err;
  }
};

const updateMovie = async (movie, data) => {
  try {
    await movies.deleteOne(movie);
    const newMovie = await movies.create(data);
    return newMovie;
  } catch (err) {
    throw err;
  }
};

const patchMovie = async (movie, data) => {
  try {
    const newMovie = await movies.findOneAndUpdate(movie, data);
    return newMovie;
  } catch (err) {
    throw err;
  }
};

export const MovieRepository = {
  getOneMovie,
  getAllMovies,
  createMovie,
  removeMovie,
  updateMovie,
  patchMovie,
};
