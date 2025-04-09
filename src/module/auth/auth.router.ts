import express from "express";
import { asyncHandler } from "../../middleware/asyncHandle.middleware";
import AuthController from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/login", asyncHandler(AuthController.login));

export default authRouter;
