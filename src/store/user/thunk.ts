import { Dispatch } from 'redux';
import * as service from '../../services/userService';
import { LoginCredentials, RegisterCredentials } from '../../types/types';
import { loaded, loading } from '../loader/actions';
import { userAuth, userAuthFailed, userLoggedIn, userLoggedInFailed, userLoggedOut } from './actions';
import { User } from './types';

export const login = (credentials: LoginCredentials) => async (dispatch: Dispatch) => {
  dispatch(loading());
  try {
    const result = await service.login(credentials);
    const user: User = await result.data;

    dispatch(loaded());
    dispatch(userLoggedIn(user));
  } catch (e) {
    dispatch(loaded());
    dispatch(userLoggedInFailed('Incorrect username or password'));
  }
};

export const register = (credentials: RegisterCredentials) => async (dispatch: Dispatch) => {
  dispatch(loading());
  try {
    await service.register(credentials);
  } catch (e: any) {
    const message = e.response.data.message;
    dispatch(userLoggedInFailed(message));
  }
  dispatch(loaded());
};

export const auth = () => async (dispatch: Dispatch) => {
  dispatch(loading());
  try {
    const response = await service.authenticateUser();
    const user: User = await response.data;

    dispatch(loaded());
    dispatch(userAuth(user));
  } catch (e) {
    dispatch(loaded());
    dispatch(userAuthFailed(''));
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  await service.logout();
  dispatch(userLoggedOut());
};