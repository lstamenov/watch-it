/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/default-param-last */
import { TrendingMovie, TrendingShow } from '../../types/types';
import { ResultAction, ResultActionTypes, ResultsState } from './types';

const initialState: ResultsState = {
  genresResult: {
    movies: {
      page: 1,
      results: [],
    },
    shows: {
      page: 1,
      results: [],
    },
  },
  searchResults: {
    results: [],
    page: 1,
  },
};

export default (
  state: ResultsState = initialState,
  action: ResultAction,
): ResultsState => {
  switch (action.type) {
    case ResultActionTypes.MOVIE_GENRES_RESULT_LOADED:
      const results = action.payload.results as TrendingMovie[];
      const page = action.payload.page;

      const newMovieResults = {
        ...state.genresResult,
        movies: {
          page,
          results,
        },
      };

      return { ...state, genresResult: newMovieResults };
    case ResultActionTypes.SHOW_GENRES_RESULT_LOADED:
      const showsPage = action.payload.page;
      const showResults = action.payload.results as TrendingShow[];

      const newShowResults = {
        ...state.genresResult,
        shows: {
          page: showsPage,
          results: showResults,
        },
      };

      return { ...state, genresResult: newShowResults };
    case ResultActionTypes.MORE_MOVIE_GENRES_RESULT_LOADED:
      const moreMovieResults = action.payload.results as TrendingMovie[];
      const moviePage = action.payload.page;

      const oldMovieResults = state.genresResult.movies.results;

      const newMoreMovieResults = {
        ...state.genresResult,
        movies: {
          page: moviePage,
          results: [...oldMovieResults, ...moreMovieResults],
        },
      };

      return { ...state, genresResult: newMoreMovieResults };
    case ResultActionTypes.MORE_SHOW_GENRES_RESULT_LOADED:
      const moreTvResults = action.payload.results as TrendingShow[];
      const tvPage = action.payload.page;

      const oldTvResults = state.genresResult.shows.results;

      const newMoreTvResults = {
        ...state.genresResult,
        shows: {
          page: tvPage,
          results: [...oldTvResults, ...moreTvResults],
        },
      };

      return { ...state, genresResult: newMoreTvResults };
    case ResultActionTypes.SEARCH_RESULTS_LOADED:
      const searchResults = action.payload.results;
      const searchPage = action.payload.page;

      return {
        ...state,
        searchResults: { results: searchResults, page: searchPage },
      };
    case ResultActionTypes.MORE_SEARCH_RESULTS_LOADED:
      const moreSearchResults = action.payload.results;
      const newSearchResultsPage = action.payload.page;
      const oldSearchResults = state.searchResults.results;
      
      return {
        ...state,
        searchResults: {
          page: newSearchResultsPage,
          results: [...oldSearchResults, ...moreSearchResults],
        },
      };
    default:
      return state;
  }
};
