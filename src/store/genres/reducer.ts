/* eslint-disable @typescript-eslint/default-param-last */
import { GenreAction, GenresActionTypes, GenresState } from './types';

const initialState: GenresState = {
  movieGenres: [],
  tvGenres: [],
};

export default (state = initialState, action: GenreAction) => {
  switch (action.type) {
    case GenresActionTypes.GET_MOVIE_GENRES:
      return { ...state, movieGenres: action.payload.genres };
    case GenresActionTypes.GET_TV_GENRES:
      return { ...state, tvGenres: action.payload.genres };
    default:
      return state;
  }
};
