/* eslint-disable @typescript-eslint/default-param-last */
import { WatchDispatchTypes } from './actions';
import { WatchActionTypes, WatchState } from './types';

const initialState: WatchState = {
  currentMovie: null,
  currentShow: null,
  similarShows: [],
  similarMovies: [],
  showRecommendations: [],
  movieRecommendations: [],
};

export default (state: WatchState = initialState, action: WatchDispatchTypes) => {
  switch (action.type) {
    case WatchActionTypes.CURRENT_MOVIE:
      const currentMovie = action.payload.movie;
      return { ...state, currentMovie };
    case WatchActionTypes.CURRENT_SHOW:
      const currentShow = action.payload.show;
      return { ...state, currentShow };
    case WatchActionTypes.MOVIE_RECOMMENDATIONS:
      const movieRecommendations = action.payload.movies;
      return { ...state, movieRecommendations };
    case WatchActionTypes.SHOW_RECOMMENDATIONS:
      const showRecommendations = action.payload.shows;
      return { ...state, showRecommendations };
    case WatchActionTypes.SIMILAR_MOVIES:
      const similarMovies = action.payload.movies;
      return { ...state, similarMovies };
    case WatchActionTypes.SIMILAR_SHOWS:
      const similarShows = action.payload.shows;
      return { ...state, similarShows };
    default:
      return state;
  }
};
