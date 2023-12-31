import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { SeatRepository } from "../Repository/SeatRepository.js";

const getOneSeat = async (data) => {
  try {
    const seat = await SeatRepository.getOneSeat(data);
    if (!seat) {
      throw new AppError("Couldn't find the Seat", StatusCodes.BAD_REQUEST);
    } else {
      return seat.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const getSeatIdByRowAndColumn = async (row, column) => {
  try {
    const seatId = await SeatRepository.getSeatIdByRowAndColumn(row, column);
    return seatId;
  } catch (err) {
    throw err;
  }
};

const getAllSeats = async () => {
  try {
    const seatList = await SeatRepository.getAllSeats();
    if (!seatList) {
      throw new AppError("No seats Found", StatusCodes.NOT_FOUND);
    }
    return seatList;
  } catch (err) {
    throw err;
  }
};

const getAllVacantSeats = async (filledSeatIds) => {
  try {
    const AllSeatIdList = await SeatRepository.getAllSeats();
    const vacantList = AllSeatIdList.filter((list) => {
      return !filledSeatIds.includes(list._id.toString());
    });
    if (!vacantList) {
      throw new AppError("All Seats Filled", StatusCodes.BAD_REQUEST);
    }
    return vacantList;
  } catch (err) {
    throw err;
  }
};

const createSeat = async (data) => {
  try {
    const seat = await SeatRepository.createSeat(data);
    if (!seat) {
      throw new AppError("Seat is not created", StatusCodes.BAD_REQUEST);
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

const updateSeat = async (data) => {
  try {
    const seat = await SeatRepository.getOneSeat({ id: data.id });
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
  updateSeat,
  getSeatIdByRowAndColumn,
  getAllVacantSeats,
};
