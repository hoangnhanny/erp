import { IsOptional, IsString, IsUUID } from "class-validator";

export const enum StockType {
  IN = "stock_in",
  OUT = "stock_out",
}

class ReceivedPurchaseOrderRequest {
  @IsString()
  @IsUUID()
  relatedPoId!: string;

  // @IsString()
  // @IsUUID()
  // performedBy!: string;

  @IsString()
  @IsOptional()
  note?: string;
}

class ReceivedPurchaseOrderDto extends ReceivedPurchaseOrderRequest {
  performedBy!: string;
}

export { ReceivedPurchaseOrderRequest, ReceivedPurchaseOrderDto };
