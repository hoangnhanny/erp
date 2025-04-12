import express from "express";
import ProductController from "./product.controller";
import { asyncHandler } from "../../middleware/asyncHandle.middleware";
import { validateRequest } from "../../middleware/validate.middleware";
import { CreateProductRequest, UpdateProductRequest } from "./product.dto";

const productRouter = express.Router();

productRouter.post(
  "/createProduct",
  validateRequest(CreateProductRequest),
  asyncHandler(ProductController.createProduct)
);

productRouter.put(
  "/updateProduct",
  validateRequest(UpdateProductRequest),
  asyncHandler(ProductController.updateProduct)
);

productRouter.get(
  "/getListProduct",
  asyncHandler(ProductController.getListProduct)
);

export default productRouter;
