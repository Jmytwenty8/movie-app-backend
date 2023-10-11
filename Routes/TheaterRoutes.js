import express from "express";
import { TheaterController } from "../Controllers/TheaterController.js";
import {
  tokenVerification,
  authorizeUserForMovieActions,
} from "../Middlewares/AuthMiddleware.js";

const theaterRouter = express.Router();

theaterRouter.get("/", tokenVerification, TheaterController.getAllTheaters);

theaterRouter.post("/inquiry", TheaterController.getOneTheater);

theaterRouter.delete(
  "/delete",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  TheaterController.removeTheater
);

theaterRouter.post(
  "/create",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  TheaterController.createTheater
);

theaterRouter.patch(
  "/update",
  authorizeUserForMovieActions("admin"),
  tokenVerification,
  TheaterController.updateTheater
);

export const theaterRoutes = {
  theaterRouter,
};
