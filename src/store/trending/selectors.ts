import { RootState } from '../store';

export const selectTrendingPage = (state: RootState) => state.trending.page;
export const selectTrending = (state: RootState) => state.trending.trending;
