import { Movie } from '../../types/types';
import { MovieActionTypes } from './types';

export const trendingMoviesLoadedSuccess = (movies: Movie[]) => ({
  type: MovieActionTypes.TRENDING_MOVIES_LOADED_SUCCESS,
  payload: {
    movies,
  },
});

export const trendingMoviesLoadedFailure = () => ({
  type: MovieActionTypes.TRENDING_MOVIES_LOADED_FAILURE,
  payload: {},
});

export const weeklyTrendingMoviesLoadedSuccess = (movies: Movie[]) => ({
  type: MovieActionTypes.WEEKLY_TRENDING_MOVIES_LOADED_SUCCESS,
  payload: {
    movies,
  },
});

export const weeklyTrendingMoviesLoadedFailure = () => ({
  type: MovieActionTypes.WEEKLY_TRENDING_MOVIES_LOADED_FAILURE,
  payload: {},
});

export const popularMoviesLoadedSuccess = (movies: Movie[]) => ({
  type: MovieActionTypes.POPULAR_MOVIES_LOADED_SUCCESS,
  payload: {
    movies,
  },
});

export const popularMoviesLoadedFailure = () => ({
  type: MovieActionTypes.POPULAR_MOVIES_LOADED_FAILURE,
  payload: {},
});

export const upcomingMoviesLoadedSuccess = (movies: Movie[]) => ({
  type: MovieActionTypes.UPCOMING_MOVIES_LOADED_SUCCESS,
  payload: {
    movies,
  },
});

export const upcomingMoviesLoadedFailure = () => ({
  type: MovieActionTypes.UPCOMING_MOVIES_LOADED_FAILURE,
  payload: {},
});

export const latestMoviesLoadedSuccess = (movies: Movie[]) => ({
  type: MovieActionTypes.LATEST_MOVIES_LOADED_SUCCESS,
  payload: {
    movies,
  },
});

export const latestMoviesLoadedFailure = () => ({
  type: MovieActionTypes.LATEST_MOVIES_LOADED_FAILURE,
  payload: {},
});

export const moreDailyMoviesLoaded = (movies: Movie[]) => ({
  type: MovieActionTypes.LOAD_MORE_DAILY_TRENDING_MOVIES,
  payload: {
    movies,
  },
});


