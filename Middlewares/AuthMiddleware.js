import Jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { serverConfigs } from "../Configs/server-config.js";
import FailureResponse from "../Utils/FailureResponse.js";
import { UserRepository } from "../Repository/UserRepository.js";

export const tokenVerification = (req, res, next) => {
  const token = req.cookies.auth;
  if (!token) {
    FailureResponse.message = "Token is required";
    FailureResponse.error.StatusCodes = StatusCodes.BAD_REQUEST;
    return res.status(StatusCodes.BAD_REQUEST).json(FailureResponse);
  }

  Jwt.verify(token, serverConfigs.SECRET_KEY, (err) => {
    if (err) {
      FailureResponse.message = "Token verification Failed";
      FailureResponse.error.StatusCodes = StatusCodes.UNAUTHORIZED;
      return res.status(StatusCodes.UNAUTHORIZED).json(FailureResponse);
    } else {
      next();
    }
  });
};

export const authorizeUserForUserActions = (role) => {
  return async (req, res, next) => {
    try {
      const user = await UserRepository.getUserByEmail(req.body);
      const tokenizedEmail = Jwt.verify(
        req.cookies.auth,
        serverConfigs.SECRET_KEY
      );
      if (user.role !== role && tokenizedEmail !== user.email) {
        FailureResponse.message = "User not authorized to complete the task";
        FailureResponse.error.StatusCodes = StatusCodes.FORBIDDEN;
        return res.status(StatusCodes.FORBIDDEN).json(FailureResponse);
      } else {
        next();
      }
    } catch (err) {
      FailureResponse.message = "User not found";
      FailureResponse.error.StatusCodes = StatusCodes.NOT_FOUND;
      return res.status(StatusCodes.NOT_FOUND).json(FailureResponse);
    }
  };
};

export const authorizeUserForMovieActions = (role) => {
  return async (req, res, next) => {
    const tokenizedEmail = Jwt.verify(
      req.cookies.auth,
      serverConfigs.SECRET_KEY
    );

    const user = await UserRepository.getUserByEmail({ email: tokenizedEmail });
    if (role !== user.role) {
      FailureResponse.message = "User not authorized to complete the task";
      FailureResponse.error.StatusCodes = StatusCodes.FORBIDDEN;
      return res.status(StatusCodes.FORBIDDEN).json(FailureResponse);
    } else {
      next();
    }
  };
};
