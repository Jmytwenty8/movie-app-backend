import express from "express";
import { ShowController } from "../Controllers/ShowController.js";
import {
  tokenVerification,
  authorizeUserForMovieActions,
} from "../Middlewares/AuthMiddleware.js";

const showRouter = express.Router();

showRouter.get(
  "/",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  ShowController.getAllShows
);

showRouter.get(
  "/inquiry",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  ShowController.getOneShow
);

showRouter.delete(
  "/delete",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  ShowController.removeShow
);

showRouter.post(
  "/create",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  ShowController.createShow
);

showRouter.patch(
  "/update",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  ShowController.updateShow
);

export const showRoutes = {
  showRouter,
};
