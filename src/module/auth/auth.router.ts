import express from "express";
import { asyncHandler } from "../../middleware/asyncHandle.middleware";
import AuthController from "./auth.controller";
import { validateRequest } from "../../middleware/validate.middleware";
import { LoginRequest, RegisterRequest } from "./auth.dto";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateRequest(LoginRequest),
  asyncHandler(AuthController.login)
);
authRouter.post(
  "/registerUser",
  validateRequest(RegisterRequest),
  asyncHandler(AuthController.registerUser)
);

export default authRouter;
