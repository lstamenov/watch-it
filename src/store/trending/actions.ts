import { TrendingMovie, TrendingShow } from '../../types/types';
import { TrendingActionTypes } from './types';

export const getWeeklyTrending = (trendings: (TrendingMovie | TrendingShow)[], page: number) => ({
  type: TrendingActionTypes.TRENDING_LOADED,
  payload: {
    trendings,
    page,
  },
});

export const getMoreWeeklyTrending = (trendings: (TrendingMovie | TrendingShow)[], page: number) => ({
  type: TrendingActionTypes.MORE_TRENDING_LOADED,
  payload: {
    trendings,
    page,
  },
});