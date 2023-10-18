import express from "express";
import { WishlistController } from "../Controllers/WishlistController.js";
import { tokenVerification } from "../Middlewares/AuthMiddleware.js";

const wishlistRouter = express.Router();

wishlistRouter.post(
  "/create",
  tokenVerification,
  WishlistController.createWishlist
);

wishlistRouter.post(
  "/remove",
  tokenVerification,
  WishlistController.removeWishlist
);

wishlistRouter.get(
  "/",
  tokenVerification,
  WishlistController.getAllWishlistByUser
);

export const wishlistRoutes = {
  wishlistRouter,
};
