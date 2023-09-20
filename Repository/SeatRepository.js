import { seats } from "../Models/Seat.js";

const getOneSeat = async (data) => {
  const seat = await seats.findOne({ _id: data.id });
  return seat;
};

const getAllSeats = async () => {
  const seatList = await seats.find({});
  return seatList;
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
};
