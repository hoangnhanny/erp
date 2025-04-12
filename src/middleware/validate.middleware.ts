import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateRequest = (dtoClass: any) => {
  return (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoObject = plainToInstance(dtoClass, req.body);

    return validate(dtoObject, {
      whitelist: true,
      forbidNonWhitelisted: true,
    }).then((errors) => {
      if (errors.length > 0) {
        const errorList = errors.map((e) => ({
          field: e.property,
          errors: Object.values(e.constraints || {}),
        }));

        res.status(400).json({
          status: "Fail",
          message: "Validation failed",
          errors: errorList,
        });
        return;
      }

      req.body = dtoObject;
      next();
    });
  };
};
