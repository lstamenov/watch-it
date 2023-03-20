import { Genre } from '../../types/types';
import { GenresActionTypes } from './types';

export const getMovieGenres = (genres: Genre[]) => ({
  type: GenresActionTypes.GET_MOVIE_GENRES,
  payload: {
    genres,
  },
});

export const getTvGenres = (genres: Genre[]) => ({
  type: GenresActionTypes.GET_TV_GENRES,
  payload: {
    genres,
  },
});
