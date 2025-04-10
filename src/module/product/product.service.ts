import { Repository } from "typeorm";
import { Product } from "../../entities/Product";
import { AppDataSource } from "../../config/data-source";
import {
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from "./product.model";
import { NotFoundException } from "../../exception/NotFoundException";
import { BadRequestException } from "../../exception/BadRequestException";

const productRepository: Repository<Product> =
  AppDataSource.getRepository(Product);

const createProduct = async (
  data: CreateProductRequest
): Promise<CreateProductResponse> => {
  const { name, sku } = data;
  if (!name || !sku) {
    throw new BadRequestException("Missing required fields");
  }
  const existingProduct = await productRepository.findOne({
    where: { sku: sku },
  });
  if (existingProduct) {
    throw new NotFoundException("Product already exists");
  }
  const product = productRepository.create(data);
  await productRepository.save(product);

  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    category: product.category ?? null,
    unitPrice: product.unitPrice ?? 0,
    stock: product.stock,
    pendingStock: product.pendingStock,
  };
};

const updateProduct = async (
  data: UpdateProductRequest
): Promise<UpdateProductResponse> => {
  const { id, name, category, unitPrice, stock, pendingStock } = data;
  if (!id) {
    throw new BadRequestException("Missing required fields");
  }
  const existingProduct = await productRepository.findOne({
    where: { id: id },
  });
  if (!existingProduct) {
    throw new NotFoundException("Product not found");
  }

  const dataUpdate = {
    ...existingProduct,
    name: name ?? existingProduct.name,
    category: category ?? existingProduct.category,
    unitPrice: unitPrice ?? existingProduct.unitPrice,
    stock: stock ?? existingProduct.stock,
    pendingStock: pendingStock ?? existingProduct.pendingStock,
  };

  const product = productRepository.create(dataUpdate);
  await productRepository.save(product);

  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    category: product.category ?? null,
    unitPrice: product.unitPrice ?? 0,
    stock: product.stock,
    pendingStock: product.pendingStock,
  };
};

const getListProduct = async (): Promise<Product[]> => {
  const products = await productRepository.find();
  return products;
};

const ProductService = {
  createProduct,
  updateProduct,
  getListProduct,
};

export default ProductService;
