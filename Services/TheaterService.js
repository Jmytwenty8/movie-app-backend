import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { TheaterRepository } from "../Repository/TheaterRepository.js";

const getOneTheater = async (data) => {
  try {
    const theater = await TheaterRepository.getOneTheater(data);
    if (!theater) {
      throw new AppError("Couldn't find the Theater", StatusCodes.BAD_REQUEST);
    } else {
      return theater.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const getAllTheaters = async () => {
  try {
    const theaterList = await TheaterRepository.getAllTheaters();
    if (!theaterList) {
      throw new AppError("No Theaters Found", StatusCodes.NOT_FOUND);
    }
    return theaterList;
  } catch (err) {
    throw err;
  }
};

const createTheater = async (data) => {
  try {
    const theater = await TheaterRepository.createTheater(data);
    if (!theater) {
      throw new AppError("Theater is not created", StatusCodes.NOT_IMPLEMENTED);
    }
    return theater;
  } catch (err) {
    throw err;
  }
};

const removeTheater = async (data) => {
  try {
    const removedTheater = await TheaterRepository.removeTheater(data);
    return removedTheater;
  } catch (err) {
    throw err;
  }
};

export const patchTheater = async (data) => {
  try {
    const theater = await TheaterRepository.getOneTheater({ _id: data.id });
    if (!theater) {
      throw new AppError("Couldn't find the Theater", StatusCodes.BAD_REQUEST);
    } else {
      const patchedTheater = await TheaterRepository.patchTheater(
        { _id: data.id },
        data
      );
      return patchedTheater.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const updateTheater = async (data) => {
  try {
    const theater = await TheaterRepository.getOneTheater({ _id: data.id });
    if (!theater) {
      throw new AppError("Couldn't find the Theater", StatusCodes.BAD_REQUEST);
    } else {
      const updatedTheater = await TheaterRepository.updateTheater(
        { _id: data.id },
        data
      );
      return updatedTheater.toObject();
    }
  } catch (err) {
    throw err;
  }
};

export const TheaterService = {
  getOneTheater,
  getAllTheaters,
  createTheater,
  removeTheater,
  patchTheater,
  updateTheater,
};
