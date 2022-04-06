import { Dispatch } from 'redux';
import * as service from '../../services/userService';
import { LoginCredentials, RegisterCredentials } from '../../types/types';
import { userLoggedIn, userLoggedOut } from './actions';
import { User } from './types';

export const login = (credentials: LoginCredentials) => async (dispatch: Dispatch) => {
  const result = await service.login(credentials);
  const user: User = await result.data;
  console.log(result);
  dispatch(userLoggedIn(user));
};

export const register = (credentials: RegisterCredentials) => async () => {
  const result = await service.register(credentials);
  console.log(result);
};

export const logout = () => async (dispatch: Dispatch) => {
  await service.logout();
  dispatch(userLoggedOut());
};