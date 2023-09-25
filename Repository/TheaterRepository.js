import { theaters } from "../Models/Theaters.js";

const getOneTheater = async (data) => {
  const theater = await theaters.findOne({ _id: data.id });
  return theater;
};

const getAllTheaters = async () => {
  const theatersList = await theaters.find({});
  return theatersList;
};

const createTheater = async (data) => {
  const theater = await theaters.create(data);
  return theater;
};

const removeTheater = async (data) => {
  const removedTheater = await theaters.deleteOne(data);
  return removedTheater;
};

const updateTheater = async (theater, data) => {
  const newTheater = await theaters.findOneAndUpdate(theater, data);
  return newTheater;
};

export const TheaterRepository = {
  getOneTheater,
  getAllTheaters,
  createTheater,
  removeTheater,
  updateTheater,
};
