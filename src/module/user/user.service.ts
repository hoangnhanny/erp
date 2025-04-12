import { Repository } from "typeorm";
import { User } from "../../entities/User";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../../config/data-source";
import { RegisterResponse } from "../auth/auth.dto";
import { UserInput, UserResponse } from "./user.dto";
import { BadRequestException } from "../../exception/Exception";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const createUser = async (userData: UserInput): Promise<RegisterResponse> => {
  // Check if the user already exists
  const { name, email, password, role } = userData;
  const existingUser = await userRepository.findOne({
    where: { email: userData.email },
  });
  if (existingUser) {
    throw new BadRequestException("User already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hash,
    role: role as "procurement" | "manager" | "inventory" | "finance",
  });
  const result = await userRepository.save(user);

  return {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role,
  };
};

const getListUser = async (): Promise<UserResponse[]> => {
  const users = await userRepository.find();
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));
};

const getUserById = async (id: string): Promise<User | null> => {
  const user = await userRepository.findOne({
    where: { id: id },
  });
  return user;
};

const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

const UserService = {
  createUser,
  verifyPassword,
  getListUser,
  getUserById,
};
export default UserService;
