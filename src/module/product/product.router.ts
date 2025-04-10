import express from "express";
import ProductController from "./product.controller";
import { asyncHandler } from "../../middleware/asyncHandle.middleware";

const productRouter = express.Router();

productRouter.post(
  "/createProduct",
  asyncHandler(ProductController.createProduct)
);

productRouter.put(
  "/updateProduct",
  asyncHandler(ProductController.updateProduct)
);

productRouter.get(
  "/getListProduct",
  asyncHandler(ProductController.getListProduct)
);

export default productRouter;
