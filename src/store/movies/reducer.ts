/* eslint-disable @typescript-eslint/default-param-last */
import { MovieDispatchTypes, MoviesState } from './types';
import { MovieActionTypes } from './types';

const initialState: MoviesState = {
  trending: {
    daily: [],
    weekly: [],
  },
  latest: [],
  popular: [],
  upcoming: [],
};

export default (state: MoviesState = initialState, action: MovieDispatchTypes) => {
  switch (action.type) {
    case MovieActionTypes.TRENDING_MOVIES_LOADED_SUCCESS:
      const newTrendingMovies = { ...state.trending, daily: action.payload.movies };
      const newState = { ...state, trending: newTrendingMovies };
      return newState;
    case MovieActionTypes.POPULAR_MOVIES_LOADED_SUCCESS:
      return { ...state, popular: action.payload.movies };
    case MovieActionTypes.LATEST_MOVIES_LOADED_SUCCESS:
      return { ...state, latest: action.payload.movies };
    case MovieActionTypes.UPCOMING_MOVIES_LOADED_SUCCESS:
      return { ...state, upcoming: action.payload.movies };
    case MovieActionTypes.WEEKLY_TRENDING_MOVIES_LOADED_SUCCESS:
      const newWeeklyTrendingMovies = { ...state.trending, weekly: action.payload.movies };
      const newTrendingState = { ...state, trending: newWeeklyTrendingMovies };
      return newTrendingState;
    case MovieActionTypes.LOAD_MORE_DAILY_TRENDING_MOVIES:
      const oldDailyTrendingMovies = state.trending.daily;
      const newDailyTrendingState = [...oldDailyTrendingMovies, ...action.payload.movies];
      const updatedTrendingState = { ...state.trending, daily: newDailyTrendingState };
      return { ...state, trending: updatedTrendingState };     
    case MovieActionTypes.TRENDING_MOVIES_LOADED_FAILURE:
    case MovieActionTypes.POPULAR_MOVIES_LOADED_FAILURE:
    case MovieActionTypes.LATEST_MOVIES_LOADED_FAILURE:
    case MovieActionTypes.WEEKLY_TRENDING_MOVIES_LOADED_FAILURE:
    case MovieActionTypes.UPCOMING_MOVIES_LOADED_FAILURE:
      return state;
    default:
      return state;
  }
};