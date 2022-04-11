import { Dispatch } from 'redux';
import { Genre, TrendingMovie, TrendingShow } from '../../types/types';
import * as service from '../../services/resultService';
import * as showService from '../../services/showService';
import * as movieService from '../../services/movieService';
import { loading, loaded } from '../loader/actions';
import { getGenreMovieResults, getGenreShowResults, getMoreGenreMovieResults, getMoreGenreShowResults, getMoreSearchResults, getSearchResults } from './actions';

const fetchMovieGenresById = async (id: number) => {
  const fullMovieResponse = await movieService.fetchFullMovieDetailsById(id);
  const genres: Genre[] = await fullMovieResponse.data.genres;
  return genres;
};

const fetchShowGenresById = async (id: number) => {
  const response = await showService.fetchFullDetailedShowById(id);
  const genres: Genre[] = await response.data.genres;
  return genres;
};

export const loadMovieGenreResults = (genres: Genre[]) => async (dispatch: Dispatch) => {
  dispatch(loading());
  const genreIds = genres.map(genre => genre.id);
  const genresAsString = genreIds.join('%2C');
  const response = await service.fetchGenreResults(genresAsString);
  const results: TrendingMovie[] = await response.data.results;
  
  const detailedResultsResponse = results.map(async result => {
    const movieGenres: Genre[] = await fetchMovieGenresById(result.id);
    return { ...result, genres: movieGenres };
  });

  const detailedResults = await Promise.all(detailedResultsResponse);
  
  dispatch(getGenreMovieResults(detailedResults, response.data.page));
  dispatch(loaded());
};

export const loadShowGenreResults = (genres: Genre[]) => async (dispatch: Dispatch) => {
  dispatch(loading());
  const genreIds = genres.map(genre => genre.id);
  const genresAsString = genreIds.join('%2C');
  const response = await service.fetchShowGenreResults(genresAsString);
  const results: TrendingShow[] = await response.data.results;
  
  const detailedResultsResponse = results.map(async result => {
    const movieGenres: Genre[] = await fetchShowGenresById(result.id);
    return { ...result, genres: movieGenres };
  });

  const detailedResults = await Promise.all(detailedResultsResponse);
  
  dispatch(getGenreShowResults(detailedResults, response.data.page));
  dispatch(loaded());
};

export const loadMoreMovieGenreResults = (genres: Genre[], page: number) => async (dispatch: Dispatch) => {
  dispatch(loading());
  const genreIds = genres.map(genre => genre.id);
  const genresAsString = genreIds.join('%2C');
  const response = await service.fetchMoreMovieGenreResults(genresAsString, page);
  const results: TrendingMovie[] = await response.data.results;
  
  const detailedResultsResponse = results.map(async result => {
    const movieGenres: Genre[] = await fetchMovieGenresById(result.id);
    return { ...result, genres: movieGenres };
  });

  const detailedResults = await Promise.all(detailedResultsResponse);
  
  dispatch(getMoreGenreMovieResults(detailedResults, response.data.page));
  dispatch(loaded());
};

export const loadMoreShowGenreResults = (genres: Genre[], page: number) => async (dispatch: Dispatch) => {
  dispatch(loading());
  const genreIds = genres.map(genre => genre.id);
  const genresAsString = genreIds.join('%2C');
  const response = await service.fetchMoreShowGenreResults(genresAsString, page);
  const results: TrendingShow[] = await response.data.results;
  
  const detailedResultsResponse = results.map(async result => {
    const movieGenres: Genre[] = await fetchShowGenresById(result.id);
    return { ...result, genres: movieGenres };
  });

  const detailedResults = await Promise.all(detailedResultsResponse);
  
  dispatch(getMoreGenreShowResults(detailedResults, response.data.page));
  dispatch(loaded());
};

export const loadSearchResults = (query: string, page: number = 1) => async (dispatch: Dispatch) => {
  dispatch(loading());
  const response = await service.fetchSearchResults(query, page);
  const results: (TrendingMovie | TrendingShow)[] = await response.data.results;

  const detailedResponse = results.filter(res => res.media_type !== 'person').map(async movie => {
    if (movie.media_type === 'movie' ) {
      const movieGenres: Genre[] = await fetchMovieGenresById(movie.id);
      return { ...movie, genres: movieGenres };
    }
    const showGenres: Genre[] = await fetchShowGenresById(movie.id);
    return { ...movie, genres: showGenres };
  });

  const detailedResults = await Promise.all(detailedResponse);

  if (page === 1) {
    dispatch(getSearchResults(detailedResults, response.data.page));
  } else {
    if (detailedResults.length !== 0) {
      dispatch(getMoreSearchResults(detailedResults, page));
    }
  }
  dispatch(loaded());
};