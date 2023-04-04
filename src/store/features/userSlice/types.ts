import { TvShow, Movie } from '../../../types/types';

export interface User {
  id: number;
  username: string;
  email: string;
  moviesList: number[];
  showsList: number[];
  list: {
    shows: TvShow[];
    movies: Movie[];
  };
  avatarURL: string;
}
