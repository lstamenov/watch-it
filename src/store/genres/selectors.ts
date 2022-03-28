import { RootState } from '../store';

export const selectMovieGenres = (state: RootState) => state.genres.movieGenres;
export const selectTvGenres = (state: RootState) => state.genres.tvGenres;
