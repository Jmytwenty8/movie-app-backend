import { StatusCodes } from "http-status-codes";
import { AppError } from "../Utils/AppError.js";
import { ReviewRepository } from "../Repository/ReviewRepository.js";
import { UserRepository } from "../Repository/UserRepository.js";

const createReview = async (data) => {
  try {
    const review = await ReviewRepository.createReview(data);
    return review;
  } catch (err) {
    throw err;
  }
};

const removeReview = async (data) => {
  try {
    const removedReview = await ReviewRepository.removeReview(data.id);
    return removedReview;
  } catch (err) {
    throw err;
  }
};

const getAllReviewsByUser = async (data) => {
  try {
    const user = await UserRepository.getUserByEmail({ email: data.email });
    const review = await ReviewRepository.getAllReviewsByUser({
      userId: user._id,
    });
    if (!review) {
      throw new AppError(
        "Couldn't get any review by the user",
        StatusCodes.NO_CONTENT
      );
    }
    return review;
  } catch (err) {
    throw err;
  }
};

const getAllReviews = async () => {
  try {
    const reviews = await ReviewRepository.getAllReviews();
    if (!reviews) {
      throw new AppError("Couldn't get any review", StatusCodes.NO_CONTENT);
    }
    return reviews;
  } catch (err) {
    throw err;
  }
};

const updateReview = async (data) => {
  try {
    const updatedReview = await ReviewRepository.updateReview(data);
    return updatedReview.toObject();
  } catch (err) {
    throw err;
  }
};

export const ReviewService = {
  createReview,
  removeReview,
  getAllReviewsByUser,
  getAllReviews,
  updateReview,
};
