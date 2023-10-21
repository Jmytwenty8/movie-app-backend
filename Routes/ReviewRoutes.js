import express from "express";
import { ReviewController } from "../Controllers/ReviewController.js";
import {
  tokenVerification,
  authorizeUserForMovieActions,
} from "../Middlewares/AuthMiddleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/create", tokenVerification, ReviewController.createReview);

reviewRouter.get("/", tokenVerification, ReviewController.getAllReviewsByUser);

reviewRouter.get(
  "/allreviews",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  ReviewController.getAllReviews
);

reviewRouter.post("/update", tokenVerification, ReviewController.updateReview);
reviewRouter.post("/remove", tokenVerification, ReviewController.removeReview);

export const reviewRoutes = {
  reviewRouter,
};
