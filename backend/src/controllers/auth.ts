import { BadRequestError } from "./../error/BadRequestError";
import { NextFunction, Request, Response } from "express";
import * as AuthServices from "../services/auth";
import HttpStatusCodes from "http-status-codes";

export async function signup(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  try {
    const data = await AuthServices.signup(body);
    res.status(HttpStatusCodes.CREATED).json({
      message: "User Created Succesfully",
      user: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  try {
    const data = await AuthServices.login(body);
    return res.status(HttpStatusCodes.OK).json({
      message: "Logged in Succesfully",
      tokens: data,
    });
  } catch (error) {
    next(error);
  }
}

export function logout() {}
