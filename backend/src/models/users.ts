import { IUser } from "../interfaces/user";
import { BaseModel } from "./base";
export class UserModel extends BaseModel {
  static async create(user: Omit<IUser, "id">) {
    const query = this.queryBuilder().insert(user).table("users");
    const data = await query;
    return user;
  }
}
