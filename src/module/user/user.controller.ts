import { Request } from "express";
import UserService from "./user.service";
import { ResponseData } from "../../model/response.type";
import { RegisterResponse } from "../auth/auth.dto";

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

const UserController = {
  createUserHandler,
};
export default UserController;
