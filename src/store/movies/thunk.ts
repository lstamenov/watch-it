import { Dispatch } from 'redux';
import * as service from '../../services/movieService';
import { Movie } from '../../types/types';
import { loaded, loading } from '../loader/actions';
import { latestMoviesLoadedSuccess, popularMoviesLoadedSuccess, moreDailyMoviesLoaded, trendingMoviesLoadedSuccess, upcomingMoviesLoadedSuccess, weeklyTrendingMoviesLoadedSuccess } from './actions';

const fetchMovieById = async (id: number = 1) => {
  const fullMovieDetails = await service.fetchFullMovieDetailsById(id);
  return fullMovieDetails.data;
};

export const loadDailyTrendingMovies = (page: number = 1) => async (dispatch: Dispatch) => {
  const result = await service.fetchDailyTrendingMovies(page);
  const movies: Movie[] = await result.data.results;
  const fullDetailedMoviesResponse =  Promise.all(movies.map(movie => fetchMovieById(movie.id)));
  const fullDetailedMovies = await fullDetailedMoviesResponse;
  
  dispatch(trendingMoviesLoadedSuccess(fullDetailedMovies));
};

export const loadPopularMovies = (page: number = 1) => async (dispatch: Dispatch) => {
  const response = await service.fetchPopularMovies(page);
  const movies: Movie[] = await response.data.results;
  const fullDetailedMoviesResponse = Promise.all(movies.map(movie => fetchMovieById(movie.id)));
  const fullDetailedMovies = await fullDetailedMoviesResponse;
  
  dispatch(popularMoviesLoadedSuccess(fullDetailedMovies));
};

export const loadLatestMovies = (page: number = 1) => async (dispatch: Dispatch) => {
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

export const loadUpcomingMovies = (page: number = 1) => async (dispatch: Dispatch) => {
  const response = await service.fetchUpcomingMovies(page);
  const movies: Movie[] = await response.data.results;
  const fullDetailedMoviesResponse = Promise.all(movies.map(movie => fetchMovieById(movie.id)));
  const fullDetailedMovies = await fullDetailedMoviesResponse;
  
  dispatch(upcomingMoviesLoadedSuccess(fullDetailedMovies));
};

export const loadWeeklyMovies = (page: number = 1) => async (dispatch: Dispatch) => {
  const response = await service.fetchWeeklyTrendingMovies(page);
  const movies: Movie[] = await response.data.results;
  const fullDetailedMoviesResponse = Promise.all(movies.map(movie => fetchMovieById(movie.id)));
  const fullDetailedMovies = await fullDetailedMoviesResponse;
  
  dispatch(weeklyTrendingMoviesLoadedSuccess(fullDetailedMovies));
};

export const loadMoviesPageData = () => async (dispatch: Dispatch) => {
  dispatch(loading());
  await loadDailyTrendingMovies()(dispatch);
  await loadUpcomingMovies()(dispatch);
  await loadWeeklyMovies()(dispatch);
  await loadUpcomingMovies()(dispatch);
  await loadPopularMovies()(dispatch);
  dispatch(loaded());
};