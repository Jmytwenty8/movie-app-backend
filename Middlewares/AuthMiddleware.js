import Jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { serverConfigs } from "../Configs/server-config.js";
import FailureResponse from "../Utils/FailureResponse.js";

export const requireAuth = (req, res, next) => {
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
