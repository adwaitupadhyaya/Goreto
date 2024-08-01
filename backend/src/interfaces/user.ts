export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
}

export interface GetUserQuery {
  name?: string;
}
