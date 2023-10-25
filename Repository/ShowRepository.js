import { shows } from "../Models/Show.js";

const getOneShow = async (data) => {
  const show = await shows.findOne({ _id: data.id });
  return show;
};

const getAllShows = async () => {
  const showList = await shows.find({});
  return showList;
};

const createShow = async (data) => {
  const show = await shows.create(data);
  return show;
};

const removeShow = async (data) => {
  const show = await shows.findById(data._id);
  const removedShow = await shows.deleteOne(show);
  return removedShow;
};

const updateShow = async (show, data) => {
  const newShow = await shows.findOneAndUpdate(show, data);
  return newShow;
};

export const ShowRepository = {
  getOneShow,
  getAllShows,
  createShow,
  removeShow,
  updateShow,
};
