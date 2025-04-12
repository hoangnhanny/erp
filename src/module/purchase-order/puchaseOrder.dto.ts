import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";

class CreatePurchaseOrderItem {
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsString()
  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

  @IsString()
  @IsNotEmpty()
  @IsNumber()
  unitPrice!: number;
}

class CreatePORequest {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  supplierId!: string;

  @IsArray()
  @ValidateNested()
  items!: CreatePurchaseOrderItem[];

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId!: string;
}

interface CreatePOResponse {
  id: string;
}

class ApprovalPoRequest {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  approverId!: string;

  @IsString()
  @IsOptional()
  comment?: string;
}

class SubmitPoRequest {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}

export {
  CreatePORequest,
  CreatePOResponse,
  ApprovalPoRequest,
  CreatePurchaseOrderItem,
  SubmitPoRequest,
};
