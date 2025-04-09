import { Repository } from "typeorm";
import { User } from "../../entities/User";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../../config/data-source";

const userRepository: Repository<User> = AppDataSource.getRepository(User);

const createUser = async (userData: Partial<User>): Promise<User> => {
  // Check if the user already exists
  const { name, email, passwordHash, role } = userData;

  if (!name || !email || !passwordHash || !role) {
    throw new Error("Missing required fields");
  }

  const existingUser = await userRepository.findOne({
    where: { email: userData.email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hash = await bcrypt.hash(passwordHash, 10);

  const user = userRepository.create({
    name,
    email,
    passwordHash: hash,
    role,
  });
  return await userRepository.save(user);
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
