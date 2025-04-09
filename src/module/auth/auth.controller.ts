import { AuthService } from "./auth.service";
import { Request, Response } from "express";


const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.login(email, password);
        return res.status(200).json(user);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
        return res.status(500).json({ error: errorMessage });
    }

}

const AuthController = {
    login,
};
export default AuthController;
