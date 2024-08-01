import { GetUserQuery, IUser } from "../interfaces/user";
import { BaseModel } from "./base";
export class UserModel extends BaseModel {
  static async create(user: Omit<IUser, "id">) {
    const query = this.queryBuilder().insert(user).table("users");
    const data = await query;
    return user;
  }

  static async getUsers(query: GetUserQuery) {
    const { name, email } = query;
    const queryBuilder = this.queryBuilder()
      .select(
        "users.first_name",
        "users.last_name",
        "users.username",
        "users.email",
        "users.profile_picture"
      )
      .table("users");

    if (name) {
      queryBuilder.whereLike("users.username", `${name}%`);
    }
    if (email) {
      queryBuilder.where(email);
    }
    const users = await queryBuilder;
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

  static async update(
    user: Omit<IUser, "id" | "password" | "profile_picture">,
    id: string
  ) {
    const query = await this.queryBuilder()
      .table("users")
      .where({ id })
      .update(user);
  }
}
