import { NextFunction, Request, Response } from "express";
import * as AuthServices from "../services/auth";
import HttpStatusCodes from "http-status-codes";

export async function signup(req: Request, res: Response) {
  const { body } = req;
  const createdUser = await AuthServices.signup(body);
  res.status(HttpStatusCodes.CREATED).json({
    message: "User Created Succesfully",
    user: createdUser,
  });
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  const data = await AuthServices.login(body);
  if (!data) {
    return res.status(HttpStatusCodes.NOT_FOUND).json({
      error: "Invalid username or password",
    });
  }

  return res.status(HttpStatusCodes.OK).json({
    message: "Logged in Succesfully",
    tokens: data,
  });
}

export function logout() {}
