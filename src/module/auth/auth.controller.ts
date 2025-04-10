import { ResponseData } from "../../model/response.type";
import { LoginResponse, RegisterResponse } from "./auth.dto";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

const login = async (
  req: Request,
  res: Response
): Promise<ResponseData<LoginResponse>> => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.login(email, password);
    return {
      status: 200,
      message: "Login successful",
      data: user,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return {
      status: 401,
      message: errorMessage,
      data: null,
    };
  }
};

const registerUser = async (
  req: Request,
  res: Response
): Promise<ResponseData<RegisterResponse>> => {
  try {
    const user = await AuthService.register(req.body);
    return {
      status: 201,
      message: "User created successfully",
      data: user,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return {
      status: 500,
      message: errorMessage,
      data: null,
    };
  }
};

const AuthController = {
  login,
  registerUser,
};
export default AuthController;
