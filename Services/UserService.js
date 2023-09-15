import { StatusCodes } from "http-status-codes";
import { comparePassword } from "../Utils/Auth.js";
import { AppError } from "../Utils/AppError.js";
import { UserRepository } from "../Repository/UserRepository.js";
import { hashPassword } from "../Utils/HashPassword.js";

const signIn = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail(data);
    if (!user) {
      throw new AppError({
        message: "Couldn't find the user",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else if (!comparePassword(user.password, data.password)) {
      throw new AppError({
        message: "Password Incorrect",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      return user;
    }
  } catch (err) {
    throw err;
  }
};

const signUp = async (data) => {
  try {
    const user = await UserRepository.createUser(data);
    return user;
  } catch (err) {
    throw err;
  }
};

const removeUser = async (data) => {
  try {
    const response = await UserRepository.removeUser(data);
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (filter, data) => {
  try {
    const user = await UserRepository.getUserByEmail(filter);
    if (!user) {
      throw new AppError({
        message: "Couldn't find the user",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      if (data.password) {
        console.log("Initial" + data.password);
        data.password = await hashPassword(data.password);
        console.log("After Hash" + data.password);
      }
      const response = await UserRepository.updateUser(
        { email: user.email },
        data
      );
      return response;
    }
  } catch (err) {
    throw err;
  }
};

export const UserService = {
  signIn,
  signUp,
  removeUser,
  updateUser,
};
