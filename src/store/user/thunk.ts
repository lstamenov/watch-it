import { Dispatch } from 'redux';
import * as service from '../../services/userService';
import * as movieService from '../../services/movieService';
import * as showService from '../../services/showService';
import { LoginCredentials, RegisterCredentials } from '../../types/types';
import { loaded, loading } from '../loader/actions';
import { userAuth, userAuthFailed, userLoggedIn, userLoggedInFailed } from './actions';
import { User } from './types';
import { enqueMessage } from '../toasts/actions';

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
    const { user, jwt }: { user: User, jwt: string } = await result.data;

    localStorage.setItem('jwt', jwt);

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
    dispatch(userAuthFailed(''));
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user');
  auth()(dispatch);
};

export const addMovie = (id: number, movieName: string) => async (dispatch: Dispatch) => {
  try {
    await service.addMovieToList(id);
    dispatch(enqueMessage(`Successfully added ${movieName} to your list`, 'success'));
  } catch (e) {
  }
};

export const addShow = (id: number) => async () => {
  await service.addShowToList(id);
};

export const changeAvatar = (avatar: string) => async (dispatch: Dispatch) => {
  await service.changeAvatar(avatar);
  setTimeout(() => {
    auth()(dispatch);
  }, 1200);
};