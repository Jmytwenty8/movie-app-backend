import express from "express";
import { ReviewController } from "../Controllers/ReviewController.js";
import { tokenVerification } from "../Middlewares/AuthMiddleware.js";

const reviewRouter = express.Router();

reviewRouter.post("/create", tokenVerification, ReviewController.createReview);

reviewRouter.get("/", tokenVerification, ReviewController.getAllReviewsByUser);

reviewRouter.get(
  "/allreviews",
  tokenVerification,
  ReviewController.getAllReviews
);

reviewRouter.post("/update", tokenVerification, ReviewController.updateReview);

export const reviewRoutes = {
  reviewRouter,
};
