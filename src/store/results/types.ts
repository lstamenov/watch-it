import { TrendingMovie, TrendingShow } from '../../types/types';

export interface ResultsState {
  genresResult: {
    movies: {
      page: number;
      results: TrendingMovie[];
    };
    shows: {
      page: number;
      results: TrendingShow[];
    };
  };
  searchResults: {
    results: (TrendingMovie | TrendingShow)[];
    page: number;
    query: string;
  };
}

export enum ResultActionTypes {
  MOVIE_GENRES_RESULT_LOADED = 'MOVIE_GENRES_RESULT_LOADED',
  SHOW_GENRES_RESULT_LOADED = 'SHOW_GENRES_RESULT_LOADED',
  MORE_MOVIE_GENRES_RESULT_LOADED = 'MORE_MOVIE_GENRES_RESULT_LOADED',
  MORE_SHOW_GENRES_RESULT_LOADED = 'MORE_SHOW_GENRES_RESULT_LOADED',
  SEARCH_RESULTS_LOADED = 'SEARCH_RESULTS_LOADED',
  MORE_SEARCH_RESULTS_LOADED = 'MORE_SEARCH_RESULTS_LOADED',
}
export interface MovieGenresLoadedDispatchType {
  type: ResultActionTypes.MOVIE_GENRES_RESULT_LOADED;
  payload: {
    results: TrendingMovie[] | TrendingShow[];
    page: number;
  };
}

export interface ShowGenresLoadedDispatchType {
  type: ResultActionTypes.SHOW_GENRES_RESULT_LOADED;
  payload: {
    results: TrendingMovie[] | TrendingShow[];
    page: number;
  };
}
export interface MoreMovieGenresLoadedDispatchType {
  type: ResultActionTypes.MORE_MOVIE_GENRES_RESULT_LOADED;
  payload: {
    results: TrendingMovie[] | TrendingShow[];
    page: number;
  };
}
export interface MoreShowGenresLoadedDispatchType {
  type: ResultActionTypes.MORE_SHOW_GENRES_RESULT_LOADED;
  payload: {
    results: TrendingMovie[] | TrendingShow[];
    page: number;
  };
}

export interface SearchResultsDispatchType {
  type: ResultActionTypes.SEARCH_RESULTS_LOADED;
  payload: {
    results: TrendingMovie[] | TrendingShow[];
    page: number;
    query: string;
  };
}

export interface MoreSearchResultsDispatchType {
  type: ResultActionTypes.MORE_SEARCH_RESULTS_LOADED;
  payload: {
    results: TrendingMovie[] | TrendingShow[];
    page: number;
    query: string;
  };
}

export type ResultsDispatchType =
  | MovieGenresLoadedDispatchType
  | ShowGenresLoadedDispatchType
  | MoreMovieGenresLoadedDispatchType
  | MoreShowGenresLoadedDispatchType
  | SearchResultsDispatchType
  | MoreSearchResultsDispatchType;
