import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { ShowRepository } from "../Repository/ShowRepository.js";

const getOneShow = async (data) => {
  try {
    const show = await ShowRepository.getOneShow(data);
    if (!show) {
      throw new AppError({
        message: "Couldn't find the show",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      return show.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const getAllShows = async () => {
  try {
    const showList = await ShowRepository.getAllShows();
    if (!showList) {
      throw new AppError({
        message: "No shows Found",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return showList;
  } catch (err) {
    throw err;
  }
};

const createShow = async (data) => {
  try {
    const show = await ShowRepository.createShow(data);
    if (!show) {
      throw new AppError({
        message: "Show is not created",
        statusCode: StatusCodes.NOT_IMPLEMENTED,
      });
    }
    return show;
  } catch (err) {
    throw err;
  }
};

const removeShow = async (data) => {
  try {
    const removedShow = await ShowRepository.removeShow(data);
    return removedShow;
  } catch (err) {
    throw err;
  }
};

export const patchShow = async (data) => {
  try {
    const show = await ShowRepository.getOneShow({ name: data.name });
    if (!show) {
      throw new AppError({
        message: "Couldn't find the show",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      const patchedShow = await ShowRepository.patchShow(
        { name: show.name },
        data
      );
      return patchedShow.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const updateShow = async (data) => {
  try {
    const show = await ShowRepository.getOneShow({ name: data.name });
    if (!show) {
      throw new AppError({
        message: "Couldn't find the show",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      const updatedShow = await ShowRepository.updateShow(
        { name: show.name },
        data
      );
      return updatedShow.toObject();
    }
  } catch (err) {
    throw err;
  }
};

export const ShowService = {
  getOneShow,
  getAllShows,
  createShow,
  removeShow,
  patchShow,
  updateShow,
};
