import SuccessResponse from "../Utils/SuccessResponse.js";
import FailureResponse from "../Utils/FailureResponse.js";
import { AppError } from "../Utils/AppError.js";
import { StatusCodes } from "http-status-codes";
import { ReviewService } from "../Services/ReviewService.js";
import Jwt from "jsonwebtoken";
import { serverConfigs } from "../Configs/server-config.js";
import { UserService } from "../Services/UserService.js";

const createReview = async (req, res) => {
  if (!req.body.description.trim() || !req.body.rating.trim()) {
    FailureResponse.message = "Invalid Request";
    return res.status(StatusCodes.BAD_REQUEST).json(FailureResponse);
  }
  Object.keys(req.body).forEach((prop) => {
    if (typeof req.body[prop] === "string") {
      req.body[prop] = req.body[prop].trim();
    }
  });
  try {
    const tokenizedEmail = Jwt.verify(
      req.cookies.auth,
      serverConfigs.SECRET_KEY
    );
    const user = await UserService.getUser({ email: tokenizedEmail });
    const createdReview = await ReviewService.createReview({
      userId: user._id,
      movieId: req.body.movieId,
      bookingId: req.body.bookingId,
      rating: req.body.rating,
      description: req.body.description,
      isPending: req.body.isPending,
      reservationDate: req.body.reservationDate,
    });
    SuccessResponse.message = "Review created successfully";
    SuccessResponse.data = createdReview;
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
      FailureResponse.message = "Review not created due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getAllReviewsByUser = async (req, res) => {
  try {
    const tokenizedEmail = Jwt.verify(
      req.cookies.auth,
      serverConfigs.SECRET_KEY
    );
    const review = await ReviewService.getAllReviewsByUser({
      email: tokenizedEmail,
    });

    SuccessResponse.message =
      "All Reviews By the LoggedIn User successfully retrieved";
    SuccessResponse.data = review;
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
      FailureResponse.message = "Review not retrieved due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const getAllReviews = async (req, res) => {
  try {
    const review = await ReviewService.getAllReviews();
    SuccessResponse.message = "All Reviews are retrieved";
    SuccessResponse.data = review;
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
      FailureResponse.message = "Reviews not retrieved due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const updateReview = async (req, res) => {
  try {
    const tokenizedEmail = Jwt.verify(
      req.cookies.auth,
      serverConfigs.SECRET_KEY
    );
    const user = await UserService.getUser({ email: tokenizedEmail });
    const response = await ReviewService.updateReview({
      id: req.body.id,
      userId: user._id,
      movieId: req.body.movieId,
      bookingId: req.body.bookingId,
      rating: req.body.rating,
      description: req.body.description,
      isPending: req.body.isPending,
      reservationDate: req.body.reservationDate,
    });
    SuccessResponse.message = "Review Updated";
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
      FailureResponse.message = "Review not updated due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

const removeReview = async (req, res) => {
  try {
    const response = await ReviewService.removeReview({
      id: req.body.id,
    });
    SuccessResponse.message = "Review Deleted";
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
      FailureResponse.message = "Review not deleted due to internal error";
      FailureResponse.error = err;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(FailureResponse);
    }
  }
};

export const ReviewController = {
  createReview,
  getAllReviewsByUser,
  getAllReviews,
  updateReview,
  removeReview,
};
