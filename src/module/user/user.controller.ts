import { Request } from "express";
import UserService from "./user.service";
import { ResponseData } from "../../type/response.type";
import { RegisterResponse } from "../auth/auth.dto";
import { UserResponse } from "./user.dto";

const createUserHandler = async (
  req: Request
): Promise<ResponseData<RegisterResponse>> => {
  try {
    const user = await UserService.createUser(req.body);
    return {
      status: 201,
      message: "User created successfully",
      data: user,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

const getListUser = async (
  req: Request
): Promise<ResponseData<UserResponse[]>> => {
  try {
    const users = await UserService.getListUser();
    return {
      status: 200,
      message: "Users retrieved successfully",
      data: users,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
    };
  }
};

const UserController = {
  createUserHandler,
  getListUser,
};
export default UserController;
