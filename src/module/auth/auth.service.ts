import { Repository } from "typeorm";
import { User } from "../../entities/User";
import { signToken } from "../../ultils/jwt";
import { AppDataSource } from "../../config/data-source";
import UserService from "../user/user.service";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const register = async (userData: Partial<User>) => {
  // Check if the user already exists
  const existingUser = await userRepository.findOneBy({
    email: userData.email,
  });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const user = await UserService.createUser(userData);
  return user;
};

const login = async (email: string, password: string): Promise<any> => {
  // Find the user by email
  const user = await userRepository.findOneBy({ email });
  if (!user) throw new Error("Invalid credentials");

  // Verify the password
  const isPasswordValid = await UserService.verifyPassword(
    password,
    user.passwordHash
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password"); // Invalid password
  }

  const token = signToken({ userId: user.email, role: user.role });

  return { token, user }; // Return the authenticated user
};

export const AuthService = {
  register,
  login,
};
