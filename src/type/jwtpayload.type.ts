// src/types/express/index.d.ts
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      userId: string;
      role: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}
