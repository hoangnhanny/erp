import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { accessControl } from "../config/permission";

function isPublicRoute(url: string): boolean {
  return url.startsWith("/api-docs") || url.startsWith("/auth");
}
function getRouteKey(req: Request): string {
  const method = req.method.toUpperCase();
  const fullPath = req.baseUrl + req.path;
  return `${method} ${fullPath}`;
}

function isAuthorizedRole(key: string, role: string): boolean {
  const allowedRoles = accessControl[key];
  if (!allowedRoles) return true;

  console.log("Allowed Roles:", allowedRoles);
  console.log("User Role:", role);
  return allowedRoles.includes(role);
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (isPublicRoute(req.path)) {
    return next();
  }

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const token = authHeader?.split(" ")[1] ?? "";
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "your-secret"
    ) as Express.UserPayload;
    (req as any).user = decoded;
    const key = getRouteKey(req);
    const userRole = (decoded as JwtPayload).role;

    const allowedRoles = accessControl[key];

    if (!allowedRoles) {
      return next();
    }

    if (!isAuthorizedRole(key, userRole)) {
      return res.status(403).json({
        message:
          "Forbidden - You do not have permission to access this resource",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - Invalid token",
    });
  }
}
