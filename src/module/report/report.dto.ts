import { IsDateString } from "class-validator";

class InventoryTurnoverRequest {
  @IsDateString()
  startDate!: Date;

  @IsDateString()
  endDate!: Date;
}

interface InventoryTurnoverResponse {
  productId: string;
  totalIn: number;
  totalOut: number;
  turnOverRate: number;
}

export { InventoryTurnoverRequest, InventoryTurnoverResponse };
