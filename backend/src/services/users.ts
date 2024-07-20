import { IUser } from "../interfaces/user";
import * as userModel from "../models/users";

export async function createUser(newUser: IUser) {
  return await userModel.UserModel.create(newUser);
}
