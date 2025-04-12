import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UserInput {
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
  @IsEnum(["admin", "manager", "procurement", "inventory", "finance"])
  role!: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
}
