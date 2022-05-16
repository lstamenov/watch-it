import { ADD_MOVIE_TO_LIST_URL, ADD_SHOW_TO_LIST_URL, AUTH_URL, CHANGE_AVATAR, LOGIN_URL, LOGOUT_URL, REGISTER_URL } from './constants';
import axios from 'axios';
import { LoginCredentials, RegisterCredentials } from '../types/types';

export const login = (credentials: LoginCredentials) => axios.post(LOGIN_URL, credentials, { withCredentials: true });

export const register = (credentials: RegisterCredentials) => axios.post(REGISTER_URL, credentials, { withCredentials: true });

export const logout = () => axios.post(LOGOUT_URL, {}, { withCredentials: true });

export const authenticateUser = () => axios.get(AUTH_URL, { withCredentials: true });

export const addMovieToList = (id: number) => axios.post(ADD_MOVIE_TO_LIST_URL, { id }, { withCredentials: true });

export const addShowToList = (id: number) => axios.post(ADD_SHOW_TO_LIST_URL, { id }, { withCredentials: true });

export const changeAvatar = (avatar: string) => axios.post(CHANGE_AVATAR, { avatar }, { withCredentials: true });

