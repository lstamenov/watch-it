import { Dispatch } from 'redux';
import * as service from '../../services/movieService';
import { Movie } from '../../types/types';
import { loaded, loading } from '../loader/actions';
import { RootState } from '../store';
import { latestMoviesLoadedSuccess, popularMoviesLoadedSuccess, moreDailyMoviesLoaded, trendingMoviesLoadedSuccess, upcomingMoviesLoadedSuccess, weeklyTrendingMoviesLoadedSuccess } from './actions';

const fetchMovieById = async (id: number = 1) => {
  const fullMovieDetails = await service.fetchFullMovieDetailsById(id);
  return fullMovieDetails.data;
};

export const loadDailyTrendingMovies = (page: number = 1) => async (dispatch: Dispatch, getState: () => RootState) => {
  const currentMovies = getState().movies.trending.daily;
  if (currentMovies.length > 0) return;

  const result = await service.fetchDailyTrendingMovies(page);
  const movies: Movie[] = await result.data.results;
  const fullDetailedMoviesResponse =  Promise.all(movies.map(movie => fetchMovieById(movie.id)));
  const fullDetailedMovies = await fullDetailedMoviesResponse;
  
  dispatch(trendingMoviesLoadedSuccess(fullDetailedMovies));
};

export const loadPopularMovies = (page: number = 1) => async (dispatch: Dispatch, getState: () => RootState) => {
  const currentMovies = getState().movies.popular;
  if (currentMovies.length > 0) return;

  const response = await service.fetchPopularMovies(page);
  const movies: Movie[] = await response.data.results;
  const fullDetailedMoviesResponse = Promise.all(movies.map(movie => fetchMovieById(movie.id)));
  const fullDetailedMovies = await fullDetailedMoviesResponse;
  
  dispatch(popularMoviesLoadedSuccess(fullDetailedMovies));
};

export const loadLatestMovies = (page: number = 1) => async (dispatch: Dispatch, getState: () => RootState) => {
  const currentMovies = getState().movies.latest;
  if (currentMovies.length > 0) return;

  const response = await service.fetchLatestMovies(page);
  const movies: Movie[] = await response.data.results;  
  const fullDetailedMoviesResponse = Promise.all(movies.map(movie => fetchMovieById(movie.id)));
  const fullDetailedMovies = await fullDetailedMoviesResponse;
  
  if (page !== 1) {
    dispatch(moreDailyMoviesLoaded(fullDetailedMovies));
  } else {
    dispatch(latestMoviesLoadedSuccess(fullDetailedMovies));
  }
};

export const loadUpcomingMovies = (page: number = 1) => async (dispatch: Dispatch, getState: () => RootState) => {
  const currentMovies = getState().movies.upcoming;
  if (currentMovies.length > 0) return;

  const response = await service.fetchUpcomingMovies(page);
  const movies: Movie[] = await response.data.results;
  const fullDetailedMoviesResponse = Promise.all(movies.map(movie => fetchMovieById(movie.id)));
  const fullDetailedMovies = await fullDetailedMoviesResponse;
  
  dispatch(upcomingMoviesLoadedSuccess(fullDetailedMovies));
};

export const loadWeeklyMovies = (page: number = 1) => async (dispatch: Dispatch, getState: () => RootState) => {
  const currentMovies = getState().movies.trending.weekly;
  if (currentMovies.length > 0) return;

  const response = await service.fetchWeeklyTrendingMovies(page);
  const movies: Movie[] = await response.data.results;
  const fullDetailedMoviesResponse = Promise.all(movies.map(movie => fetchMovieById(movie.id)));
  const fullDetailedMovies = await fullDetailedMoviesResponse;
  
  dispatch(weeklyTrendingMoviesLoadedSuccess(fullDetailedMovies));
};

export const loadMoviesPageData = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(loading());
  await loadDailyTrendingMovies()(dispatch, getState);
  await loadUpcomingMovies()(dispatch, getState);
  await loadWeeklyMovies()(dispatch, getState);
  await loadUpcomingMovies()(dispatch, getState);
  await loadPopularMovies()(dispatch, getState);
  dispatch(loaded());
};