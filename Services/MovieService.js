import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { MovieRepository } from "../Repository/MovieRepository.js";
import { ShowService } from "./ShowService.js";
import { WishlistService } from "./WishlistService.js";

const getOneMovie = async (data) => {
  try {
    const movie = await MovieRepository.getOneMovie(data);
    const shows = await ShowService.getAllShows();
    const theatersAndShowtime = shows.filter((show) => {
      return show.movieId == data.id;
    });
    const movieData = movie.toObject();
    movieData.shows = theatersAndShowtime;
    if (!movieData) {
      throw new AppError("Couldn't find the Movie", StatusCodes.BAD_REQUEST);
    } else {
      return movieData;
    }
  } catch (err) {
    throw err;
  }
};

const getAllMovies = async () => {
  try {
    const movieList = await MovieRepository.getAllMovies();
    if (!movieList) {
      throw new AppError("No Movies Found", StatusCodes.NOT_FOUND);
    }
    return movieList;
  } catch (err) {
    throw err;
  }
};

const createMovie = async (data) => {
  try {
    if (data.imdb > 10 || data.imdb < 0 || data.runtime < 0) {
      throw new AppError("Invalid Data", StatusCodes.BAD_REQUEST);
    }
    const allMovies = await MovieRepository.getAllMovies();
    const movieExists = allMovies.find((movie) => {
      return movie.name.toLowerCase() === data.name.toLowerCase();
    });
    if (movieExists) {
      throw new AppError("Movie already exists", StatusCodes.BAD_REQUEST);
    }
    const movie = await MovieRepository.createMovie(data);
    if (!movie) {
      throw new AppError("Movie is not created", StatusCodes.BAD_REQUEST);
    }
    return movie;
  } catch (err) {
    throw err;
  }
};

const removeMovie = async (data) => {
  try {
    const allShows = await ShowService.getAllShows();
    allShows.map(async (show) => {
      if (show.movieId.equals(data._id)) {
        await ShowService.removeShow({ _id: show._id });
      }
    });
    const allWishlists = await WishlistService.getAllWishlist();
    allWishlists.map(async (wishlist) => {
      if (wishlist.movieId.equals(data._id)) {
        await WishlistService.removeWishlist({ id: wishlist._id });
      }
    });
    const removedMovie = await MovieRepository.removeMovie(data);
    return removedMovie;
  } catch (err) {
    throw err;
  }
};

export const patchMovie = async (data) => {
  try {
    const movie = await MovieRepository.getOneMovie({ name: data.name });
    if (!movie) {
      throw new AppError("Couldn't find the Movie", StatusCodes.BAD_REQUEST);
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
      throw new AppError("Couldn't find the Movie", StatusCodes.BAD_REQUEST);
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

export const MovieService = {
  getOneMovie,
  getAllMovies,
  createMovie,
  removeMovie,
  patchMovie,
  updateMovie,
};
