import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateSupplierRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  creditLimit?: number;

  @IsString()
  @IsEmail()
  email?: string;
}

class CreateSupplierDto extends CreateSupplierRequest {
  userId!: string;
}

interface CreateSupplierResponse {
  id: string;
  name: string;
  email: string;
  creditLimit: number;
}

export { CreateSupplierRequest, CreateSupplierResponse, CreateSupplierDto };
