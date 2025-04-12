import { IsNotEmpty, IsString } from "class-validator";

class CreateSupplierRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

interface CreateSupplierResponse {
  id: string;
  name: string;
  email: string;
  creditLimit: number;
}

export { CreateSupplierRequest, CreateSupplierResponse };
