import { TrendingMovie, TrendingShow } from '../../types/types';
import { ResultActionTypes } from './types';

export const getGenreMovieResults = (results: TrendingMovie[], page: number) => ({
  type: ResultActionTypes.MOVIE_GENRES_RESULT_LOADED,
  payload: {
    results,
    page,
  },
});

export const getGenreShowResults = (results: TrendingShow[], page: number) => ({
  type: ResultActionTypes.SHOW_GENRES_RESULT_LOADED,
  payload: {
    results,
    page,
  },
});

export const getMoreGenreMovieResults = (results: TrendingMovie[], page: number) => ({
  type: ResultActionTypes.MORE_MOVIE_GENRES_RESULT_LOADED,
  payload: {
    results,
    page,
  },
});

export const getMoreGenreShowResults = (results: TrendingShow[], page: number) => ({
  type: ResultActionTypes.MORE_SHOW_GENRES_RESULT_LOADED,
  payload: {
    results,
    page,
  },
});

export const getSearchResults = (results: (TrendingMovie | TrendingShow)[], page: number, query: string) => ({
  type: ResultActionTypes.SEARCH_RESULTS_LOADED,
  payload: {
    results,
    page,
    query,
  },
});

export const getMoreSearchResults = (results: (TrendingMovie | TrendingShow)[], page: number, query: string) => ({
  type: ResultActionTypes.MORE_SEARCH_RESULTS_LOADED,
  payload: {
    results,
    page,
    query,
  },
});