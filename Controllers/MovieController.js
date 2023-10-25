import SuccessResponse from "../Utils/SuccessResponse.js";
import FailureResponse from "../Utils/FailureResponse.js";
import { MovieService } from "../Services/MovieService.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";

const createMovie = async (req, res) => {
  try {
    const response = await MovieService.createMovie({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      imdb: req.body.imdb,
      runtime: req.body.runtime,
      actors: req.body.actors,
    });
    SuccessResponse.message = "Movie Created";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "Movie not created due to some internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getOneMovie = async (req, res) => {
  try {
    const movie = {
      id: req.params.id,
    };
    const response = await MovieService.getOneMovie(movie);
    SuccessResponse.message = "Movie Found";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Movie not found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getAllMovies = async (req, res) => {
  try {
    const response = await MovieService.getAllMovies();
    SuccessResponse.message = "Movies Found";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Movies not found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const removeMovie = async (req, res) => {
  try {
    const movie = {
      _id: req.params.id,
    };

    const response = await MovieService.removeMovie(movie);
    SuccessResponse.message = "Movie Removed";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Movie not removed due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const updateMovie = async (req, res) => {
  try {
    const response = await MovieService.updateMovie({
      name: req.body.name,
      imageUrl: req.body.image,
      description: req.body.description,
      imdb: req.body.imdb,
      runtime: req.body.runtime,
      actors: req.body.actors,
    });
    SuccessResponse.message = "Movie Updated";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Movie not updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const patchMovie = async (req, res) => {
  try {
    const response = await MovieService.patchMovie({
      name: req.body.name,
      imageUrl: req.body.image,
      description: req.body.description,
      imdb: req.body.imdb,
      runtime: req.body.runtime,
      actors: req.body.actors,
    });
    SuccessResponse.message = "Movie Patch Updated";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Movie not patch updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

export const MovieController = {
  createMovie,
  getOneMovie,
  getAllMovies,
  updateMovie,
  patchMovie,
  removeMovie,
};
