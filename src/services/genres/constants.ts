import { API_KEY } from '../constants';

export const MOVIE_GENRES_URL = (lang: string) =>
  `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${lang}`;
export const TV_GENRES_URL = (lang: string) =>
  `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=${lang}`;
