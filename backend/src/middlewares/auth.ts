import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import HttpStatusCodes from "http-status-codes";
import { verify } from "jsonwebtoken";
import config from "../config";
import { IUser } from "../interfaces/user";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      error: "Unauthenticated",
    });
  }

  const tokens = authorization!.split(" ");
  if (tokens.length !== 2 || tokens[0] !== "Bearer") {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      error: "Unauthenticated",
    });
  }

  try {
    const user = verify(tokens[1], config.jwt.secret!) as IUser;

    req.user = user;
  } catch (error) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({
      error: "Invalid JWT",
    });
  }

  next();
}
