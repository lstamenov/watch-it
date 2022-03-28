import { RootState } from '../store';

export const selectCurrentMovie = (state: RootState) => state.watch.currentMovie;
export const selectCurrentShow = (state: RootState) => state.watch.currentShow;
export const selectSimilarMovies = (state: RootState) => state.watch.similarMovies;
export const selectMovieRecommendations = (state: RootState) => state.watch.movieRecommendations;
export const selectSimilarShows = (state: RootState) => state.watch.similarShows;
export const selectShowRecommendations = (state: RootState) => state.watch.showRecommendations;
