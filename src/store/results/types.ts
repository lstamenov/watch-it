import { TrendingMovie, TrendingShow } from '../../types/types';

export interface ResultsState {
  genresResult: {
    movies: {
      page: number,
      results: TrendingMovie[],
    },
    shows: {
      page: number,
      results: TrendingShow[],
    }
  },
}

export enum ResultActionTypes {
  MOVIE_GENRES_RESULT_LOADED,
  SHOW_GENRES_RESULT_LOADED,
  MORE_MOVIE_GENRES_RESULT_LOADED,
  MORE_SHOW_GENRES_RESULT_LOADED,
}

export interface ResultAction {
  type: ResultActionTypes,
  payload: {
    results: TrendingMovie[] | TrendingShow[],
    page: number,
  },
}