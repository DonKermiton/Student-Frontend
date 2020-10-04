export interface UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  exp: number;
  iat: number;
  accountType: number;
  account: {
    id: number,
    type: string
  };
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  accountType: number;
  group: string;
}

export interface TokenResponse {
  token: string;
}

export interface UserPayLoad {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
