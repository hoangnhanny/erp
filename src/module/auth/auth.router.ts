import express from "express";
import { asyncHandler } from "../../middleware/asyncHandle.middleware";
import AuthController from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/login", asyncHandler(AuthController.login));
authRouter.post("/registerUser", asyncHandler(AuthController.registerUser));

export default authRouter;
