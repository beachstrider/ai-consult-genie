export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  uuid: string;
  createdAt: string;
  updatedAt: string;
}

export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  access_token: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}
