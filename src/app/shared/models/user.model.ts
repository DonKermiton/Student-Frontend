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

export interface UserSocket {
  User: User;
  socketMessage: SocketMessage[];
  socketID: string[];
}

export interface UsersSocket {
  User: User[];
  socketMessage: SocketMessage[];
}

export interface SocketMessage {
  text: string;
  date: Date;
}


export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  accountType: number;
  group: string;
  socketID: string[];
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
