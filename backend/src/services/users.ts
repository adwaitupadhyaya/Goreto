import { NotFoundError } from "./../error/NotFoundError";
import { GetUserQuery, IUser } from "../interfaces/user";
import * as userModel from "../models/users";

export async function createUser(newUser: IUser) {
  return await userModel.UserModel.create(newUser);
}

export async function getUsers(query: GetUserQuery) {
  return await userModel.UserModel.getUsers(query);
}

export async function getUserByUsername(username: string) {
  return await userModel.UserModel.getUserByUsername(username);
}

export async function getUserByEmail(email: string) {
  try {
    return await userModel.UserModel.getUserByEmail(email);
  } catch (error) {
    throw new NotFoundError(`User with email ${email} not found`);
  }
}

export async function updateUser(
  user: Omit<IUser, "id" | "password" | "profile_picture">,
  id: string
) {
  try {
    const data = await userModel.UserModel.update(user, id);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
