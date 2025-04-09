import { Request, Response } from "express";
import UserService from "./user.service";

const createUserHandler = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({
        error: error instanceof Error ? error.message : "Internal Server Error",
      });
  }
};

const UserController = {
  createUserHandler,
};
export default UserController;
