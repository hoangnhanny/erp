import express from "express";
import { asyncHandler } from "../../middleware/asyncHandle.middleware";
import AuthController from "./auth.controller";
import { validateRequest } from "../../middleware/validate.middleware";
import { LoginRequest, RegisterDto } from "./auth.dto";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateRequest(LoginRequest),
  asyncHandler(AuthController.login)
);
authRouter.post(
  "/registerUser",
  validateRequest(RegisterDto),
  asyncHandler(AuthController.registerUser)
);

export default authRouter;
