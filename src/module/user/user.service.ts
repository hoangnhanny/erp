import { Repository } from "typeorm";
import { User } from "../../entities/User";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../../config/data-source";
import { RegisterResponse } from "../auth/auth.dto";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const createUser = async (
  userData: Partial<User>
): Promise<RegisterResponse> => {
  // Check if the user already exists
  const { name, email, password, role } = userData;

  if (!name || !email || !password || !role) {
    throw new Error("Missing required fields");
  }

  const existingUser = await userRepository.findOne({
    where: { email: userData.email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hash = await bcrypt.hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hash,
    role: role,
  });
  const result = await userRepository.save(user);

  return {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role,
  };
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
};
export default UserService;
