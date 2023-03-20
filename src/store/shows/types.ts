import { TvShow } from '../../types/types';

export enum ShowActionTypes {
  TOP_RATED_SHOWS_LOADED = 'TOP_RATED_SHOWS_LOADED',
  POPULAR_SHOWS_LOADED = 'POPULAR_SHOWS_LOADED',
  TRENDING_SHOWS_LOADED = 'TRENDING_SHOWS_LOADED',
}

export interface ShowState {
  popular: TvShow[];
  topRated: TvShow[];
  trending: TvShow[];
}

export interface ShowAction {
  type: ShowActionTypes;
  payload: {
    shows: TvShow[];
  };
}
