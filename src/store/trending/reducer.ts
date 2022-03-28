/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/default-param-last */
import { TrendingAction, TrendingActionTypes, TrendingState } from './types';

const initialState: TrendingState = {
  trending: [],
  page: 0,
};

export default (state: TrendingState = initialState, action: TrendingAction): TrendingState => {
  switch (action.type) {
    case TrendingActionTypes.TRENDING_LOADED:
      const trending = action.payload.trendings;
      return { trending, page: 1 };
    case TrendingActionTypes.MORE_TRENDING_LOADED:
      const newTrending = [...state.trending, ...action.payload.trendings];
      const page = action.payload.page;
      return { trending: newTrending, page };
    default:
      return state;
  }
};