import { TvShow } from '../../types/types';
import { ShowActionTypes } from './types';

export const topRatedShowsLoaded = (shows: TvShow[]) => ({
  type: ShowActionTypes.TOP_RATED_SHOWS_LOADED,
  payload: {
    shows,
  },
});

export const popularShowsLoaded = (shows: TvShow[]) => ({
  type: ShowActionTypes.POPULAR_SHOWS_LOADED,
  payload: {
    shows,
  },
});

export const trendingShowsLoaded = (shows: TvShow[]) => ({
  type: ShowActionTypes.TRENDING_SHOWS_LOADED,
  payload: {
    shows,
  },
});