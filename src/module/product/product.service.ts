import { Repository } from "typeorm";
import { Product } from "../../entities/Product";
import { AppDataSource } from "../../config/data-source";
import {
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
} from "./product.dto";
import {
  BadRequestException,
  NotFoundException,
} from "../../exception/Exception";

const productRepository: Repository<Product> =
  AppDataSource.getRepository(Product);

const createProduct = async (
  data: CreateProductRequest
): Promise<CreateProductResponse> => {
  const { sku } = data;

  const existingProduct = await productRepository.findOne({
    where: { sku: sku },
  });
  if (existingProduct) {
    throw new BadRequestException("Product already exists");
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

const getProductById = async (id: string): Promise<Product | null> => {
  const product = await productRepository.findOne({
    where: { id: id },
  });
  return product;
};

const ProductService = {
  createProduct,
  updateProduct,
  getListProduct,
  getProductById,
};

export default ProductService;
