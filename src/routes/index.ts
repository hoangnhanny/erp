import { Router } from "express";
import userRouter from "../module/user/user.router";
import authRouter from "../module/auth/auth.router";
import supplierRouter from "../module/suppliers/supplier.router";
import productRouter from "../module/product/product.router";
import poRouter from "../module/purchase-order/puchaseOrder.router";
import inventoryRouter from "../module/inventory/inventory.router";

const router = Router();

router.use("/api/user", userRouter);

router.use("/auth", authRouter);

router.use("/api/supplier", supplierRouter);

router.use("/api/product", productRouter);

router.use("/api/purchase-order", poRouter);

router.use("/api/inventory", inventoryRouter);

export default router;
