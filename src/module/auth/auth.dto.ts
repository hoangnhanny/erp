import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

class LoginRequest {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export enum RoleType {
  PROCUREMENT = "procurement",
  MANAGER = "manager",
  INVENTORY = "inventory",
  FINANCE = "finance",
}

class RegisterRequest {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsEnum(RoleType)
  role!: string;
}

interface RegisterResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}
interface LoginResponse {
  token: string;
}

export { RegisterResponse, LoginResponse, LoginRequest, RegisterRequest };
