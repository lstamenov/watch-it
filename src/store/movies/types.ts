import { Movie } from '../../types/types';

export enum MovieActionTypes {
  TRENDING_MOVIES_LOADED_SUCCESS = 'TRENDING_MOVIES_LOADED_SUCCESS',
  TRENDING_MOVIES_LOADED_FAILURE = 'TRENDING_MOVIES_LOADED_FAILURE',
  WEEKLY_TRENDING_MOVIES_LOADED_SUCCESS = 'WEEKLY_TRENDING_MOVIES_LOADED_SUCCESS',
  WEEKLY_TRENDING_MOVIES_LOADED_FAILURE = 'WEEKLY_TRENDING_MOVIES_LOADED_FAILURE',
  LATEST_MOVIES_LOADED_SUCCESS = 'LATEST_MOVIES_LOADED_SUCCESS',
  LATEST_MOVIES_LOADED_FAILURE = 'LATEST_MOVIES_LOADED_FAILURE',
  UPCOMING_MOVIES_LOADED_SUCCESS = 'UPCOMING_MOVIES_LOADED_SUCCESS',
  UPCOMING_MOVIES_LOADED_FAILURE = 'UPCOMING_MOVIES_LOADED_FAILURE',
  POPULAR_MOVIES_LOADED_SUCCESS = 'POPULAR_MOVIES_LOADED_SUCCESS',
  POPULAR_MOVIES_LOADED_FAILURE = 'POPULAR_MOVIES_LOADED_FAILURE',
  LOAD_MORE_POPULAR_MOVIES = 'LOAD_MORE_POPULAR_MOVIES',
  LOAD_MORE_UPCOMING_MOVIES = 'LOAD_MORE_UPCOMING_MOVIES',
  LOAD_MORE_DAILY_TRENDING_MOVIES = 'LOAD_MORE_DAILY_TRENDING_MOVIES',
  LOAD_MORE_WEEKLLY_TRENDING_MOVIES = 'LOAD_MORE_WEEKLLY_TRENDING_MOVIES',
}

interface DailyMoviesLoadedSuccess {
  type: MovieActionTypes.TRENDING_MOVIES_LOADED_SUCCESS;
  payload: {
    movies: Movie[];
  };
}

interface DailyMoviesLoadedFailure {
  type: typeof MovieActionTypes.TRENDING_MOVIES_LOADED_FAILURE;
}

interface WeeklyMoviesLoadedSuccess {
  type: MovieActionTypes.WEEKLY_TRENDING_MOVIES_LOADED_SUCCESS;
  payload: {
    movies: Movie[];
  };
}

interface WeeklyMoviesLoadedFailure {
  type: typeof MovieActionTypes.WEEKLY_TRENDING_MOVIES_LOADED_FAILURE;
}

interface PopularMoviesLoadedSuccess {
  type: MovieActionTypes.POPULAR_MOVIES_LOADED_SUCCESS;
  payload: {
    movies: Movie[];
  };
}

interface PopularMoviesLoadedFailure {
  type: typeof MovieActionTypes.POPULAR_MOVIES_LOADED_FAILURE;
}

interface UpcomingMoviesLoadedSuccess {
  type: MovieActionTypes.UPCOMING_MOVIES_LOADED_SUCCESS;
  payload: {
    movies: Movie[];
  };
}

interface UpcomingMoviesLoadedFailure {
  type: typeof MovieActionTypes.UPCOMING_MOVIES_LOADED_FAILURE;
}

interface LatestMoviesLoadedSuccess {
  type: MovieActionTypes.LATEST_MOVIES_LOADED_SUCCESS;
  payload: {
    movies: Movie[];
  };
}

interface LatestMoviesLoadedFailure {
  type: typeof MovieActionTypes.LATEST_MOVIES_LOADED_FAILURE;
}

interface MorePopularMoviesLoaded {
  type: MovieActionTypes.LOAD_MORE_POPULAR_MOVIES;
  payload: {
    movies: Movie[];
  };
}

interface MoreUpcomingMoviesLoaded {
  type: MovieActionTypes.LOAD_MORE_UPCOMING_MOVIES;
  payload: {
    movies: Movie[];
  };
}

interface MoreDailyTrendingMoviesLoaded {
  type: MovieActionTypes.LOAD_MORE_DAILY_TRENDING_MOVIES;
  payload: {
    movies: Movie[];
  };
}

interface MoreWeeklyTrendingMoviesLoaded {
  type: MovieActionTypes.LOAD_MORE_WEEKLLY_TRENDING_MOVIES;
  payload: {
    movies: Movie[];
  };
}

export type MovieDispatchTypes =
  | DailyMoviesLoadedSuccess
  | DailyMoviesLoadedFailure
  | WeeklyMoviesLoadedSuccess
  | WeeklyMoviesLoadedFailure
  | PopularMoviesLoadedSuccess
  | PopularMoviesLoadedFailure
  | UpcomingMoviesLoadedSuccess
  | UpcomingMoviesLoadedFailure
  | LatestMoviesLoadedSuccess
  | LatestMoviesLoadedFailure
  | MorePopularMoviesLoaded
  | MoreUpcomingMoviesLoaded
  | MoreDailyTrendingMoviesLoaded
  | MoreWeeklyTrendingMoviesLoaded;

export interface MoviesState {
  trending: {
    daily: Movie[];
    weekly: Movie[];
  };
  latest: Movie[];
  popular: Movie[];
  upcoming: Movie[];
}
