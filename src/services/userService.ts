import { AUTH_URL, LOGIN_URL, LOGOUT_URL, REGISTER_URL } from './constants';
import axios from 'axios';
import { LoginCredentials, RegisterCredentials } from '../types/types';

export const login = (credentials: LoginCredentials) => axios.post(LOGIN_URL, credentials, { withCredentials: true });

export const register = (credentials: RegisterCredentials) => axios.post(REGISTER_URL, credentials, { withCredentials: true });

export const logout = () => axios.post(LOGOUT_URL);

export const authenticateUser = () => axios.get(AUTH_URL, { withCredentials: true });