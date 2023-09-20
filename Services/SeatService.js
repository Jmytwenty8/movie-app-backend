import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { SeatRepository } from "../Repository/SeatRepository.js";

const getOneSeat = async (data) => {
  try {
    const seat = await SeatRepository.getOneSeat(data);
    if (!seat) {
      throw new AppError({
        message: "Couldn't find the Seat",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      return seat.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const getSeatIdByRowAndColumn = async (row, column) => {
  try {
    const seatId = await this.getSeatIdByRowAndColumn(row, column);
    if (!seatId) {
      throw new AppError({
        message: "Couldn't find the Seat",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      return seat.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const getAllSeats = async () => {
  try {
    const seatList = await SeatRepository.getAllSeats();
    if (!seatList) {
      throw new AppError({
        message: "No seats Found",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return seatList;
  } catch (err) {
    throw err;
  }
};

const createSeat = async (data) => {
  try {
    const seat = await SeatRepository.createSeat(data);
    if (!seat) {
      throw new AppError({
        message: "Seat is not created",
        statusCode: StatusCodes.NOT_IMPLEMENTED,
      });
    }
    return seat;
  } catch (err) {
    throw err;
  }
};

const removeSeat = async (data) => {
  try {
    const removedSeat = await SeatRepository.removeSeat(data);
    return removedSeat;
  } catch (err) {
    throw err;
  }
};

export const patchSeat = async (data) => {
  try {
    const seat = await SeatRepository.getOneSeat({ _id: data.id });
    if (!seat) {
      throw new AppError({
        message: "Couldn't find the seat",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      const patchedSeat = await SeatRepository.patchSeat(
        { _id: data.id },
        data
      );
      return patchedSeat.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const updateSeat = async (data) => {
  try {
    const seat = await SeatRepository.getOneSeat({ _id: data.id });
    if (!seat) {
      throw new AppError({
        message: "Couldn't find the seat",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      const updatedSeat = await SeatRepository.updateSeat(
        { _id: data.id },
        data
      );
      return updatedSeat.toObject();
    }
  } catch (err) {
    throw err;
  }
};

export const SeatService = {
  getOneSeat,
  getAllSeats,
  createSeat,
  removeSeat,
  patchSeat,
  updateSeat,
  getSeatIdByRowAndColumn,
};
