import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { TheaterRepository } from "../Repository/TheaterRepository.js";
import { ShowService } from "./ShowService.js";

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
    const theater = await TheaterRepository.getOneTheater({ id: data._id });
    const allShows = await ShowService.getAllShows();
    allShows.map(async (show) => {
      if (show.theaterId.equals(theater._id)) {
        console.log(theater._id);
        await ShowService.removeShow({ _id: show._id });
      }
    });
    const removedTheater = await TheaterRepository.removeTheater(data);
    return removedTheater;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const updateTheater = async (data) => {
  try {
    const theater = await TheaterRepository.getOneTheater({ id: data.id });
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
  updateTheater,
};
