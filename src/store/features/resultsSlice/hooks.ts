import { Genre } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../store';
import { clearMovieGenreResults, clearShowGenreResults } from './resultsSlice';
import { fetchMovieGenresResults, fetchSearchResults, fetchShowGenresResults } from './thunk';

export const useMovieGenreResults = () => {
  const dispatch = useAppDispatch();

  return {
    movieGenreResults: useAppSelector((state) => state.results.movieGenreResults),
    clearMovies: () => dispatch(clearMovieGenreResults()),
    loadMovieGenreResults: (params: { genres: Genre[]; page: number }) =>
      dispatch(fetchMovieGenresResults(params)),
  };
};

export const useShowGenreResults = () => {
  const dispatch = useAppDispatch();

  return {
    showGenreResults: useAppSelector((state) => state.results.showGenreResults),
    clearShows: () => dispatch(clearShowGenreResults()),
    loadShowGenreResults: (params: { genres: Genre[]; page: number }) =>
      dispatch(fetchShowGenresResults(params)),
  };
};

export const useSearchResults = () => {
  const dispatch = useAppDispatch();

  return {
    searchResults: useAppSelector((state) => state.results.searchResults),
    loadSearchResults: (params: { query: string; page: number }) =>
      dispatch(fetchSearchResults(params)),
  };
};
