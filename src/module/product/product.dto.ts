import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";

class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  sku!: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsOptional()
  @IsNumber()
  unitPrice?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsNumber()
  pendingStock?: number;
}

class CreateProductDto extends CreateProductRequest {
  // @IsString()
  // @IsNotEmpty()
  userId!: string;
}

interface CreateProductResponse {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  unitPrice: number;
  stock: number;
  pendingStock?: number;
}

class UpdateProductRequest {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsOptional()
  @IsNumber()
  unitPrice?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  @IsNumber()
  pendingStock?: number;
}

class UpdateProductDto extends UpdateProductRequest {
  userId!: string;
}
interface UpdateProductResponse {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  unitPrice: number;
  stock: number;
  pendingStock?: number;
}

export {
  CreateProductRequest,
  CreateProductResponse,
  UpdateProductRequest,
  UpdateProductResponse,
  CreateProductDto,
  UpdateProductDto,
};
