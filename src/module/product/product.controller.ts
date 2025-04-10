import { Product } from "../../entities/Product";
import { ResponseData } from "../../model/response.type";
import { CreateProductResponse, UpdateProductResponse } from "./product.model";
import ProductService from "./product.service";
import { Request } from "express";

const createProduct = async (
  req: Request
): Promise<ResponseData<CreateProductResponse>> => {
  try {
    const product = await ProductService.createProduct(req.body);
    return {
      status: 201,
      message: "Product created successfully",
      data: product,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

const updateProduct = async (
  req: Request
): Promise<ResponseData<UpdateProductResponse>> => {
  try {
    const product = await ProductService.updateProduct(req.body);
    return {
      status: 200,
      message: "Product updated successfully",
      data: product,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

const getListProduct = async (
  req: Request
): Promise<ResponseData<Product[]>> => {
  try {
    const products = await ProductService.getListProduct();
    return {
      status: 200,
      message: "Products retrieved successfully",
      data: products,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

const ProductController = {
  createProduct,
  updateProduct,
  getListProduct,
};
export default ProductController;
