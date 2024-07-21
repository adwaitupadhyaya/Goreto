import { IUser } from "../interfaces/user";
import * as userModel from "../models/users";

export async function createUser(newUser: IUser) {
  return await userModel.UserModel.create(newUser);
}

export async function getUsers() {
  return await userModel.UserModel.getUsers();
}

export async function getUserByUsername(username: string) {
  return await userModel.UserModel.getUserByUsername(username);
}
