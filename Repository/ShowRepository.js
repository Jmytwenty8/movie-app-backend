import { shows } from "../Models/Show.js";

const getOneShow = async (data) => {
  try {
    const show = await shows.findOne({ _id: data.id });
    return show;
  } catch (err) {
    throw err;
  }
};

const getAllShows = async () => {
  try {
    const showList = await shows.find({});
    return showList;
  } catch (err) {
    throw err;
  }
};

const createShow = async (data) => {
  try {
    const show = await shows.create(data);
    return show;
  } catch (err) {
    throw err;
  }
};

const removeShow = async (data) => {
  try {
    const show = await shows.findById(data._id);
    const removedShow = await shows.deleteOne(show);
    return removedShow;
  } catch (err) {
    throw err;
  }
};

const updateShow = async (show, data) => {
  try {
    const newShow = await shows.findOneAndUpdate(show, data);
    return newShow;
  } catch (err) {
    throw err;
  }
};

export const ShowRepository = {
  getOneShow,
  getAllShows,
  createShow,
  removeShow,
  updateShow,
};
