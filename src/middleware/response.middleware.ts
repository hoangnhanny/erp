import { Request, Response, NextFunction } from "express";

export function responseHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const oldJson = res.json;

  res.json = function (body: any) {
    if (body?.status && body?.message) {
      return oldJson.call(this, body);
    }

    return oldJson.call(this, {
      data: null,
      status: "success",
      message: typeof body === "string" ? body : "OK",
    });
  };

  next();
}
