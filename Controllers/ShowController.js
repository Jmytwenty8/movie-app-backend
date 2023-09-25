import SuccessResponse from "../Utils/SuccessResponse.js";
import FailureResponse from "../Utils/FailureResponse.js";
import { ShowService } from "../Services/ShowService.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";

const createShow = async (req, res) => {
  try {
    const response = await ShowService.createShow({
      theaterId: req.body.theaterId,
      movieId: req.body.movieId,
      showtime: req.body.showtime,
    });
    SuccessResponse.message = "Show Created";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Show not created due to some internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getOneShow = async (req, res) => {
  try {
    const show = {
      id: req.body.id,
    };
    const response = await ShowService.getOneShow(show);
    SuccessResponse.message = "Show Found";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Show not found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getAllShows = async (req, res) => {
  try {
    const response = await ShowService.getAllShows();
    SuccessResponse.message = "Shows Found";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Shows not found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const removeShow = async (req, res) => {
  try {
    const show = {
      _id: req.body.id,
    };

    const response = await ShowService.removeShow(show);
    SuccessResponse.message = "Show Removed";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Show not removed due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const updateShow = async (req, res) => {
  try {
    const response = await ShowService.updateShow({
      id: req.body.id,
      theater: req.body.theater,
      movie: req.body.movie,
      showtime: req.body.showtime,
    });
    SuccessResponse.message = "Show Updated";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Show not updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

export const ShowController = {
  createShow,
  getOneShow,
  getAllShows,
  updateShow,
  removeShow,
};
