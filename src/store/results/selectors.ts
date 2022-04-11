import { RootState } from '../store';

export const selectMovieGenreResults = (state: RootState) => state.results.genresResult.movies;
export const selectShowGenreResults = (state: RootState) => state.results.genresResult.shows;

export const selectSearchResults = (state: RootState) => state.results.searchResults;