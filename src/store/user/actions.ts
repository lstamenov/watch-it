import { User, UserActionTypes } from './types';

export const userLoggedIn = (user: User) => ({
  type: UserActionTypes.LOGIN,
  payload: {
    user,
  },
});

export const userLoggedInFailed = (message: string) => ({
  type: UserActionTypes.LOGIN_FAILED,
  payload: {
    message,
  },
});

export const userRegister = (message: string) => ({
  type: UserActionTypes.REGISTER,
  payload: {
    message,
  },
});

export const userRegisterFailed = (message: string) => ({
  type: UserActionTypes.REGISTER_FAILED,
  payload: {
    message,
  },
});

export const userAuth = (user: User) => ({
  type: UserActionTypes.AUTH,
  payload: {
    user,
  },
});

export const userAuthFailed = (message: string) => ({
  type: UserActionTypes.AUTH_FAILED,
  payload: {
    message,
  },
});

export const userLoggedOut = () => ({
  type: UserActionTypes.LOGOUT,
});