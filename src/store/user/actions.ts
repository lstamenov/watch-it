import { User, UserActionTypes } from './types';

export const userLoggedIn = (user: User) => ({
  type: UserActionTypes.LOGIN,
  payload: {
    user,
  },
});

export const userLoggedOut = () => ({
  type: UserActionTypes.LOGOUT,
});