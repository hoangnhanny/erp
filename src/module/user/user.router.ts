import express from "express";

import { asyncHandler } from "../../middleware/asyncHandle.middleware";
import UserController from "./user.controller";

const userRouter = express.Router();

// Routes
userRouter.post("/createUser", asyncHandler(UserController.createUserHandler));

export default userRouter;
