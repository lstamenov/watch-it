export enum UserActionTypes {
  LOGIN,
  REGISTER,
  LOGOUT,
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserState {
  user: User | null;
}

export interface LoginDispatchType {
  type: UserActionTypes.LOGIN;
  payload: {
    user: User; 
  };
}

export interface LogoutDispatchType {
  type: UserActionTypes.LOGOUT;
}

export type UserDispatchTypes = LoginDispatchType | LogoutDispatchType;