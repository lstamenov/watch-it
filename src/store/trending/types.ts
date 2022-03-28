import { TrendingMovie, TrendingShow } from '../../types/types';

export enum TrendingActionTypes {
  TRENDING_LOADED = 'TRENDING_LOADED',
  MORE_TRENDING_LOADED = 'MORE_TRENDING_LOADED',
}

export interface TrendingAction {
  type: TrendingActionTypes,
  payload: {
    trendings: (TrendingMovie | TrendingShow)[],
    page: number,
  },
}

export interface TrendingState {
  trending: (TrendingMovie | TrendingShow)[],
  page: number,
}