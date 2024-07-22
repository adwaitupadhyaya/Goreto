import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import HttpStatusCodes from "http-status-codes";

export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: error.message,
      });
    }
    req.body = value;
    next();
  };
}
