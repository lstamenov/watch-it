import { RootState } from '../store';

export const selectPopularShows = (state: RootState) => state.shows.popular;

export const selectTopRatedShows = (state: RootState) => state.shows.topRated;

export const selectTrendingShows = (state: RootState) => state.shows.trending;