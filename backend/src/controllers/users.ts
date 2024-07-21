import HttpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import * as userServices from "../services/users";

export async function getUsers(req: Request, res: Response) {
  const allUsers = await userServices.getUsers();
  return res.status(HttpStatusCodes.OK).json(allUsers);
}

export function createUser(req: Request, res: Response, next: NextFunction) {}
