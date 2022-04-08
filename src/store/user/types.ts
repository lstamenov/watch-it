export enum UserActionTypes {
  LOGIN,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_FAILED,
  LOGOUT,
  AUTH,
  AUTH_FAILED,
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface UserState {
  user: User | null;
  message: string;
}

export interface LoginDispatchType {
  type: UserActionTypes.LOGIN;
  payload: {
    user: User; 
  };
}

export interface LoginFailedDispatchType {
  type: UserActionTypes.LOGIN_FAILED;
  payload: {
    message: string; 
  };
}

export interface RegisterDispatchType {
  type: UserActionTypes.REGISTER;
  payload: {
    message: string; 
  };
}

export interface RigisterFailedDispatchType {
  type: UserActionTypes.REGISTER_FAILED;
  payload: {
    message: string; 
  };
}

export interface AuthDispatchType {
  type: UserActionTypes.AUTH;
  payload: {
    user: User;
  };
}

export interface AuthFailedDispatchType {
  type: UserActionTypes.AUTH_FAILED;
  payload: {
    message: string; 
  };
}

export interface LogoutDispatchType {
  type: UserActionTypes.LOGOUT;
}

export type UserDispatchTypes = LoginDispatchType | LogoutDispatchType | RegisterDispatchType | AuthDispatchType | LoginFailedDispatchType | AuthFailedDispatchType | RigisterFailedDispatchType;