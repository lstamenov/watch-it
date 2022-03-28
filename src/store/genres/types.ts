import { Genre } from '../../types/types';

export enum GenresActionTypes {
  GET_MOVIE_GENRES = 'GET_MOVIE_GENRES',
  GET_TV_GENRES = 'GET_TV_GENRES',
}

export interface GenreAction {
  type: GenresActionTypes,
  payload: {
    genres: Genre[],
  }
}

export interface GenresState {
  movieGenres: Genre[],
  tvGenres: Genre[],
}