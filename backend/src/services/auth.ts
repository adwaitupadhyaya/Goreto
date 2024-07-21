import { IUser } from "./../interfaces/user";
import bcrypt from "bcrypt";

import * as userServices from "../services/users";
import { sign } from "jsonwebtoken";
import config from "../config";

export async function signup(body: IUser) {
  const password = await bcrypt.hash(body.password, 10);
  const newUser = {
    ...body,
    password,
  };

  return await userServices.createUser(newUser);
}

export async function login(body: Pick<IUser, "username" | "password">) {
  const user = await userServices.getUserByUsername(body.username);
  if (!user) {
    return user;
  }

  const isValidPassword = await bcrypt.compare(body.password, user.password);

  if (!isValidPassword) {
    return undefined;
  }

  const paylaod = {
    id: user.id,
    username: user.username,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    profile_picture: user.profile_picture,
  };

  const accessToken = sign(paylaod, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  const refreshToken = sign(paylaod, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
  };
}
