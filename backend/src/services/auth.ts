import { IUser } from "./../interfaces/user";
import bcrypt from "bcrypt";

import * as userServices from "../services/users";
import { sign } from "jsonwebtoken";
import config from "../config";
import { BadRequestError } from "../error/BadRequestError";

export async function signup(body: IUser) {
  const existingUser = await userServices.getUserByUsername(body.username);
  const existingEmail = await userServices.getUserByEmail(body.email);
  if (existingUser) {
    throw new BadRequestError(
      `Username ${existingUser.username} is already taken`
    );
  }
  if (existingEmail) {
    throw new BadRequestError(
      `User with email ${existingUser.email} already exists`
    );
  }
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
    throw new BadRequestError(`Username ${body.username} does not exist`);
  }

  const isValidPassword = await bcrypt.compare(body.password, user.password);
  console.log(isValidPassword);

  if (!isValidPassword) {
    throw new BadRequestError(`Incorrect Password`);
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
