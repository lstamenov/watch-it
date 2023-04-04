import { API_KEY } from '../constants';

export const POPULAR_MOVIES_URL = (lang: string) =>
  `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${lang}&page=1`;
export const TRENDING_MOVIES_URL = (lang: string) =>
  `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=${lang}&page=1`;
export const TOP_RATED_MOVIES_URL = (lang: string) =>
  `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=${lang}&page=1`;
export const MOVIE_URL = (id: number, lang: string) =>
  `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${lang}`;
export const MOVIE_TRAILER_URL = (id: number, lang: string) =>
  `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=${lang}`;
export const SHOW_EXTERNAL_LINKS = (id: number) =>
  `https://api.themoviedb.org/3/tv/${id}/external_ids?`;
export const MOVIE_EXTERNAL_LINKS = (id: number) =>
  `https://api.themoviedb.org/3/movie/${id}/external_ids?`;
export const LOAD_SIMILAR_MOVIES = (id: number, lang: string) =>
  ` https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=${lang}&page=1`;
export const LOAD_MOVIE_RECOMMENDATIONS = (id: number, lang: string) =>
  ` https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=${lang}&page=1`;
export const LOAD_SIMILAR_SHOWS = (id: number, lang: string) =>
  ` https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=${lang}&page=1`;
export const LOAD_SHOW_RECOMMENDATIONS = (id: number, lang: string) =>
  ` https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=${lang}&page=1`;
