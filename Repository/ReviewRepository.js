import { reviews } from "../Models/Reviews.js";

const getAllReviews = async () => {
  try {
    const allReviews = await reviews.find({});
    return allReviews;
  } catch (err) {
    throw err;
  }
};

const getReviewById = async (id) => {
  try {
    const review = await reviews.findById(id);
    return review;
  } catch (err) {
    throw err;
  }
};

const createReview = async (data) => {
  try {
    const review = await reviews.create(data);
    return review;
  } catch (err) {
    throw err;
  }
};

const removeReview = async (id) => {
  try {
    const removedReview = await reviews.findByIdAndDelete(id);
    return removedReview;
  } catch (err) {
    throw err;
  }
};

const getAllReviewsByUser = async (data) => {
  try {
    const review = await reviews.find({ userId: data.userId });
    return review;
  } catch (err) {
    throw err;
  }
};

const updateReview = async (data) => {
  try {
    const id = data.id;
    delete data.id;
    const newReview = await reviews.findByIdAndUpdate(id, data);
    return newReview;
  } catch (err) {
    throw err;
  }
};

export const ReviewRepository = {
  getAllReviews,
  getReviewById,
  createReview,
  removeReview,
  getAllReviewsByUser,
  updateReview,
};
