import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your-secret";

export const signToken = (payload: any, expiresIn = "1d") => {
  return jwt.sign(
    { userId: payload.email, role: payload.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
