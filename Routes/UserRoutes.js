import express from "express";
import { UserController } from "../Controllers/UserController.js";
import {
  tokenVerification,
  authorizeUserForUserActions,
  authorizeUserForUserActionsForAdmin,
} from "../Middlewares/AuthMiddleware.js";

const userRouter = express.Router();

userRouter.post("/create", UserController.signUp);
userRouter.post("/login", UserController.signIn);
userRouter.post(
  "/remove",
  tokenVerification,
  authorizeUserForUserActionsForAdmin("admin"),
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
userRouter.get(
  "/",
  tokenVerification,
  authorizeUserForUserActionsForAdmin("admin"),
  UserController.getAllUsers
);
userRouter.get("/getUserById/:id", UserController.getUserById);

export const userRoutes = {
  userRouter,
};
