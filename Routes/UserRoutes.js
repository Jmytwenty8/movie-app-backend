import express from "express";
import { UserController } from "../Controllers/UserController.js";
import {
  tokenVerification,
  authorizeUserForUserActions,
} from "../Middlewares/AuthMiddleware.js";

const userRouter = express.Router();

userRouter.post("/create", UserController.signUp);
userRouter.post("/login", UserController.signIn);
userRouter.delete(
  "/remove",
  tokenVerification,
  authorizeUserForUserActions("admin"),
  UserController.removeUser
);
userRouter.post("/patch", tokenVerification, UserController.patchUser);
userRouter.post("/getUser", UserController.getUser);
userRouter.put(
  "/update",
  tokenVerification,
  authorizeUserForUserActions("admin"),
  UserController.updateUser
);

export const userRoutes = {
  userRouter,
};
