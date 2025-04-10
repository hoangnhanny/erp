import { Request, Response, NextFunction } from "express";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next))
      .then((result) => {
        if (!res.headersSent && result !== undefined) {
          const statusCode =
            typeof result.status === "number" ? result.status : 200;

          res.status(statusCode).json({
            data: result.data ?? null,
            status: result.status >= 400 ? "error" : "success",
            message: result.message ?? "",
          });
        }
      })
      .catch(next);
  };
};
