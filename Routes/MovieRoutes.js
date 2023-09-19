import express from "express";
import { MovieController } from "../Controllers/MovieController.js";
import {
  tokenVerification,
  authorizeUserForMovieActions,
} from "../Middlewares/AuthMiddleware.js";
import { movies } from "../Models/Movies.js";

const movieRouter = express.Router();

movieRouter.post(
  "/create",
  tokenVerification,
  authorizeUserForMovieActions("admin"),
  MovieController.createMovie
);
movieRouter.get("/", MovieController.getAllMovies);
movieRouter.get("/:id", MovieController.getOneMovie);
movieRouter.delete(
  "/remove/:id",
  tokenVerification,
  authorizeUserForMovieActions("admin"),
  MovieController.removeMovie
);
movieRouter.patch(
  "/patch",
  tokenVerification,
  authorizeUserForMovieActions("admin"),
  MovieController.patchMovie
);
movieRouter.put(
  "/update",
  tokenVerification,
  authorizeUserForMovieActions("admin"),
  MovieController.updateMovie
);

export const movieRoutes = {
  movieRouter,
};
