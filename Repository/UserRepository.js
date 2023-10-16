import { users } from "../Models/Users.js";

const getUserByEmail = async (data) => {
  try {
    const user = await users.findOne({ email: data.email });
    return user;
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await users.find({});
    return allUsers;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (id) => {
  try {
    const user = await users.findById(id);
    return user;
  } catch (err) {
    throw err;
  }
};

const createUser = async (data) => {
  try {
    const user = await users.create(data);
    return user;
  } catch (err) {
    throw err;
  }
};

const removeUser = async (id) => {
  try {
    const removedUser = await users.findByIdAndDelete(id);
    return removedUser;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (user, data) => {
  try {
    await users.deleteOne(user);
    const newUser = await users.create(data);
    return newUser;
  } catch (err) {
    throw err;
  }
};

const patchUser = async (user, data) => {
  try {
    const newUser = await users.findOneAndUpdate(user, data);
    return newUser;
  } catch (err) {
    throw err;
  }
};

export const UserRepository = {
  getUserByEmail,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  patchUser,
  getAllUsers,
};
