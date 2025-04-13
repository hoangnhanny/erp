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
  @IsUUID()
  productId!: string;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

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
  items!: CreatePurchaseOrderItem[];
}

class CreatePODto extends CreatePORequest {
  userId!: string;
}

interface CreatePOResponse {
  id: string;
}

class ApprovalPoRequest {
  @IsString()
  @IsOptional()
  comment?: string;
}

class ApprovalPoDto extends ApprovalPoRequest {
  id!: string;
  approverId!: string;
}

class SubmitPoRequest {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsString()
  @IsOptional()
  comment?: string;
}

export {
  CreatePORequest,
  CreatePOResponse,
  ApprovalPoRequest,
  CreatePurchaseOrderItem,
  SubmitPoRequest,
  CreatePODto,
  ApprovalPoDto,
};
