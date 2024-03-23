import { API_KEY } from '../constants';

export const MOVIE_URL = (id: number, lang: string) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${lang}`;
export const LOAD_SIMILAR_MOVIES = (id: number, lang: string) =>
  ` https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=${lang}&page=1`;
export const LOAD_MOVIE_RECOMMENDATIONS = (id: number, lang: string) =>
  ` https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=${lang}&page=1`;
export const LOAD_SIMILAR_SHOWS = (id: number, lang: string) =>
  ` https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=${lang}&page=1`;
export const LOAD_SHOW_RECOMMENDATIONS = (id: number, lang: string) =>
  ` https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=${lang}&page=1`;
