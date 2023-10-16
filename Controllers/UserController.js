import SuccessResponse from "../Utils/SuccessResponse.js";
import FailureResponse from "../Utils/FailureResponse.js";
import { UserService } from "../Services/UserService.js";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { createToken } from "../Utils/Auth.js";

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

const patchUser = async (req, res) => {
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
  getUser,
  getAllUsers,
  getUserById,
};
