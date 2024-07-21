import { Request as ExpressRequest } from "express";
import { IUser } from "./user";

export interface Request extends ExpressRequest {
  user?: IUser;
}
