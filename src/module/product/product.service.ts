import { Repository } from "typeorm";
import { Product } from "../../entities/Product";
import { AppDataSource } from "../../config/data-source";
import {
  CreateProductDto,
  CreateProductResponse,
  UpdateProductDto,
  UpdateProductResponse,
} from "./product.dto";
import {
  BadRequestException,
  NotFoundException,
} from "../../exception/Exception";
import AuditLogService from "../audit-logs/auditLogs.service";

const productRepository: Repository<Product> =
  AppDataSource.getRepository(Product);

const entity = "Product";

const createProduct = async (
  data: CreateProductDto
): Promise<CreateProductResponse> => {
  const { sku } = data;
  const existingProduct = await productRepository.findOne({
    where: { sku: sku },
  });
  if (existingProduct) {
    throw new BadRequestException("Product already exists");
  }
  return await AppDataSource.transaction(async (manager) => {
    const product = manager.create(Product, {
      ...data,
      sku: sku,
    });
    await manager.save(product);

    // Add audit logs
    const auditLogData: AuditLogsRequest = {
      action: "create",
      entityType: entity,
      entityId: data.userId,
      userId: data.userId,
      changes: product,
    };
    await AuditLogService.createAudit(auditLogData);

    return {
      id: product.id,
      name: product.name,
      sku: product.sku,
      category: product.category ?? null,
      unitPrice: product.unitPrice ?? 0,
      stock: product.stock,
      pendingStock: product.pendingStock,
    };
  });
};

const updateProduct = async (
  data: UpdateProductDto
): Promise<UpdateProductResponse> => {
  const { id, name, category, unitPrice, stock, pendingStock, userId } = data;

  const existingProduct = await productRepository.findOne({
    where: { id: id },
  });
  if (!existingProduct) {
    throw new NotFoundException("Product not found");
  }

  return await AppDataSource.transaction(async (manager) => {
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

    // Add audit logs
    const auditLogData: AuditLogsRequest = {
      action: "update",
      entityType: entity,
      entityId: data.id,
      userId: userId,
      changes: product,
    };

    await AuditLogService.createAudit(auditLogData);

    return {
      id: product.id,
      name: product.name,
      sku: product.sku,
      category: product.category ?? null,
      unitPrice: product.unitPrice ?? 0,
      stock: product.stock,
      pendingStock: product.pendingStock,
    };
  });
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
