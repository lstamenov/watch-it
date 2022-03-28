import { RootState } from '../store';

export const selectDailyTrendingMovies = (state: RootState) => state.movies.trending.daily;
export const selectWeeklyTrendingMovies = (state: RootState) => state.movies.trending.weekly;
export const selectLatestMovies = (state: RootState) => state.movies.latest;
export const selectPopularMovies = (state: RootState) => state.movies.popular;
export const selectUpcomingMovies = (state: RootState) => state.movies.upcoming;
