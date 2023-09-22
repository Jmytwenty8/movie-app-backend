import { seats } from "../Models/Seat.js";

const getOneSeat = async (data) => {
  const seat = await seats.findOne({ _id: data.id });
  return seat;
};

const getAllSeats = async () => {
  const seatList = await seats.find({});
  return seatList;
};

const getSeatIdByRowAndColumn = async (row, column) => {
  const seat = await seats.findOne({ row: row, column: column });
  return seat._id.toString();
};
const createSeat = async (data) => {
  const seat = await seats.create(data);
  return seat;
};

const removeSeat = async (data) => {
  const removedSeat = await seats.deleteOne(data);
  return removedSeat;
};

const updateSeat = async (seat, data) => {
  await seats.deleteOne(seat);
  const newSeat = await seats.create(data);
  return newSeat;
};

const patchSeat = async (seat, data) => {
  const newSeat = await seats.findOneAndUpdate(seat, data);
  return newSeat;
};

export const SeatRepository = {
  getOneSeat,
  getAllSeats,
  createSeat,
  removeSeat,
  updateSeat,
  patchSeat,
  getSeatIdByRowAndColumn,
};
