import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { MovieRepository } from "../Repository/MovieRepository.js";

const getOneMovie = async (data) => {
  try {
    const movie = await MovieRepository.getOneMovie(data);
    if (!movie) {
      throw new AppError({
        message: "Couldn't find the Movie",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      return movie.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const getAllMovies = async () => {
  try {
    const movieList = await MovieRepository.getAllMovies({});
    if (!movieList) {
      throw new AppError({
        message: "No Movies Found",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return movieList;
  } catch (err) {
    throw err;
  }
};

const createMovie = async (data) => {
  try {
    const movie = await MovieRepository.createMovie(data);
    if (!movie) {
      throw new AppError({
        message: "Movie is not created",
        statusCode: StatusCodes.NOT_IMPLEMENTED,
      });
    }
    return movie;
  } catch (err) {
    throw err;
  }
};

const removeMovie = async (data) => {
  try {
    const removedMovie = await MovieRepository.removeMovie(data);
    if (removedMovie.toObject().deletedCount === 0) {
      throw new AppError({
        message: "Movie was not deleted!",
      });
    }
    return removedMovie;
  } catch (err) {
    throw err;
  }
};

export const patchMovie = async (data) => {
  try {
    const movie = await MovieRepository.getOneMovie({ name: data.name });
    if (!movie) {
      throw new AppError({
        message: "Couldn't find the Movie",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      const patchedMovie = await MovieRepository.patchMovie(
        { name: movie.name },
        data
      );
      return patchedMovie.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const updateMovie = async (data) => {
  try {
    const movie = await MovieRepository.getOneMovie({ name: data.name });
    if (!movie) {
      throw new AppError({
        message: "Couldn't find the Movie",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      const updatedMovie = await MovieRepository.updateMovie(
        { name: movie.name },
        data
      );
      return updatedMovie.toObject();
    }
  } catch (err) {
    throw err;
  }
};

export const UserService = {
  getOneMovie,
  getAllMovies,
  createMovie,
  removeMovie,
  patchMovie,
  updateMovie,
};
