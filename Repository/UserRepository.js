import { users } from "../Models/Users.js";

const getUserByEmail = async (data) => {
  const user = await users.findOne({ email: data.email });
  return user;
};

const createUser = async (data) => {
  const user = await users.create(data);
  return user;
};

const removeUser = async (user) => {
  const removedUser = await users.deleteOne(user);
  return removedUser;
};

const updateUser = async (user, data) => {
  await users.deleteOne(user);
  const newUser = await users.create(data);
  return newUser;
};

const patchUser = async (user, data) => {
  const newUser = await users.findOneAndUpdate(user, data);
  return newUser;
};

export const UserRepository = {
  getUserByEmail,
  createUser,
  removeUser,
  updateUser,
  patchUser,
};
