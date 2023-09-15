import express from "express";
import { UserController } from "../Controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/create", UserController.signUp);
userRouter.get("/signin", UserController.signIn);
userRouter.post("/remove", UserController.removeUser);
userRouter.patch("/patch", UserController.patchUser);
userRouter.put("/update", UserController.updateUser);

export const userRoutes = {
  userRouter,
};
