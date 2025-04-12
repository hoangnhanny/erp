import express from "express";
import { asyncHandler } from "../../middleware/asyncHandle.middleware";
import UserController from "./user.controller";
import { validateRequest } from "../../middleware/validate.middleware";
import { UserInput } from "./user.dto";

const userRouter = express.Router();

// Routes
userRouter.post(
  "/createUser",
  validateRequest(UserInput),
  asyncHandler(UserController.createUserHandler)
);

userRouter.get("/getListUser", asyncHandler(UserController.getListUser));

export default userRouter;
