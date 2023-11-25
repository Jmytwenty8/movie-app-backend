import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { ShowRepository } from "../Repository/ShowRepository.js";
import { BookingService } from "./BookingService.js";
import { UserService } from "./UserService.js";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween.js";

dayjs.extend(isBetween);

const getOneShow = async (data) => {
  try {
    const show = await ShowRepository.getOneShow(data);
    if (!show) {
      throw new AppError("Couldn't find the show", StatusCodes.BAD_REQUEST);
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
      throw new AppError("No shows Found", StatusCodes.NOT_FOUND);
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
      throw new AppError("Show is not created", StatusCodes.NOT_IMPLEMENTED);
    }
    return show;
  } catch (err) {
    throw err;
  }
};

const removeShow = async (data) => {
  try {
    const show = await ShowRepository.getOneShow({ id: data._id });
    const allBookings = await BookingService.getAllBookings();
    allBookings.forEach(async (booking) => {
      if (
        booking.showtime === show.showtime &&
        dayjs(booking.reservationDate).isBetween(
          dayjs(show.startDate),
          dayjs(show.endDate),
          null,
          "[]"
        ) &&
        booking.theaterId.equals(show.theaterId) &&
        booking.movieId.equals(show.movieId)
      ) {
        const user = await UserService.getUserById({ id: booking.userId });
        await BookingService.removeBooking({
          id: booking._id,
          email: user.email,
        });
      }
    });
    const removedShow = await ShowRepository.removeShow(data);
    return removedShow;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const patchShow = async (data) => {
  try {
    const show = await ShowRepository.getOneShow({ _id: data.id });
    if (!show) {
      throw new AppError("Couldn't find the show", StatusCodes.BAD_REQUEST);
    } else {
      const patchedShow = await ShowRepository.patchShow(
        { _id: data.id },
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
    const show = await ShowRepository.getOneShow({ id: data.id });
    if (!show) {
      throw new AppError("Couldn't find the show", StatusCodes.BAD_REQUEST);
    } else {
      const updatedShow = await ShowRepository.updateShow(
        { _id: data.id },
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
