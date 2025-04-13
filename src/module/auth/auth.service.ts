import { Repository } from "typeorm";
import { User } from "../../entities/User";
import { signToken } from "../../ultils/jwt";
import { AppDataSource } from "../../config/data-source";
import UserService from "../user/user.service";
import { LoginResponse, RegisterDto, RegisterResponse } from "./auth.dto";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const register = async (userData: RegisterDto): Promise<RegisterResponse> => {
  // Check if the user already exists
  const existingUser = await userRepository.findOneBy({
    email: userData.email,
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const user = await UserService.createUser({
    name: userData.name || "",
    email: userData.email,
    password: userData.password,
    role: userData.role as "procurement" | "manager" | "inventory" | "finance",
  });
  return user;
};

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  // Find the user by email
  const user = await userRepository.findOneBy({ email });
  if (!user) throw new Error("Invalid credentials");

  // Verify the password
  const isPasswordValid = await UserService.verifyPassword(
    password,
    user.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password"); // Invalid password
  }

  const token = signToken({ userId: user.id, role: user.role });

  return { token }; // Return the authenticated user
};

export const AuthService = {
  register,
  login,
};
