import { IUser } from "./../interfaces/user";
import bcrypt from "bcrypt";

import * as userServices from "../services/users";

export async function signup(body: IUser) {
  const password = await bcrypt.hash(body.password, 10);
  const newUser = {
    ...body,
    password,
  };

  return await userServices.createUser(newUser);
}

export async function login(body: Pick<IUser, "username" | "password">) {}
