import { Movie, TvShow } from '../../types/types';
import {
  WatchActionTypes,
  MovieDispatchType,
  ShowDispatchType,
  MovieRecommendationsDispatchType,
  ShowRecommendationsDispatchType,
  SimilarMoviesDispatchType,
  SimilarShowsDispatchType,
} from './types';

export const currentMovieLoaded = (movie: Movie) => ({
  type: WatchActionTypes.CURRENT_MOVIE,
  payload: {
    movie,
  },
});

export const currentShowLoaded = (show: TvShow) => ({
  type: WatchActionTypes.CURRENT_SHOW,
  payload: {
    show,
  },
});

export const similarMoviesLoaded = (movies: Movie[]) => ({
  type: WatchActionTypes.SIMILAR_MOVIES,
  payload: {
    movies,
  },
});

export const similarShowsLoaded = (shows: TvShow[]) => ({
  type: WatchActionTypes.SIMILAR_SHOWS,
  payload: {
    shows,
  },
});

export const movieRecommendationsLoaded = (movies: Movie[]) => ({
  type: WatchActionTypes.MOVIE_RECOMMENDATIONS,
  payload: {
    movies,
  },
});

export const showRecommendationsLoaded = (shows: TvShow[]) => ({
  type: WatchActionTypes.SHOW_RECOMMENDATIONS,
  payload: {
    shows,
  },
});

export type WatchDispatchTypes =
  | MovieDispatchType
  | ShowDispatchType
  | MovieRecommendationsDispatchType
  | ShowRecommendationsDispatchType
  | SimilarMoviesDispatchType
  | SimilarShowsDispatchType;
