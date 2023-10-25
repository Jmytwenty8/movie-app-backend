import SuccessResponse from "../Utils/SuccessResponse.js";
import FailureResponse from "../Utils/FailureResponse.js";
import { AppError } from "../Utils/AppError.js";
import { StatusCodes } from "http-status-codes";
import { WishlistService } from "../Services/WishlistService.js";
import Jwt from "jsonwebtoken";
import { serverConfigs } from "../Configs/server-config.js";
import { UserService } from "../Services/UserService.js";

const createWishlist = async (req, res) => {
  try {
    const tokenizedEmail = Jwt.verify(
      req.cookies.auth,
      serverConfigs.SECRET_KEY
    );
    const user = await UserService.getUser({ email: tokenizedEmail });
    const createdWishlist = await WishlistService.createWishlist({
      userId: user._id,
      movieId: req.body.movieId,
    });
    SuccessResponse.message = "Wishlist created successfully";
    SuccessResponse.data = createdWishlist;
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
      FailureResponse.message = "Wishlist not created due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getAllWishlistByUser = async (req, res) => {
  try {
    const tokenizedEmail = Jwt.verify(
      req.cookies.auth,
      serverConfigs.SECRET_KEY
    );
    const wishlist = await WishlistService.getAllWishlistByUser({
      email: tokenizedEmail,
    });

    SuccessResponse.message =
      "All Wishlist By the LoggedIn User successfully retrieved";
    SuccessResponse.data = wishlist;
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
      FailureResponse.message = "Wishlist not retrieved due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const removeWishlist = async (req, res) => {
  try {
    const removedWishlist = await WishlistService.removeWishlist({
      id: req.body.id,
    });
    SuccessResponse.message = "Wishlist deleted Successfully";
    SuccessResponse.data = removedWishlist;
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
      FailureResponse.message = "Wishlist not deleted due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

export const WishlistController = {
  createWishlist,
  getAllWishlistByUser,
  removeWishlist,
};
