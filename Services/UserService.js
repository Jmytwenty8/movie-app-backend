import { StatusCodes } from "http-status-codes";
import { comparePassword } from "../Utils/Auth.js";
import { AppError } from "../Utils/AppError.js";
import { UserRepository } from "../Repository/UserRepository.js";
import { hashPassword } from "../Utils/HashPassword.js";

const signIn = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail(data);
    if (!user) {
      throw new AppError("Couldn't find the user", StatusCodes.BAD_REQUEST);
    }
    if (!(await comparePassword(data.password, user.password))) {
      console.log("bye bye");
      throw new AppError("Password Incorrect", StatusCodes.BAD_REQUEST);
    }
    return user.toObject();
  } catch (err) {
    throw err;
  }
};

const getUser = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail(data);
    if (!user) {
      throw new AppError("Couldn't find the user", StatusCodes.BAD_REQUEST);
    } else {
      return user.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const signUp = async (data) => {
  try {
    const user = await UserRepository.createUser(data);
    return user.toObject();
  } catch (err) {
    throw err;
  }
};

const removeUser = async (data) => {
  try {
    const response = await UserRepository.removeUser(data.id);
    return response;
  } catch (err) {
    throw err;
  }
};

export const patchUser = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail({ email: data.email });
    if (!user) {
      throw new AppError("Couldn't find the user", StatusCodes.BAD_REQUEST);
    } else {
      if (data.password) {
        data.password = await hashPassword(data.password);
      }
      const response = await UserRepository.patchUser(
        { email: user.email },
        data
      );
      return response.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const updateUser = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail({ email: data.email });
    if (!user) {
      throw new AppError("Couldn't find the user", StatusCodes.BAD_REQUEST);
    } else {
      if (data.password) {
        data.password = await hashPassword(data.password);
      }
      const response = await UserRepository.updateUser(
        { email: user.email },
        data
      );
      return response.toObject();
    }
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await UserRepository.getAllUsers();
    if (!allUsers) {
      throw new AppError("Couldn't find users", StatusCodes.BAD_REQUEST);
    }
    return allUsers;
  } catch (err) {
    throw err;
  }
};

export const getUserById = async (data) => {
  try {
    const user = await UserRepository.getUserById(data.id);
    if (!user) {
      throw new AppError("Couldn't find user", StatusCodes.NOT_FOUND);
    }
    return user;
  } catch (err) {
    throw err;
  }
};
export const UserService = {
  signIn,
  signUp,
  removeUser,
  updateUser,
  patchUser,
  getUser,
  getAllUsers,
  getUserById,
};
