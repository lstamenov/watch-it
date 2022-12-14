import { Movie, TvShow } from '../../types/types';

export enum UserActionTypes {
  LOGIN_FAILED = 'LOGIN_FAILED',
  REGISTER = 'REGISTER',
  REGISTER_FAILED = 'REGISTER_FAILED',
  LOGOUT = 'LOGOUT',
  AUTH_FAILED = 'AUTH_FAILED',
  ADD_MOVIE = 'ADD_MOVIE',
  ADD_SHOW = 'ADD_SHOW',
  LOGIN = 'LOGIN',
  AUTH = 'AUTH',
}

export interface User {
  id: number;
  username: string;
  email: string;
  moviesList: number[];
  showsList: number[];
  list: {
    shows: TvShow[];
    movies: Movie[];
  }
  avatarURL: string;
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

export interface AddMovieToListDispatchType {
  type: UserActionTypes.ADD_MOVIE;
  payload: {
    id: number;
  };
}

export interface AddShowToListDispatchType {
  type: UserActionTypes.ADD_SHOW;
  payload: {
    id: number;
  };
}

export type UserDispatchTypes =
  | LoginDispatchType
  | LogoutDispatchType
  | RegisterDispatchType
  | AuthDispatchType
  | LoginFailedDispatchType
  | AuthFailedDispatchType
  | RigisterFailedDispatchType
  | AddMovieToListDispatchType
  | AddShowToListDispatchType;
