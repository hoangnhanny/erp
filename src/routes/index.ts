import { Router } from "express";
import userRouter from "../module/user/user.router";
import authRouter from "../module/auth/auth.router";

const router = Router();

router.use("/api/user", userRouter);

router.use("/auth/login", authRouter)

export default router;
