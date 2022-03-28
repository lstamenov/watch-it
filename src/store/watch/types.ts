import { Movie, TvShow } from '../../types/types';

export enum WatchActionTypes {
  CURRENT_MOVIE = 'CURRENT_MOVIE',
  CURRENT_SHOW = 'CURRENT_SHOW',
  SHOW_RECOMMENDATIONS = 'SHOW_RECOMMENDATIONS',
  SIMILAR_MOVIES = 'SIMILAR_MOVIES',
  SIMILAR_SHOWS = 'SIMILAR_SHOWS',
  MOVIE_RECOMMENDATIONS = 'MOVIE_RECOMMENDATIONS',
}

export interface WatchState {
  currentMovie: Movie | null;
  movieRecommendations: Movie[];
  similarMovies: Movie[];
  currentShow: TvShow | null;
  showRecommendations: TvShow[];
  similarShows: TvShow[];
}

export interface MovieDispatchType {
  type: WatchActionTypes.CURRENT_MOVIE;
  payload: {
    movie: Movie,
  };
}

export interface ShowDispatchType {
  type: WatchActionTypes.CURRENT_SHOW;
  payload: {
    show: TvShow,
  };
}

export interface MovieRecommendationsDispatchType {
  type: WatchActionTypes.MOVIE_RECOMMENDATIONS;
  payload: {
    movies: Movie[],
  };
}

export interface ShowRecommendationsDispatchType {
  type: WatchActionTypes.SHOW_RECOMMENDATIONS;
  payload: {
    shows: TvShow[],
  };
}

export interface SimilarMoviesDispatchType {
  type: WatchActionTypes.SIMILAR_MOVIES;
  payload: {
    movies: Movie[],
  };
}

export interface SimilarShowsDispatchType {
  type: WatchActionTypes.SIMILAR_SHOWS;
  payload: {
    shows: TvShow[],
  };
}