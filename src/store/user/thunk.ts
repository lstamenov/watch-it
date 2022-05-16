import { Dispatch } from 'redux';
import * as service from '../../services/userService';
import * as movieService from '../../services/movieService';
import * as showService from '../../services/showService';
import { LoginCredentials, RegisterCredentials } from '../../types/types';
import { loaded, loading } from '../loader/actions';
import { userAuth, userAuthFailed, userLoggedIn, userLoggedInFailed, userLoggedOut } from './actions';
import { User } from './types';

const fetchMovieById = async (id: number) => {
  const fullMovieDetails = await movieService.fetchFullMovieDetailsById(id);
  return fullMovieDetails.data;
};

const fetchShowById = async (id: number) => {
  const fullShowDetails = await showService.fetchFullDetailedShowById(id);
  return fullShowDetails.data;
};

export const login = (credentials: LoginCredentials) => async (dispatch: Dispatch) => {
  dispatch(loading());
  try {
    const result = await service.login(credentials);
    const user: User = await result.data;
    localStorage.setItem('user', JSON.stringify(user));

    const userMoviesResponse = Promise.all(user.moviesList.map(movieId => fetchMovieById(movieId)));
    const userMovies = await userMoviesResponse;

    const userShowsResponse = Promise.all(user.showsList.map(showId => fetchShowById(showId)));
    const userShows = await userShowsResponse;

    user.list = {
      shows: userShows,
      movies: userMovies,
    };

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
    dispatch(userLoggedInFailed('success'));
  } catch (e: any) {
    const message = e.response.data.message;
    dispatch(userLoggedInFailed(message));
  }
  dispatch(loaded());
};

export const auth = () => async (dispatch: Dispatch) => {
  try {
    const response = await service.authenticateUser();
    const user: User = await response.data;
    localStorage.setItem('user', JSON.stringify(user));

    const userMoviesResponse = Promise.all(user.moviesList.map(movieId => fetchMovieById(movieId)));
    const userMovies = await userMoviesResponse;

    const userShowsResponse = Promise.all(user.showsList.map(showId => fetchShowById(showId)));
    const userShows = await userShowsResponse;

    user.list = {
      shows: userShows,
      movies: userMovies,
    };
    
    dispatch(userAuth(user));
  } catch (e) {
    localStorage.removeItem('user');
    dispatch(userAuthFailed(''));
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem('user');
  await service.logout();
  dispatch(userLoggedOut());
};

export const addMovie = (id: number) => async (dispatch: Dispatch) => {
  await service.addMovieToList(id);
  auth()(dispatch);
};

export const addShow = (id: number) => async (dispatch: Dispatch) => {
  await service.addShowToList(id);
  auth()(dispatch);
};

export const changeAvatar = (avatar: string) => async (dispatch: Dispatch) => {
  await service.changeAvatar(avatar);
  setTimeout(() => {
    auth()(dispatch);
  }, 1200);
};