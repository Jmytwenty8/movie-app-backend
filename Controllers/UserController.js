import SuccessResponse from "../Utils/SuccessResponse.js";
import FailureResponse from "../Utils/FailureResponse.js";
import { UserService } from "../Services/UserService.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { createToken } from "../Utils/Auth.js";
import Jwt from "jsonwebtoken";
import { serverConfigs } from "../Configs/server-config.js";

const signUp = async (req, res) => {
  try {
    const response = await UserService.signUp({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      wallet: req.body.wallet,
      role: req.body.role,
      number: req.body.number,
    });
    delete response.password;
    SuccessResponse.message = "User Created";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.code === 11000) {
      FailureResponse.message = "User already exists";
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "User not created due to some internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const signIn = async (req, res) => {
  try {
    const response = await UserService.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    delete response.password;
    const token = await createToken(response.email);
    res.cookie("auth", token);
    SuccessResponse.message = "User SignedIn";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "User not signedIn due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await UserService.getAllUsers();
    SuccessResponse.message = "Users Found";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "User not Found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const resetPassword = async (req, res) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (
    !req.body.password ||
    req.body.password.length < 8 ||
    !passwordRegex.test(req.body.password)
  ) {
    FailureResponse.message =
      "Password must be at least 8 characters long and include both letters and digits";
    return res.status(StatusCodes.BAD_REQUEST).json(FailureResponse);
  }
  try {
    const tokenizedEmail = Jwt.verify(req.body.token, serverConfigs.SECRET_KEY);
    const response = await UserService.patchUser({
      email: tokenizedEmail,
      password: req.body.password,
    });
    SuccessResponse.message = "Password Reset Successfully";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "User not Found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const forgetPassword = async (req, res) => {
  try {
    const response = await UserService.forgetPassword({
      email: req.body.email,
    });
    SuccessResponse.message = "Reset Password Link Sent to your Email";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "User not Found due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};
const removeUser = async (req, res) => {
  try {
    const response = await UserService.removeUser({
      id: req.body.id,
    });
    SuccessResponse.message = "User Removed";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "User not removed due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const response = await UserService.updateUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      number: req.body.number,
      role: req.body.role,
      wallet: req.body.wallet,
    });
    delete response.password;
    SuccessResponse.message = "User Updated";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "User not updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getUser = async (req, res) => {
  try {
    const response = await UserService.getUser({
      email: req.body.email,
    });
    SuccessResponse.message = "User Found";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "User not patch updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getUserById = async (req, res) => {
  try {
    const user = {
      id: req.params.id,
    };
    const response = await UserService.getUserById(user);
    SuccessResponse.message = "User Found";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.code === 11000) {
      FailureResponse.message = "User already exists";
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "User not created due to some internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const patchUserPassword = async (req, res) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (
    !req.body.password ||
    req.body.password.length < 8 ||
    !passwordRegex.test(req.body.password)
  ) {
    FailureResponse.message =
      "Password must be at least 8 characters long and include both letters and digits";
    return res.status(StatusCodes.BAD_REQUEST).json(FailureResponse);
  }
  try {
    const response = await UserService.patchUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      number: req.body.number,
      role: req.body.role,
      wallet: req.body.wallet,
    });

    delete response.password;
    SuccessResponse.message = "User Patch Updated";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "User not patch updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const patchUser = async (req, res) => {
  const validateNumber = (number) => {
    const isValidMobileNumber = /^\+91(?!0)([\d\s.-]{10})$/.test(number);
    return isValidMobileNumber;
  };

  if (!req.body.name || !req.body.email || !validateNumber(req.body.number)) {
    FailureResponse.message = "Invalid Data for patching user";
    return res.status(StatusCodes.BAD_REQUEST).json(FailureResponse);
  }

  try {
    const response = await UserService.patchUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      number: req.body.number,
      role: req.body.role,
      wallet: req.body.wallet,
    });

    delete response.password;

    SuccessResponse.message = "User Patch Updated";
    SuccessResponse.data = response;
    res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (err) {
    if (err instanceof AppError) {
      FailureResponse.message = err.message;
      res.status(err.statusCode).json(FailureResponse);
    } else if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      FailureResponse.message = message;
      res.status(StatusCodes.NOT_ACCEPTABLE).json(FailureResponse);
    } else {
      FailureResponse.message = "User not patch updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

export const UserController = {
  signUp,
  signIn,
  removeUser,
  updateUser,
  patchUser,
  patchUserPassword,
  getUser,
  getAllUsers,
  getUserById,
  forgetPassword,
  resetPassword,
};
