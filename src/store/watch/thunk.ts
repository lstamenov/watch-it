import { Dispatch } from 'redux';
import * as service from '../../services/watchService';
import * as showService from '../../services/showService';
import * as movieService from '../../services/movieService';
import { Actor, Movie, TvShow, Video } from '../../types/types';
import { loaded, loading } from '../loader/actions';
import { RootState } from '../store';
import { currentMovieLoaded, currentShowLoaded, movieRecommendationsLoaded, showRecommendationsLoaded, similarMoviesLoaded, similarShowsLoaded } from './actions';

const fetchFullMovieById = async (id: number) => {
  const fullMovieResponse = await movieService.fetchFullMovieDetailsById(id);
  const movie: Movie = await fullMovieResponse.data;
  return movie;
};

const fetchFullShowById = async (id: number) => {
  const response = await showService.fetchFullDetailedShowById(id);
  const show: TvShow = await response.data;
  return show;
};

export const loadCurrentMovie = (id: number) => async (dispatch: Dispatch) => {
  dispatch(loading());
  
  const response = await service.fetchMovieById(id);
  const movie: Movie = await response.data;

  const trailersResponse = await movieService.fetchMovieTrailers(id);
  const trailers: Video[] = await trailersResponse.data.results;
  const trailer = trailers.find(t => t.site === 'YouTube' && t.type === 'Trailer');
  movie.trailer = trailer;

  const creditsResponse = await movieService.fetchMovieCast(id);
  const cast: Actor[] = await creditsResponse.data.cast; 
  movie.cast = cast;

  dispatch(currentMovieLoaded(movie));
  dispatch(loaded());
};

export const loadCurrentShow = (id: number) => async (dispatch: Dispatch) => {
  dispatch(loading());

  const showResponse = await service.fetchShowById(id);
  const show: TvShow = await showResponse.data;
  const showImdbIdResponse = await service.fetchShowExternalLinks(id);
  const imdbId = await showImdbIdResponse.data.imdb_id;

  const trailersResponse = await showService.fetchShowTrailers(id);
  const trailers: Video[] = await trailersResponse.data.results;
  const trailer = trailers.find(t => t.site === 'YouTube' && t.type === 'Trailer');
  show.trailer = trailer;

  const creditsResponse = await showService.fetchShowCast(id);
  const cast: Actor[] = await creditsResponse.data.cast;
  show.cast = cast;

  dispatch(currentShowLoaded({ ...show, imdb_id: imdbId }));
  dispatch(loaded());
};

export const loadSimilarMovies = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const state: RootState = getState();
  if (!!!state.watch.currentMovie) {
    return;
  }
  const response = await service.fetchSimilarMovies(state.watch.currentMovie.id);
  const similarMovies: Movie[] = await response.data.results;

  const detailedResultsResponse = similarMovies.map(async result => {
    const movie: Movie = await fetchFullMovieById(result.id);
    return movie;
  });

  const detailedResults = await Promise.all(detailedResultsResponse);

  dispatch(similarMoviesLoaded(detailedResults));
};

export const loadMovieRecommendations = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const state: RootState = getState();
  if (!!!state.watch.currentMovie) {
    return;
  }
  
  const response = await service.fetchMovieRecommendations(state.watch.currentMovie.id);
  const movies: Movie[] = await response.data.results;

  const detailedResultsResponse = movies.map(async result => {
    const movie: Movie = await fetchFullMovieById(result.id);
    return movie;
  });

  const detailedResults = await Promise.all(detailedResultsResponse);

  dispatch(movieRecommendationsLoaded(detailedResults));
};

export const loadSimilarShows = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const state: RootState = getState();
  if (!!!state.watch.currentShow) {
    return;
  }
  const response = await service.fetchSimilarShows(state.watch.currentShow.id);
  const shows: TvShow[] = await response.data.results;

  const detailedResultsResponse = shows.map(async result => {
    const show: TvShow = await fetchFullShowById(result.id);
    return show;
  });

  const detailedResults = await Promise.all(detailedResultsResponse);

  dispatch(similarShowsLoaded(detailedResults));
};

export const loadRecommendedShows = () => async (dispatch: Dispatch, getState: () => RootState) => {
  const state: RootState = getState();
  if (!!!state.watch.currentShow) {
    return;
  }
  const response = await service.fetchShowRecommendations(state.watch.currentShow.id);
  const shows: TvShow[] = await response.data.results;

  const detailedResultsResponse = shows.map(async result => {
    const show: TvShow = await fetchFullShowById(result.id);
    return show;
  });

  const detailedResults = await Promise.all(detailedResultsResponse);

  dispatch(showRecommendationsLoaded(detailedResults));
};

export const loadSuggestedMovies = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(loading());
  loadMovieRecommendations()(dispatch, getState);
  loadSimilarMovies()(dispatch, getState);
  dispatch(loaded());
};

export const loadSuggestedShows = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(loading());
  loadRecommendedShows()(dispatch, getState);
  loadSimilarShows()(dispatch, getState);
  dispatch(loaded());
};
