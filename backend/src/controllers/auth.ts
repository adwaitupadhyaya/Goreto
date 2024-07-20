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
  try {
    const data = await AuthServices.login(body);
  } catch (error) {
    // handle error here
  }
}

export function logout() {}
