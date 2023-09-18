import express from "express";
import { UserController } from "../Controllers/UserController.js";
import {
  tokenVerification,
  authorizeUser,
} from "../Middlewares/AuthMiddleware.js";

const userRouter = express.Router();

userRouter.post("/create", UserController.signUp);
userRouter.get("/signin", UserController.signIn);
userRouter.delete(
  "/remove",
  tokenVerification,
  authorizeUser("admin"),
  UserController.removeUser
);
userRouter.patch(
  "/patch",
  tokenVerification,
  authorizeUser("admin"),
  UserController.patchUser
);
userRouter.put(
  "/update",
  tokenVerification,
  authorizeUser("admin"),
  UserController.updateUser
);

export const userRoutes = {
  userRouter,
};
