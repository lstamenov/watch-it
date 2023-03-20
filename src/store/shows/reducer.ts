/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ShowAction, ShowActionTypes, ShowState } from './types';

const initialState: ShowState = {
  topRated: [],
  popular: [],
  trending: [],
};

const showsReducer = (state: ShowState = initialState, action: ShowAction) => {
  switch (action.type) {
    case ShowActionTypes.POPULAR_SHOWS_LOADED:
      return { ...state, popular: action.payload.shows };
    case ShowActionTypes.TOP_RATED_SHOWS_LOADED:
      return { ...state, topRated: action.payload.shows };
    case ShowActionTypes.TRENDING_SHOWS_LOADED:
      return { ...state, trending: action.payload.shows };
    default:
      return state;
  }
};

export default showsReducer;
