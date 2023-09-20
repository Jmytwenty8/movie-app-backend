import SuccessResponse from "../Utils/SuccessResponse.js";
import FailureResponse from "../Utils/FailureResponse.js";
import { SeatService } from "../Services/SeatService.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";

const createSeat = async (req, res) => {
  try {
    const response = await SeatService.createSeat({
      row: req.body.row,
      column: req.body.column,
    });
    SuccessResponse.message = "Seat Created";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Seat not created due to some internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getOneSeat = async (req, res) => {
  try {
    const Seat = {
      id: req.body.id,
    };
    const response = await SeatService.getOneSeat(Seat);
    SuccessResponse.message = "Seat Found";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Seat not found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getAllSeats = async (req, res) => {
  try {
    const response = await SeatService.getAllSeats();
    SuccessResponse.message = "Seats Found";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Seats not found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const removeSeat = async (req, res) => {
  try {
    const Seat = {
      _id: req.body.id,
    };

    const response = await SeatService.removeSeat(Seat);
    SuccessResponse.message = "Seat Removed";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Seat not removed due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const updateSeat = async (req, res) => {
  try {
    const response = await SeatService.updateSeat({
      id: req.body.id,
      row: req.body.row,
      column: req.body.column,
    });
    SuccessResponse.message = "Seat Updated";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Seat not updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const patchSeat = async (req, res) => {
  try {
    const response = await SeatService.patchSeat({
      id: req.body.id,
      row: req.body.row,
      column: req.body.column,
    });
    SuccessResponse.message = "Seat Patch Updated";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else {
      FailureResponse.message = "Seat not patch updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

export const SeatController = {
  createSeat,
  getOneSeat,
  getAllSeats,
  updateSeat,
  patchSeat,
  removeSeat,
};
