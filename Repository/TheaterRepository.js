import { theaters } from "../Models/Theaters.js";

const getOneTheater = async (data) => {
  try {
    const theater = await theaters.findOne({ _id: data.id });
    return theater;
  } catch (err) {
    throw err;
  }
};

const getAllTheaters = async () => {
  try {
    const theatersList = await theaters.find({});
    return theatersList;
  } catch (err) {
    throw err;
  }
};

const createTheater = async (data) => {
  try {
    const theater = await theaters.create(data);
    return theater;
  } catch (err) {
    throw err;
  }
};

const removeTheater = async (data) => {
  try {
    const removedTheater = await theaters.deleteOne(data);
    return removedTheater;
  } catch (err) {
    throw err;
  }
};

const updateTheater = async (theater, data) => {
  try {
    const newTheater = await theaters.findOneAndUpdate(theater, data);
    return newTheater;
  } catch (err) {
    throw err;
  }
};

export const TheaterRepository = {
  getOneTheater,
  getAllTheaters,
  createTheater,
  removeTheater,
  updateTheater,
};
