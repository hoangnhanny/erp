import { Router } from "express";
import userRouter from "../module/user/user.router";
import authRouter from "../module/auth/auth.router";
import supplierRouter from "../module/suppliers/supplier.router";
import productRouter from "../module/product/product.router";

const router = Router();

router.use("/api/user", userRouter);

router.use("/auth", authRouter);

router.use("/api/supplier", supplierRouter);

router.use("/api/product", productRouter);

export default router;
