import axios from 'axios';
import i18n from '../i18n/i18n';
import {
  TRENDING_WEEKLY_MOVIES_URL,
  TRENDING_DAILY_MOVIES_URL,
  MOVIE_URL,
  POPULAR_MOVIES_URL,
  UPCOMING_MOVIES_URL,
  LATEST_MOVIES_URL,
  MOVIE_TRAILER_URL,
  MOVIE_CAST_URL,
} from './constants';

export const fetchDailyTrendingMovies = (page: number = 1) =>
  axios.get(`${TRENDING_DAILY_MOVIES_URL(i18n.language)}${page}`);
export const fetchWeeklyTrendingMovies = (page: number = 1) =>
  axios.get(`${TRENDING_WEEKLY_MOVIES_URL(i18n.language)}${page}`);
export const fetchPopularMovies = (page: number = 1) =>
  axios.get(`${POPULAR_MOVIES_URL(i18n.language)}${page}`);
export const fetchUpcomingMovies = (page: number = 1) =>
  axios.get(`${UPCOMING_MOVIES_URL(i18n.language)}${page}`);
export const fetchLatestMovies = (page: number = 1) =>
  axios.get(`${LATEST_MOVIES_URL(i18n.language)}${page}`);
export const fetchFullMovieDetailsById = (id: number) => axios.get(MOVIE_URL(id, i18n.language));
export const fetchMovieTrailers = (id: number) => axios.get(MOVIE_TRAILER_URL(id, i18n.language));
export const fetchMovieCast = (id: number) => axios.get(MOVIE_CAST_URL(id, i18n.language));
