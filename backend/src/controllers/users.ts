import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";

import * as userServices from "../services/users";

export async function getUsers(req: Request, res: Response) {
  const { query } = req;
  const allUsers = await userServices.getUsers(query);
  return res.status(HttpStatusCodes.OK).json(allUsers);
}

export async function getMyDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await userServices.getUserByEmail(req.user!.email);
    res.status(HttpStatusCodes.OK).send(data);
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id;
  try {
    await userServices.updateUser(req.body, userId);

    res.status(HttpStatusCodes.OK).send({
      message: "Updated succesfully",
    });
  } catch (error) {
    next(error);
  }
}
