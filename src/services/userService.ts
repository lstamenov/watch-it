import { ADD_MOVIE_TO_LIST_URL, ADD_SHOW_TO_LIST_URL, AUTH_URL, CHANGE_AVATAR, LOGIN_URL, LOGOUT_URL, REGISTER_URL } from './constants';
import axios from 'axios';
import { LoginCredentials, RegisterCredentials } from '../types/types';
import { getAuthHeaders } from './utils';

export const login = (credentials: LoginCredentials) => axios.post(LOGIN_URL, credentials);

export const register = (credentials: RegisterCredentials) => axios.post(REGISTER_URL, credentials);

export const logout = () => axios.post(LOGOUT_URL, {}, { withCredentials: true });

export const authenticateUser = () => axios.get(AUTH_URL, { headers: getAuthHeaders() });

export const addMovieToList = (id: number) => axios.post(ADD_MOVIE_TO_LIST_URL, { id }, { headers: getAuthHeaders() });

export const addShowToList = (id: number) => axios.post(ADD_SHOW_TO_LIST_URL, { id }, { headers: getAuthHeaders() });

export const removeMovieFromList = (id: number) => axios.delete(ADD_MOVIE_TO_LIST_URL, { headers: getAuthHeaders(), data: { id } });

export const removeShowfromList = (id: number) => axios.delete(ADD_SHOW_TO_LIST_URL, { headers: getAuthHeaders(), data: { id } });

export const changeAvatar = (avatar: string) => axios.put(CHANGE_AVATAR, { avatar }, { headers: getAuthHeaders() });