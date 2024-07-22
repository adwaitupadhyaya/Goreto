import { IUser } from "../interfaces/user";
import { BaseModel } from "./base";
export class UserModel extends BaseModel {
  static async create(user: Omit<IUser, "id">) {
    const query = this.queryBuilder().insert(user).table("users");
    const data = await query;
    return user;
  }

  static async getUsers() {
    const users = await this.queryBuilder()
      .select(
        "users.first_name",
        "users.last_name",
        "users.username",
        "users.email",
        "users.profile_picture"
      )
      .table("users");
    return users;
  }

  static async getUserByUsername(username: string) {
    const user = await this.queryBuilder()
      .select("*")
      .table("users")
      .where({ "users.username": username })
      .first();
    return user;
  }

  static async getUserByEmail(email: string) {
    const user = await this.queryBuilder()
      .select("*")
      .table("users")
      .where({ "users.email": email })
      .first();
    return user;
  }
}
