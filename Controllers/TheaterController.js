import SuccessResponse from "../Utils/SuccessResponse.js";
import FailureResponse from "../Utils/FailureResponse.js";
import { TheaterService } from "../Services/TheaterService.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";

const createTheater = async (req, res) => {
  try {
    const response = await TheaterService.createTheater({
      id: req.body.id,
      name: req.body.name,
      location: req.body.location,
      movies: req.body.movies,
    });
    SuccessResponse.message = "Theater Created";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message =
        "Theater not created due to some internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getOneTheater = async (req, res) => {
  try {
    const theater = {
      id: req.body.id,
    };
    const response = await TheaterService.getOneTheater(theater);
    SuccessResponse.message = "Theater Found";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Theater not found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getAllTheaters = async (req, res) => {
  try {
    const response = await TheaterService.getAllTheaters();
    SuccessResponse.message = "Theaters Found";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Theaters not found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const removeTheater = async (req, res) => {
  try {
    const theater = {
      _id: req.body.id,
    };

    const response = await TheaterService.removeTheater(theater);
    SuccessResponse.message = "Theater Removed";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Theater not removed due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const updateTheater = async (req, res) => {
  try {
    const response = await TheaterService.updateTheater({
      id: req.body.id,
      name: req.body.name,
      location: req.body.location,
      movies: req.body.movies,
    });
    SuccessResponse.message = "Theater Updated";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Theater not updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const patchTheater = async (req, res) => {
  try {
    const response = await TheaterService.patchTheater({
      id: req.body.id,
      name: req.body.name,
      location: req.body.location,
      movies: req.body.movies,
    });
    SuccessResponse.message = "Theater Patch Updated";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message =
        "Theater not patch updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

export const TheaterController = {
  createTheater,
  getOneTheater,
  getAllTheaters,
  updateTheater,
  patchTheater,
  removeTheater,
};
